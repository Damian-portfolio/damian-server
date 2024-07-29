const Advert = require('../models/advert');

const postAdvert = async (req, res) => {
    try {
        const { adHead, adText, adImg, adCategory } = req.body;

        const newAd = new Advert({
            adHead: adHead,
            adText: adText,
            adImg: adImg,
            adCategory: adCategory
        });
    
        const savedAd = await newAd.save();
    
        res.status(200).json({ message: 'Ad has been published', data: savedAd });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = postAdvert;