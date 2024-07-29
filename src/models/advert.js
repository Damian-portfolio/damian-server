const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertSchema = new Schema({
    adHead: {
        type: String,
        required: true,
    },
    adText: {
        type: String,
        required: true,
    },
    adImg: {
        type: String,
        required: true,
    },
    adCategory: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Advert = mongoose.model('Advert', advertSchema);
module.exports = Advert;