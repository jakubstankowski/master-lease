const express = require('express');
const router = express.Router();
const Provider = require('../models/provider');


router.get("/:id", (req, res, next) => {
    Provider.findById(req.params.id).then(car => {
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({message: "car NOT FOUND ! "});
        }
    });
});


module.exports = router;

