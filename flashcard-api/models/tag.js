var mongoose = require("mongoose");
const tagModel = mongoose.model(
  "Tag",
  new mongoose.Schema({
    name: { type: String, unique: true },
  })
);
module.exports = tagModel;
