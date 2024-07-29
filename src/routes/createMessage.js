const Messages = require("../models/message");

const sendMessage = async (req, res) => {
  try {
    const { clientEmail, clientMsg } = req.body;

    const newMsg = new Messages({
      clientEmail: clientEmail,
      clientMsg: clientMsg,
    });

    const savedMsg = await newMsg.save();

    res.status(200).json({ message: "Message sent successfully", msg: savedMsg });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = sendMessage;
