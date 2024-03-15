const bcrypt = require('bcrypt');
const User = require('../modules/user');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Finding user by email
        const user = await User.findOne({ email });

        // If user not found
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Comparing password hashed to the password
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login Successful', user: user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = login;
