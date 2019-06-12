const express = require('express');
const router = express.Router();
const Newsletters = require('../models/newsletter');


router.post("",
  (req, res, next) => {
    const newsletter = new Newsletters({
      name: req.body.name,
      email: req.body.email.toLowerCase()
    });

    newsletter.save();

    res.status(201).json({
      message: "Newsletter added successfully"
    });
  });


module.exports = router;

