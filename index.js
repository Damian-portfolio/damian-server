require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const User = require("./models/user");
const login = require("./routes/login");
const signup = require("./routes/signup");
const addPhoto = require("./routes/addGallery");
const getImages = require("./routes/getGallery");
const createMessages = require("./routes/createMessage");
const getMsg = require("./routes/getMessages");
const delImage = require("./routes/delGallery");
const connection = require("./config/connection");
const authToken = require("./middleware/authToken");

//Getting our app
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Getting users info
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// authToken is a middleware to check if the user is authenticated
// feel free to add or remove it from the routes

app.get("/viewImages", getImages);
app.get("/getMessages", authToken, getMsg);

app.post("/signup", signup);
app.post("/login", login);
app.post("/addPhoto", addPhoto);
app.post("/messages", createMessages);

app.delete("/deleteImages", authToken, delImage);

connection({ app, port: process.env.PORT || 5000 });
