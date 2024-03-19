const Gallery = require("../models/gallery");

const addPhoto = async (req, res) => {
  try {
    const { imgUrl } = req.body;

    const newPicture = new Gallery({
      imgUrl: imgUrl,
    });

    const savedPicture = await newPicture.save();

    res.status(200).json({ message: "Image added successfully", img: savedPicture });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = addPhoto;