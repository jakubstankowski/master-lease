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

    leasing.save().then((r) => {
        res.status(200).json({
            message: "Finish order",
            result: r
        });
    })


});

router.get("/:id", (req, res, next) => {
    console.log('req params', req.params);

    Leasing.find({userId: req.params.id}).then((findLeasing) => {


       /* for (let i = 0; i < findLeasing.length; i++) {
            Cars.findById(findLeasing[i].carId).then(car => {
                const updateCar = new Cars({
                    _id:findLeasing[i].carId,
                    mark: findLeasing[i].mark,
                    model: findLeasing[i].model,
                    engine: findLeasing[i].engine,
                    price: findLeasing[i].price,
                    VIN: '1CGFDCVZ21233123',
                    url: 'https://media.ed.edmunds-media.com/audi/a7/2018/oem/2018_audi_a7_sedan_prestige-quattro_fq_oem_3_400.jpg',
                    provider: findLeasing[i].provider,
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
                Cars.updateMany({_id: findLeasing[i].id},  updateCar).then(result => {
                    console.log('RESULT : ', result);
                    res.status(200).json({message: "UPDATE SUCCESS ! "});
                });
            });


        }*/

        const arrayCars = [];
        const arrayLeasingTime = [];
        const arrayLeasingEntryFee = [];
        const arrayLeasingInstalmentPrice = [];

        findLeasing.map((val) => {
            arrayCars.push(val.carId);
            arrayLeasingTime.push(val.leasingTime);
            arrayLeasingEntryFee.push(val.leasingEntryFee);
            arrayLeasingInstalmentPrice.push(val.leasingInstalmentPrice);
        });

        res.status(200).json({
            cars: arrayCars,
            leasingTime: arrayLeasingTime,
            leasingEntryFee: arrayLeasingEntryFee,
            leasingInstalmentPrice: arrayLeasingInstalmentPrice
        });


    })

});


module.exports = router;

