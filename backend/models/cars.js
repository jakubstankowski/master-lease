const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    mark: {type: String, required: true},
    model: {type: String, required: true},
    engine: {type: String, required: true},
    price: {type: Number, required: true},
    VIN: {type: String, required: true},
    url: {type: String, required: true},
    provider: {type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true},
    equipment: {type: Array, required: true},
    availability:{type: Boolean, required: true}
});


module.exports = mongoose.model('Car', carSchema);
