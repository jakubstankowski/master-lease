const mongoose = require('mongoose');

const newsletter = mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required: true}
});

module.exports = mongoose.model('Newsletter', newsletter);
