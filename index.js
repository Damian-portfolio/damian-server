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
const getImage = require("./routes/getImage");

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

app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", signup);
app.post("/login", login);
app.delete("/logout");

app.post("/messages", createMessages);
app.get("/getMessages", authToken, getMsg);
app.get("/images/:id", getImage);

app.post("/addPhoto", authToken, addPhoto);
app.get("/viewImages", getImages);
app.delete("/deleteImages/:id", authToken, delImage);

connection({ app, port: process.env.PORT || 5000 });
