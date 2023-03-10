const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const upload = multer({ dest: "./images" });

cloudinary.config({
  cloud_name: "dcvwxiaaz",
  api_key: "379456423126525",
  api_secret: "RWfuO8CxLVnZx7PANSXu-LHPySk",
});

const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No image attached");
    return;
  } else {
    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        res.status(err).send(err.message);
        return;
      }
      if (result) {
        req.body.imageUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
        next();
      }
    });
  }
};

module.exports = { upload, uploadToCloudinary };
