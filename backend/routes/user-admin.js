const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userAdmin = require('../models/user-admin');

router.post("", (req, res, next) => {
    let fetchedUser;

    console.log('login DATA : ', req.body.login);
    console.log('password data : ', req.body.password);


    User.findOne({ login: req.body.login })
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
            console.log('RESSSSUUULT : ', result);


            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }


            const token = jwt.sign(
                { login: fetchedUser.login, userId: fetchedUser._id },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600
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

