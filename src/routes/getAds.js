const Advert = require('../models/advert');

const getAdvert = async (req, res) => {
    try {
        const ad = await Advert.find();
        res.status(200).json(ad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
}

module.exports = getAdvert;