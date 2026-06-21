let mongoose = require("mongoose");

let { Schema } = mongoose;

let noteSchema = new Schema({
  title: String,
  description: String,
});

let noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
