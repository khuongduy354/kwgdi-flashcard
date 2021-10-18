var mongoose = require("mongoose");

var flashcardschema = mongoose.Schema({
  word: String,
  definition: String,
  user: String,
});
