const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("LoginSchema", LoginSchema);

module.exports = model;
