const mongoose = require('mongoose');



const courseSchema = mongoose.Schema({

  courseStartDateSystem: {type: Date, required: true},
  courseStartDate: { type: String, required: true },
  courseEndDate: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: String, required: true },
  numberOfPlaces: { type: Number, required: true },
  busyPlaces: {type: Number, required: true}

});

module.exports = mongoose.model('Course', courseSchema);
