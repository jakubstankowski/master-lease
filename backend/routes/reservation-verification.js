const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

router.get("/:id", (req, res, next) => {
  Reservation.findById(req.params.id).then(reservationData => {
    // console.log('course DATA : ', course);

    if (reservationData) {
      const reservationUpdateStatus = new Reservation({
        _id: reservationData._id,
        systemDate: reservationData.systemDate,
        date: reservationData.date,
        time: reservationData.time,
        numberOfPlaces: reservationData.numberOfPlaces,
        name: reservationData.name,
        email: reservationData.email,
        summerSeason: reservationData.summerSeason,
        verificationStatus: true
      });

      Reservation.updateOne({_id: reservationData._id}, reservationUpdateStatus).then(result => {
        res.status(200).json({message: "RESERVATION STATUS UPDATE SUCCESS ! ", status: 200});
      });
    } else {
      res.status(404).json({message: "RESERVATION VERIFICATION ERROR ! ", status: 404});
    }






  });

});


module.exports = router;
