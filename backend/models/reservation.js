const mongoose = require('mongoose');



const reservationSchema = mongoose.Schema({
  numberOfPlaces: { type: Number, required: true },
  systemDate: { type: Date, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  verificationStatus: {type: Boolean, required: true}


});

module.exports = mongoose.model('Reservation', reservationSchema);
