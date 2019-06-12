const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");


router.post("", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            login: req.body.login,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            pesel: req.body.pesel
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "ADMIN created!",
                    result: result
                });


            })
            .catch(err => {
                console.log('error register : ', err);
                res.status(500).json({
                    error: err
                });
            });
    });

});


module.exports = router;

