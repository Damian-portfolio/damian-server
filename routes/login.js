const User = require("../models/user");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = user.generateToken();
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = login;
