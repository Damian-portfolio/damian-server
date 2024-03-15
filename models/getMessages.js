const Messages = require('../modules/message');

const getMsg = async (req, res) => {
    try {
        const msg = await Messages.find();
        res.status(200).json(msg);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = getMsg;