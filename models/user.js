const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    lastname: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
      select: false,
    },
  },
  { timestamps: true }
);

// pre save hook to hash the password
userSchema.pre("save", async function (next) {
  try {
    const user = await User.findOne({ email: this.email }).select("+password");
    if (user) throw new Error("User already exists");
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw new Error(error);
  }
});

// a method to compare the password
userSchema.methods.comparePassword = async function (password) {
  try {
    const user = await User.findOne({ email: this.email }).select("+password");
    console.log(user);
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    throw new Error(error);
  }
};

// a method to generate a token
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
