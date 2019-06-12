const mongoose = require('mongoose');


const test = mongoose.Schema({

  courses: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  participants: {type: mongoose.Schema.Types.ObjectId, ref: "Participants", required: true}

});

module.exports = mongoose.model('test', test);
