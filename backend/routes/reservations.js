const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const ReservationPlaces = require('../models/reservation-places');

const nodemailer = require('nodemailer');
const checkAuth = require('../middleware/check-auth');

router.get("", (req, res, next) => {
  Reservation.find().then(reservations => {
    res.status(200).json({
      message: "COURSES  fetched successfully!",
      reservations: reservations
    });
  });
});


router.post("", (req, res, next) => {

  const reservation = new Reservation({
    numberOfPlaces: req.body.numberOfPlaces,
    systemDate: req.body.systemDate,
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    verificationStatus: false
  });

  const onlyFirstName = req.body.name.split(" ")[0];


  // RESERVATION FINISH SEND E-MAIL


  const systemMail = `
         <body style="background-color: #f7f8fc">
           <div class="container-fluid">
             <div class="image" style="text-align: center;">
               <a href="https://imgur.com/QFPnrlL">
                 <img  style="width: 200px" src="https://i.imgur.com/QFPnrlL.png" title="source: imgur.com" />
               </a>
             </div>
           </div>
             <div  style="background-color: white; margin: 30px; padding: 15px" class="container">
               <div style="margin:30px" class="row">
                 <div class="col-sm">
                         <p style="margin-top: 30px" class="lead">Dane nowej rezerwacji :</p>
                 <ul style="list-style-type:circle;">
                     <li>
                       <p class="lead">Imię i Nazwisko: ${req.body.name}</p>
                     </li>
                     <li>
                       <p class="lead">E-Mail: ${req.body.email}</p>
                     </li>
                     <li>
                       <p class="lead">Data: ${req.body.date}</p>
                     </li>
                     <li>
                       <p class="lead">Godzina: ${req.body.time} </p>
                     </li>
                     <li>
                       <p class="lead">Liczba Miejsc: ${req.body.numberOfPlaces} </p>
                     </li>
                   </ul>
                   <br>
                 </div>
               </div>
             </div>
             <div class="container-fluid">
               <div class="image" style="text-align: center; margin-top: 30px">
                <a  style="text-decoration: none" href="http://85.255.8.232:3000/">
                  <img style="width: 40px; margin: 15px" src="https://i.imgur.com/4bfR8Sp.png" title="source: imgur.com" />
                </a>
                <a style="text-decoration: none" href="https://pl-pl.facebook.com/beforeshotbar/">
                  <img style="width: 40px; margin: 15px" src="https://i.imgur.com/OTxO1hR.png" title="source: imgur.com" />
                </a>
                <a style="text-decoration: none" href="https://www.instagram.com/explore/locations/1023557398/before-shot-bar?hl=pl">
                  <img style="width: 40px; margin: 15px" src="https://i.imgur.com/z8YQe5n.png" title="source: imgur.com" />
                </a>
                 <p  style="color: black" style="margin:30px">
                      <small>
                        Before Shot Bar <br> 
                        ul. Żeromskiego 19, 26-610 Radom, tel: 793 109 102
                      </small>
                  </p>
               </div>
             </div>
          </body> `;

  let systemMailOptions = {
    from: '"Rezerwacja Before Shot Bar" <rezerwacje@beforeshotbar.pl>', // sender address
    to: "rezerwacje@beforeshotbar.pl",
    subject: `Nowa rezerwacja na dzień ${req.body.date}`, // Subject line
    text: 'Hello world?', // plain text body
    html: systemMail // html body
  };


  reservation.save().then((data) => {
    const url = "https://" + req.get("host");
    const verificationUrl = `${url}/reservation-verification/${data._id}`;

    console.log('VERTIFICATION URL : ', verificationUrl);

    const clientEMail = `
       <body style="background-color: #f7f8fc">
      <div class="container-fluid">
        <div class="image" style="text-align: center;">
          <a href="https://imgur.com/QFPnrlL">
            <img  style="width: 200px" src="https://i.imgur.com/QFPnrlL.png" title="source: imgur.com" />
          </a>
        </div>
      </div>
        <div  style="background-color: white; margin: 30px; padding: 15px" class="container">
        <div style="margin: 15px" class="row">
          <div class="col-sm">
            <p class="lead" style="text-align: left">Cześć<span style="color: #682380;"> ${onlyFirstName},</span></p>
            <p class="lead" style="color: black">Oto dane Twojej rezerwacji :</p>
            <ul style="list-style-type:circle;">
              <li>
                <p class="lead" style="color: black">Data: ${data.date}</p>
              </li>
              <li>
                <p class="lead" style="color: black">Godzina: ${data.time} </p>
              </li>
              <li>
                <p class="lead" style="color: black">Liczba Miejsc: ${data.numberOfPlaces} </p>
              </li>
            </ul>
             <br>
             <p class="lead" style="color: black">
                Płatności za rezerwacje 
                <span style="font-weight: bold">
                powyżej  5 
                </span> 
                osób należy dokonać na rachunek bankowy:<br>
                Gold Kaizen Patrycja Lewandowska<br>
                ul. Żeromskiego 19<br>
                26-610 Radom<br>
                konto mBank 42 1140 2004 0000 3802 7735 9657<br>
                tytuł:"Opłata za rezerwację z dnia ${data.date}  na godzinę ${data.time}"<br>
                kwota: 10 złoty od osoby<br>
            </p>
            <br>
          <div  style="text-align: center; width: 100%; margin-top: 30px; margin-bottom: 30px" class="button">
                <a href="${verificationUrl}" style="width: 250px; padding: 15px; text-decoration: none; height: 50px; color: white; background-color: #682380; border: none; font-size: 1em;">
                  Potwierdź Rezerwacje
                </a>
              </div>
          </div>
        </div>
      </div>
    <div class="container-fluid">
      <div class="image" style="text-align: center; margin-top: 30px">
        <a  style="text-decoration: none" href="http://85.255.8.232:3000/">
          <img style="width: 40px; margin: 15px" src="https://i.imgur.com/4bfR8Sp.png" title="source: imgur.com" />
        </a>
        <a style="text-decoration: none" href="https://pl-pl.facebook.com/beforeshotbar/">
          <img style="width: 40px; margin: 15px" src="https://i.imgur.com/OTxO1hR.png" title="source: imgur.com" />
        </a>
        <a style="text-decoration: none" href="https://www.instagram.com/explore/locations/1023557398/before-shot-bar?hl=pl">
          <img style="width: 40px; margin: 15px" src="https://i.imgur.com/z8YQe5n.png" title="source: imgur.com" />
        </a>
         <p  style="color: black" style="margin:30px">
              <small>
                Before Shot Bar <br> 
                ul. Żeromskiego 19, 26-610 Radom, tel: 793 109 102
              </small>
          </p>
       </div>
      </div>
    </body>`;


    let transporter = nodemailer.createTransport({
      host: 'mail-serwer20598.lh.pl',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'rezerwacje@beforeshotbar.pl', // generated ethereal user
        pass: 'Goldkaizen1'  // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });


    let clientMailOptions = {
      from: '"Rezerwacja Before Shot Bar" <rezerwacje@beforeshotbar.pl>', // sender address
      to: `${req.body.email}`,
      subject: 'Potwierdzenie Rezerwacji - Before Shot Bar', // Subject line
      text: 'Hello world?', // plain text body
      html: clientEMail // html body
    };

    transporter.sendMail(clientMailOptions, (error, info) => {
      if (error) {

        Reservation.deleteOne({_id: data._id}).then((result) => {
          console.log('RESULT DELETE : ', result);
        });
        // console.log('problem z wysłaniem e-majla ! ', error);
      } else {
        console.log('wyslalo się ! ');

        res.status(200).json({status: 200});

        setTimeout(function () {
          transporter.sendMail(systemMailOptions, (error, info) => {
            if (error) {
              //return console.log(error);
            }
            console.log('do serwisu: %s', info.messageId);
          });
        }, 3000);


      }


    });


  });

  // res.status(201).json({reservationStatus: true});


});


router.delete("/:id",
  checkAuth,
  (req, res, next) => {

    Reservation.deleteOne({_id: req.params.id}).then((result) => {
      console.log(result);
      res.status(200).json({message: 'RESERVATION deleted ! '});

    })

  });


module.exports = router;
