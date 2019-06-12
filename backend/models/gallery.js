const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Gallery', gallerySchema);
