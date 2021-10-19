var User = require("./models/user");
var FlashCard = require("./models/flashcard");
var Tag = require("./models/tag");
const dbManipulation = {
  findTagByName: (tagName) => {
    return Tag.find({ name: tagName });
  },
  findCardByWord: (word) => {
    return FlashCard.find({ word: word });
  },
  createFlashCard: (newCard) => {
    return FlashCard.create(newCard);
  },
  createTag: (tagName) => {
    return Tag.create({ name: tagName });
  },
  addTagToCard: (cardId, tagId) => {
    return FlashCard.findByIdAndUpdate(
      cardId,
      { $push: { tags: tagId } },
      { new: true, useFindAndModify: true }
    );
  },
};
module.exports = dbManipulation;
