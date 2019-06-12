const mongoose = require('mongoose');


const reservationPlacesSchema = mongoose.Schema({
  dayLimitPlaces: {type: Number, required: true},
});


module.exports = mongoose.model('reservation-places', reservationPlacesSchema);
