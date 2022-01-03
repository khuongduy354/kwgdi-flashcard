const dbManipulation = require("../ultility.js");
const User = require("../models/user");
const Tag = require("../models/tag");
const FlashCard = require("../models/flashcard");

module.exports = {
  makeCard: async (req, res) => {
    const body = req.body;
    const wordsArray = body.words.split(",");
    const userEmail = body.userEmail;
    const userUid = body.userUid;
    const defsArray = body.definitions.split(",");
    const querySet = await User.findOne({ uid: userUid, email: userEmail });

    if (defsArray.length != wordsArray.length) {
      res.status(400).send({
        "Invalid Input":
          "Please make sure the amount of words equal the amount of definitions",
      });
    } //link tag and card if has at least 1 tag
    if (querySet == null) {
      var theUser = await User.create({ email: userEmail, uid: userUid });
    } else {
      var theUser = querySet;
    }
    if (body.tags) {
      const tagsArray = body.tags.split(",");
      var tagsResult = [];
      for (let tag of tagsArray) {
        // make tags
        let result = await dbManipulation.createTag(tag);
        tagsResult.push(result);
      }
      for (let i = 0; i < wordsArray.length; i++) {
        // make card then for each card, add an array of tags
        dbManipulation
          .createFlashCard({
            word: wordsArray[i],
            definition: defsArray[i],
          })
          .then(async (card) => {
            for (let tag of tagsResult) {
              let result = await dbManipulation.addTagToCard(card._id, tag._id);
              let result2 = await User.findByIdAndUpdate(theUser._id, {
                $push: { flashcards: card._id },
              });
            }
          });
      } //else just make cards
    } else {
      for (let i = 0; i < wordsArray.length; i++) {
        dbManipulation
          .createFlashCard({
            word: wordsArray[i],
            definition: defsArray[i],
          })
          .then(async (card) => {
            let result2 = await User.findByIdAndUpdate(theUser._id, {
              $push: { flashcards: card._id },
            });
          });
      }
    }
    res.send("Success");
  },
};
