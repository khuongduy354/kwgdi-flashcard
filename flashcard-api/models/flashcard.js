var mongoose = require("mongoose");
const flashCardModel = mongoose.model(
  "FlashCard",
  new mongoose.Schema({
    word: { type: String, unique: true },
    definition: String,
    tags: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tag",
      },
    ],
  })
);
module.exports = flashCardModel;
