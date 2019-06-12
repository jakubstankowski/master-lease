const mongoose = require('mongoose');


const courseParticipantsSchema = mongoose.Schema({
  courseId: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
  name: {type: String, required: true},
  birthdayDate: {type: String, required: true},
  city: {type: String, required: true},
  street: {type: String, required: true},
  houseNumber: {type: String, required: true},
  postalCode: {type: String, required: true},
  email: {type: String, required: true},
  telephone: {type: String, required: true},
  courseStartDateSystem: {type: Date, required: true},
  courseStartDate: {type: String, required: true},
  courseEndDate: {type: String, required: true},
  courseNumberOfPlaces: {type: Number, required: true},
  coursePrice: {type: String, required: true},
  courseTime: {type: String, required: true},
});

module.exports = mongoose.model('course-participants', courseParticipantsSchema);
