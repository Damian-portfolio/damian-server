const Advert = require('../models/advert');

const delAdvert = async (req, res) => {
    try {
        const advertId = req.params.id;

        const deleteAds = await Advert.findByIdAndDelete(advertId);

        if (!advertId) {
            return res.status(404).json({ message: "Advert not found" });
        }
        res.status(200).json({ message: "Image deleted successfully", deleteAds });
    } catch (error) {
        console.error("Error deleting Advert:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = delAdvert;