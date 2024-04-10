const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    await User.create({
      firstname,
      lastname,
      email,
      password,
    });
    res.status(201).json({ message: "User created successfully" });
  } 
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = signup;
