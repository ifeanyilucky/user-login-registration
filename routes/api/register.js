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

  // if there's no password entry, and if password is not a string, let it return invalid
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "invalid password" });
  }
  // and if password length is less than 4, then return 'try a longer password'
  if (plainTextPassword.length < 4) {
    return res.json({ status: "error", error: "Try a longer password" });
  }

  try {
    // send a new user account to the database
    const response = await userSchema.create({ username, password });
    console.log(`User successfully created: ${response}`);
  } catch (err) {
    // and if username already exists, return 'try another username'
    if (err.code === 11000) {
      const existedUsername = JSON.stringify(err.keyValue.username);
      console.log(`${existedUsername} already existed, try another one`);
    }
  }
});

module.exports = route;
