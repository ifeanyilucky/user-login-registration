const express = require("express");
const userSchema = require("../../models/user");
const route = express.Router();
const bcrypt = require("bcryptjs");

route.post("/", async (req, res) => {
  console.log(req.body);
  const { username, password: plainTextPassword } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 15);

  try {
    const response = await userSchema.create({ username, password });
    console.log(`User successfully created: ${response}`);
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
});

module.exports = route;
