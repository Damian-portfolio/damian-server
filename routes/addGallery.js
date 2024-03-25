const Gallery = require("../models/gallery");
const multer = require("multer");
const fs = require("fs");

const upload = (() => {
  fs.mkdirSync("images", { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "images/");
    },
    filename: (req, res, cb) => {
      cb(null, Date.now() + "-" + res.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("imgUrl");
  return upload;
})();

const addPhoto = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) throw new Error(err.message);

      const savedPicture = await Gallery.create({
        imgUrl: req.file.filename,
      });

      res
        .status(200)
        .json({ message: "Image added successfully", img: savedPicture });
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  });
};

module.exports = addPhoto;
