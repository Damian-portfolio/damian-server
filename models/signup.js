const bcrypt = require('bcrypt');
const User = require('../modules/user');

const signup = async (req, res) => {
    try {
        const existingEmail = await User.findOne({ email: req.body.email });
        if(existingEmail) {
            return res.status(400).json({ error: 'Email already exist' })
        }
        
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = signup;