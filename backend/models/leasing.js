const mongoose = require('mongoose');


const leasingSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    carId: {type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true},
    leasingEntryFee: {type: Number, required: true},
    leasingTime: {type: Number, required: true},
    leasingInstalmentPrice: {type: Number, required: true},
});

module.exports = mongoose.model('leasing-details', leasingSchema);
