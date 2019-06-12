const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery');
const multer = require('multer');
const fs = require('fs');
const checkAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


const upload = multer({storage: storage});

router.post("",
  checkAuth,
  upload.array("image", 12),
  (req, res, next) => {
    const files = req.files;
    const url = req.protocol + "://" + req.get("host");

    for (let i = 0; i < files.length; i++) {
      const gallery = new Gallery({
        imagePath: url + "/images/" + req.files[i].filename
      });

      gallery.save().then((createdGallery) => {
       res.json({
         message: 'PHOTOS ADD SUCCESSFULLY !',
         gallery: {
           ...createdGallery,
           id: createdGallery._id
         }
       })
      })
    }
  });


router.get("", (req, res, next) => {
  Gallery.find().then(gallery => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      gallery: gallery
    });
  });
});

router.get("/:id", (req, res, next) => {
  Gallery.findById(req.params.id).then(gallery => {
    if (gallery) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "PHOTO not found!"});
    }
  });
});

router.delete("/:id",
  checkAuth,
  (req, res, next) => {
  Gallery.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({message: "GALLERY deleted!"});
    });

  });


module.exports = router;

