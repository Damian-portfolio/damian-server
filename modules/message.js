const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    clientEmail: {
        type: String,
        required: true,
    },
    clientMsg: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Messages = mongoose.model('Message', messageSchema);
module.exports = Messages;