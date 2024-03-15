const express = require('express');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./modules/user');
const login = require('./models/login');
const signup = require('./models/signup');
const addPhoto = require('./models/addGallery');
const getImages = require('./models/getGallery');
const createMessages = require('./models/createMessage');
const getMsg = require('./models/getMessages');
const delImage = require('./models/delGallery');

//Getting our app
const app = express();

app.use(express.json());

// Middleware for handling HTTP requests
app.use(morgan('dev'))

// Middleware to handle CORS error
app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}));

// connecting to monngoDB
const dbUrl = 'mongodb+srv://akalmin247:mishima247@blog-node-tuts.k4jgjws.mongodb.net/';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        // listen for request
        app.listen(5000);
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err)
    });

// Getting users info
app.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to post user credentials
app.post('/signup', signup);

// To authenticate credential
app.post('/login', login);

// Posting Images
app.post('/addPhoto', addPhoto);

// Getting images
app.get('/viewImages', getImages);

// Deleting images
app.delete('/deleteImages', delImage);

// Sending Message
app.post('/messages', createMessages);

// Getting Messages
app.get('/getMessages', getMsg);