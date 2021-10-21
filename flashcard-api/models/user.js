var mongoose = require("mongoose");
const userModel = mongoose.model(
  "User",
  new mongoose.Schema({
    uid: { type: String, unique: true },
    email: { type: String, unique: true },
    flashcards: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "FlashCard",
      },
    ],
  })
);
module.exports = userModel;
