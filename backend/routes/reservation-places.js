const express = require('express');
const router = express.Router();
const ReservationPlaces = require('../models/reservation-places');
const checkAuth = require('../middleware/check-auth');



router.post("", (req, res, next) => {
  /*const reservationPlaces = new ReservationPlaces({
    dayLimitPlaces: req.body.dayLimitPlaces
  });

  reservationPlaces.save().then((data) => {
    console.log('ADD DATA : ', data);
  });*/



});


router.get("", (req, res, next) => {
  ReservationPlaces.find().then((reservationPlaces)=>{
    console.log('RESERVATION PLACES DATA : ', reservationPlaces);

    res.status(200).json({
        message: 'LIMIT FOUND SUCCESFULLY ! ',
        reservationPlaces: reservationPlaces
      })
  })

});

router.get("/:id", (req, res, next) => {
  ReservationPlaces.findById(req.params.id).then(reservationPlace => {
    console.log('RESERVATION PLACES : ', reservationPlace);


    if (reservationPlace) {
      res.status(200).json(reservationPlace);
    } else {
      res.status(404).json({message: "RESERVATION PLACE NOT FOUND ! "});
    }
  });
});

router.put("/:id",
  checkAuth,
  (req, res, next) => {

    const reservationPlaces = new ReservationPlaces({
      _id: req.body.id,
      dayLimitPlaces: req.body.dayLimitPlaces
    });
    ReservationPlaces.updateOne({_id: req.params.id}, reservationPlaces).then(result => {
     console.log('RESULT : ', result);
      res.status(200).json({message: "UPDATE SUCCESS ! "});
    });
  });




module.exports = router;
