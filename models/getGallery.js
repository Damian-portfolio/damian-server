const Gallery = require('../modules/gallery');

const getImages = async (req, res) => {
    try {
        const images = await Gallery.find();
        res.status(200).json(images);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = getImages;