const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const ReservationPlaces = require('../models/reservation-places');

router.get("/:date", (req, res, next) => {
  ReservationPlaces.find().then((val) => {
    const placesLimit = val[0].dayLimitPlaces;
    Reservation.find({systemDate: req.params.date}).then((findReservation) => {
      const sumAllBusyPlacesArray = [...findReservation.map((val) => val.numberOfPlaces)];

      function checkIsBusyPlaces() {
        if (sumAllBusyPlacesArray.length !== 0) {
          return sumAllBusyPlacesArray.reduce((a, b) => a + b);
        } else {
          return 0;
        }
      }

      res.status(200).json({findReservation, sumAllBusyPlaces: checkIsBusyPlaces(), placesLimit: placesLimit});
    });

  });


});


module.exports = router;
