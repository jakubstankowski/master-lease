const express = require('express');
const router = express.Router();
const About = require('../models/about');
const Cars = require('../models/cars');

const ReservationPlaces = require('../models/reservation-places');


router.post("",
    (req, res, next) => {
    const car = new Cars({
            mark: req.body.mark,
            model: req.body.model,
            engine: req.body.engine,
            price: req.body.price,
            VIN: '1CGFDCVZ21233123',
            url: 'https://media.ed.edmunds-media.com/audi/a7/2018/oem/2018_audi_a7_sedan_prestige-quattro_fq_oem_3_400.jpg',
            provider: '5d00c322ffdf893218b1adc1',
            equipment: [
                'ASR (kontrola trakcji)',
                'Czujniki parkowania przednie',
                'ESP (stabilizacja toru jazdy)',
                'Klimatyzacja automatyczna',
                'MP3',
                'Podgrzewane przednie siedzenia',
                'HDR', 'Podgrzewane lusterka', 'Alufelgi',
                'Czujnik zmierzchu',
                'Elektrycznie ustawiane fotele',
                'Kamera cofania',
                'Komputer pokładowy',
                'Podgrzewane lusterka boczne',
                'Poduszki boczne przednie',
                'Światła do jazdy dziennej',

            ],
            availability: true,
        });

        car.save().then((data) => {
            console.log('ADD DATA : ', data);
        });


        res.status(201).json({
            message: "CAR added successfully"
        });
    });


router.get("", (req, res, next) => {
    Cars.find().then(cars => {
        res.status(200).json({
            message: "CARS fetched successfully!",
            cars: cars
        });
    });
});


router.get("/:id", (req, res, next) => {
    Cars.findById(req.params.id).then(car => {
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({message: "car NOT FOUND ! "});
        }
    });
});

router.delete("/:id",
    (req, res, next) => {

        /*About.deleteOne({_id: req.params.id}).then((result) => {
            //console.log(result);
            res.status(200).json({message: 'About deleted ! '});

        })*/

    });


module.exports = router;

