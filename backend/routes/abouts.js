const express = require('express');
const router = express.Router();
const About = require('../models/about');
const checkAuth = require('../middleware/check-auth');
const ReservationPlaces = require('../models/reservation-places');


router.post("",
  checkAuth,
  (req, res, next) => {




    const reservationPlacess = new ReservationPlaces({
      dayLimitPlaces: 30
    });

    reservationPlacess.save().then((data) => {
      console.log('ADD DATA : ', data);
    });



    const about = new About({
      title: req.body.title,
      content: req.body.content
    });

    about.save();

    res.status(201).json({
      message: "Post added successfully"
    });
  });


router.get("", (req, res, next) => {
  About.find().then(abouts => {

    res.status(200).json({
      message: "Posts fetched successfully!",
      abouts: abouts
    });
  });
});


router.get("/:id", (req, res, next) => {
  About.findById(req.params.id).then(about => {

    console.log('ABOUT 12312312312312 : ', about);
    if (about) {
      res.status(200).json(about);
    } else {
      res.status(404).json({message: "ABOUT NOT FOUND ! "});
    }
  });
});


router.put("/:id",
  checkAuth,
  (req, res, next) => {

    const about = new About({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,

    });


    About.updateOne({_id: req.params.id}, about).then(result => {
      //console.log('RESULT : ', result);
      res.status(200).json({message: "UPDATE SUCCESS ! "});
    });
  });


router.delete("/:id",
  checkAuth,
  (req, res, next) => {

  About.deleteOne({_id: req.params.id}).then((result) => {
    //console.log(result);
    res.status(200).json({message: 'About deleted ! '});

  })

});


module.exports = router;

