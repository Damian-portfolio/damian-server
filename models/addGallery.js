const Gallery = require('../modules/gallery');

const addPhoto = async (req, res) => {
    try {
        const newPicture = new Gallery({
            imgUrl: req.body.imgUrl,
        })

        const savedPicture = await newPicture.save();
        res.status(200).json({ message: 'Image added successfully' })
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = addPhoto;