const mongoose = require('mongoose');

const provider = mongoose.Schema({
    company: { type: String, required: true },
    adress: {type: String, required: true},
    contact: {type: String, required: true},
    number: {type: Number, required: true}
});

module.exports = mongoose.model('Provider', provider);
