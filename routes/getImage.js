const Gallery = require("../models/gallery");
const fs = require("fs");

const getImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) throw new Error("Image not found");

    const img = fs.readFileSync(`${__dirname}/../images/${image.imgUrl}`);
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(img, "binary");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getImage;
