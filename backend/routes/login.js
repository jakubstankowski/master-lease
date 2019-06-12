const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("", (req, res, next) => {
    let fetchedUser;
    User.findOne({login: req.body.login})
        .then(user => {
            console.log('USER : ', user);
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign(
                {login: fetchedUser.login, userId: fetchedUser._id},
                "secret_this_should_be_longer",
                {expiresIn: "1h"}
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });


        })


        .catch(err => {
            console.log('ERROR : ', err);

            return res.status(401).json({
                message: "Auth failed"
            });


        });


});


module.exports = router;

