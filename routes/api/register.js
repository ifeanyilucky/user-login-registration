const express = require("express");
const userSchema = require("../../models/user");
const route = express.Router();
const bcrypt = require("bcryptjs");

route.post("/", async (req, res) => {
  const { username, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 15);
  if (!username || username !== "string") {
    console.log("Invalid username");
  }

  try {
    const response = await userSchema.create({ username, password });
    console.log(`User successfully created: ${response}`);
  } catch (err) {
    if (err.code === 11000) {
      const existedUsername = JSON.stringify(err.keyValue.username);
      console.log(`${existedUsername} already existed, try another one`);
    }
  }
});

module.exports = route;
