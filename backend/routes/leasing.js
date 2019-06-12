const express = require('express');
const router = express.Router();
const Leasing = require('../models/leasing');
const Cars = require('../models/cars');

router.post("", (req, res, next) => {
    const leasing = new Leasing({
        userId: req.body.userId,
        carId: req.body.carId,
        leasingEntryFee: req.body.leasingEntryFee,
        leasingTime: req.body.leasingTime,
        leasingInstalmentPrice: req.body.leasingInstalmentPrice,
    });

    Cars.findById(req.body.carId).then(carFind => {

        console.log('car find mark', carFind.mark);
        const car = new Cars({
            _id: carFind._id,
            mark: carFind.mark,
            model: carFind.model,
            engine: carFind.engine,
            price: carFind.price,
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
            availability: false,
        });
        Cars.updateOne({_id: req.body.carId}, car).then(result => {
            res.status(200).json({message: "UPDATE SUCCESS ! "});
        });
    });

    leasing.save().then((r) => {
        res.status(200).json({
            message: "Finish order",
            result: r
        });
    })


});

router.get("/:id", (req, res, next) => {
    Leasing.find({userId: req.params.id}).then((findLeasing) => {
        const leasingArray = [];
        for (let i = 0; i < findLeasing.length; i++) {
            leasingArray.push(findLeasing[i]);
        }

        res.status(200).json({
            leasing: leasingArray,
        });


    })

});


module.exports = router;

