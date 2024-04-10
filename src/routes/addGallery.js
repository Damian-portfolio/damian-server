const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");
const Gallery = require("../models/gallery");

const app = initializeApp(firebaseConfig);

const addGallery = async (req, res) => {
  const image = req.file;

  try {
    const storage = getStorage(app);
    let downloadURL = "";
    if (image) {
      const storageRef = ref(storage, `images/${image.originalname}`);
      const snapshot = await uploadBytes(storageRef, image.buffer);
      downloadURL = await getDownloadURL(snapshot.ref);
    }
    const gallery = new Gallery({
      imgUrl: downloadURL,
    });
    await gallery.save();

    return res.status(201).json({
      status: "success",
      message: "Image uploaded successfully",
      img: {
        imgUrl: downloadURL,
      },
    });
  } catch (error) {
    console.log(error.message);
    return failed("Internal server error", "Internal server error", 500);
  }
};

module.exports = addGallery;
