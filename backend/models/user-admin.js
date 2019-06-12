const mongoose = require("mongoose");


const userAdminSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


module.exports = mongoose.model("userAdmin", userAdminSchema);
