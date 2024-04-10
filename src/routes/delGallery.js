const Gallery = require("../models/gallery");
const { initializeApp } = require("firebase/app");
const { deleteObject, getStorage, ref } = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const delImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await Gallery.findById(imageId);
    const imgUrl = image.imgUrl;
    const imgName = imgUrl.split("/").pop();
    const imgRef = ref(storage, `images/${imgName}`);
    await deleteObject(imgRef);
    const deletedImg = await Gallery.findByIdAndDelete(imageId);

    if (!deletedImg)
      return res.status(404).json({ message: "Image not found" });

    res.status(200).json({ message: "Image deleted successfully", deletedImg });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = delImage;
