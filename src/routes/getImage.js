const Gallery = require("../models/gallery");
const fs = require("fs");

const getImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) throw new Error("Image not found");

    res.json({
      status: "success",
      message: "Image retrieved successfully",
      img: {
        imgUrl: image.imgUrl,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getImage;
