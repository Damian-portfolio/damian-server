const Gallery = require("../models/gallery");

const delImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const deletedImg = await Gallery.findByIdAndDelete(imageId);

    if (!deletedImg) {
      res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully", deletedImg });
  } 
  catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = delImage;
