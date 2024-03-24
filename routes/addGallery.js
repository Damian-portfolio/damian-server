const Gallery = require("../models/gallery");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'image/')
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + '-' + res.originalname);
  }
});

const upload = multer({ storage: storage }).single('imgUrl');

const addPhoto = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }

      const { imgUrl } = req.body;

      const newPicture = new Gallery({
        imgUrl: imgUrl,
      });

      const savedPicture = await newPicture.save();

      res.status(200).json({ message: "Image added successfully", img: savedPicture });
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = addPhoto;