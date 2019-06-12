const express = require('express');
const router = express.Router();
const CourseParticipant = require('../models/course-participant');
const nodemailer = require('nodemailer');
const Course = require('../models/course');
const checkAuth = require('../middleware/check-auth');


router.post("", (req, res, next) => {
  const courseID = '5c4d86b37bf8d22b2c3e35fa';
  const test = Course.findById(courseID).then((course) => {
    // console.log('COURSE : ', course);
  });


  const courseParticipant = new CourseParticipant({
    courseId: req.body.courseId,
    name: req.body.name,
    birthdayDate: req.body.birthdayDate,
    city: req.body.city,
    street: req.body.street,
    houseNumber: req.body.houseNumber,
    postalCode: req.body.postalCode,
    email: req.body.email,
    telephone: req.body.telephone,
    courseStartDateSystem: req.body.courseStartDateSystem,
    courseStartDate: req.body.courseStartDate,
    courseEndDate: req.body.courseEndDate,
    courseNumberOfPlaces: req.body.courseNumberOfPlaces,
    coursePrice: req.body.coursePrice,
    courseTime: req.body.courseTime,

  });


  //console.log('nie zapisało się !');


  const onlyFirstName = req.body.name.split(" ")[0];

  CourseParticipant.find().then((courseParticipant) => {
    // number of places course limit
    const actualDateArray = [];
    courseParticipant.map((val) => actualDateArray.push(val.courseStartDate));
    const checkIsCourseParticipantInDatabase = actualDateArray.indexOf(req.body.courseStartDate);


    if (checkIsCourseParticipantInDatabase === -1) {
      addToDatabase(true);
    } else {
      const sameDateArray = [];
      actualDateArray.map((val) => {
        if (val === req.body.courseStartDate) {
          return sameDateArray.push(val);
        }
      });
      const lengthOfTheSameDate = sameDateArray.length;
      // check is free places
      if (lengthOfTheSameDate < req.body.courseNumberOfPlaces) {
        addToDatabase(true)
      } else {
        addToDatabase(false);
      }
    }
  });


  //EMAIL SECTION

  const clientMail = `
     <body style="background-color: #f7f8fc">
         <div class="container-fluid">
           <div class="image" style="text-align: center;">
             <a href="https://imgur.com/QFPnrlL">
                 <img  style="width: 250px" src="https://i.imgur.com/QFPnrlL.png" title="source: imgur.com" />
             </a>
           </div>
         </div>
         <div  style="background-color: white; margin: 15px; padding: 15px" class="container">
           <div style="margin: 15px" class="row">
             <div class="col-sm">
               <p class="lead" style="text-align: left">Dzień dobry!</p><br>
               <p class="lead">
                    Cieszymy się, że zdecydowałeś się zapisać na kurs który się odbędzie ${req.body.courseStartDate}<br>
                    Po przebytym kursie nabędziesz niezbędnych umiejętności, które pomogą ci w pracy za barem.<br>
                    Kurs jest przeznaczony dla osób, które nigdy nie miały kontaktu z gastronomią jak i dla osób, które chcą podnieść swoje kompetencje.<br>
                   <br>
               
                </p>
               <p class="lead"> Aby wziąć udział w kursie dokonaj opłaty za kurs na podane niżej konto: </p>
               
      

                 <ul style="list-style-type: circle;">
                 <li>
                   <p class="lead">Gold Kaizen Patrycja Lewandowska</p>
                 </li>
                 <li>
                   <p class="lead">ul. Żeromskiego 19</p>
                 </li>
                 <li>
                   <p class="lead">26-600 Radom</p>
                 </li>
                 <li>
                   <p class="lead">konto mBank 42 1140 2004 0000 3802 7735 9657</p>
                 </li>
                 <li>
                   <p class="lead">tytuł: Kurs Barmański termin ${req.body.courseStar}</p>
                 </li>
               </ul>
               <br>

               <p class="lead" style="text-align: left">
               Po dokonaniu płatności możesz przesłać potwierdzenie przelewu na adres e-mail: szkolenia@beforeshotbar.pl<br>
              Na płatność czekamy 48h, po tym czasie zwalniamy miejsce kolejnemu chętnemu.<br>
              Wszystkie szczegóły dotyczące kursu prześlemy w kolejnej wiadomości.<br>
                             </p>
               <p class="lead" style="text-align: left">
                    Pamiętaj, aby w korespondencji z nami podawać swoje imię i nazwisko oraz termin kursu na, który się zapisałes/aś. <br>
                    Ułatwi i przyśpieszy to komunikację. <br>
                    Dziękujemy za zaufanie i do zobaczenia na kursie!<br>
               
                </p>
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
           </div>
            <p style="margin:30px; text-align: center">
               <small>
                 Before Shot Bar <br>
                 ul. Żeromskiego 19, 26-610 Radom, tel: 793 109 102
               </small>
             </p>
         </div>
     </body>`;

  const systemMail = `
       <body style="background-color: #f7f8fc">
         <div class="container-fluid">
           <div class="image" style="text-align: center;">
             <a href="https://imgur.com/QFPnrlL">
               <img  style="width: 250px" src="https://i.imgur.com/QFPnrlL.png" title="source: imgur.com" />
             </a>
           </div>
         </div>
         <div  style="background-color: white; margin: 30px; padding: 15px; color: black" class="container">
           <div style="margin: 15px" class="row">
             <div class="col-sm">
               <p class="lead" style="color: black">Dane uczestnika kursu organizowanego w dniu ${req.body.courseStartDate}: </p>
               <ul style="list-style-type: circle;">
                 <li>
                   <p class="lead" style="color: black">Imie i Nazwisko: ${req.body.name}</p>
                 </li>
                 <li>
                   <p class="lead" style="color: black;">Data Urodzenia: ${req.body.birthdayDate} </p>
                 </li>
                  <li>
                   <p class="lead" style="color: black;">Miasto: ${req.body.city} </p>
                 </li>
                  <li>
                   <p class="lead" style="color: black;">Kod Pocztowy: ${req.body.postalCode} </p>
                 </li>
                  <li>
                   <p class="lead" style="color: black;">Ulica: ${req.body.street} </p>
                 </li>
                  <li>
                   <p class="lead" style="color: black;">Numer domu / mieszkania: ${req.body.houseNumber} </p>
                 </li>
                 <li>
                   <p class="lead" style="color: black">E-Mail: ${req.body.email} </p>
                 </li>
                 <li>
                   <p class="lead" style="color: black">Telefon: ${req.body.telephone} </p>
                 </li>
               </ul>
             </div>
           </div>
         </div>
         <div class="container-fluid">
           <div class="image" style="text-align: center; margin-top: 30px">
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
           
             <p style="margin:30px; color: black; padding: 15px">
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
      user: 'szkolenia@beforeshotbar.pl', // generated ethereal user
      pass: 'Goldkaizen1'  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let clientMailOptions = {
    from: '"Szkolenia Before Shot Bar" <szkolenia@beforeshotbar.pl>', // sender address
    to: `${req.body.email}`,
    subject: 'Kurs Barmański - Before Shot Bar', // Subject line
    text: 'Hello world?', // plain text body
    html: clientMail // html body
  };

  let systemMailOptions = {
    from: '"Szkolenia Before Shot Bar" <szkolenia@beforeshotbar.pl>', // sender address
    to: "szkolenia@beforeshotbar.pl",
    subject: `Nowy uczestnik kursu w dniu ${req.body.courseStartDate}`, // Subject line
    text: 'Hello world?', // plain text body
    html: systemMail // html body
  };


  function addToDatabase(addStatus) {

    if (addStatus) {

      Course.findById({_id: req.body.courseId}).then((courseData) => {
        transporter.sendMail(clientMailOptions, (error, info) => {
          if (error) {

          } else {
            courseParticipant.save();

            res.status(200).json({
              message: "NEW PARTICIPANTS added successfully",
              status: 200
            });


            const addParticipants = courseData.busyPlaces + 1;
            const course = new Course({
              _id: courseData._id,
              courseStartDateSystem: courseData.courseStartDateSystem,
              courseStartDate: courseData.courseStartDate,
              courseEndDate: courseData.courseEndDate,
              time: courseData.time,
              price: courseData.price,
              numberOfPlaces: courseData.numberOfPlaces,
              busyPlaces: addParticipants
            });
            Course.updateOne({_id: courseData._id}, course).then(result => {
              console.log('RESULT : ', result);
            });

            setTimeout(function () {
              transporter.sendMail(systemMailOptions, (error, info) => {
                if (error) {
                  res.status(404).json({
                    message: "ERROR!",
                    status: 404
                  });
                  //return console.log(error);
                }
              });
            }, 3000);
          }
        });
      });


      // SEND EMAIL WITH DATA


    } else if (!addStatus) {

      res.status(201).json({
        message: "ISN'T FREE PLACES ! ",
        joinToCourseBackendStatus: false
      });
    }
  }
});
router.get("", (req, res, next) => {
  // delete past course-participants

  /* const date = new Date();
   const finalActualDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
   CourseParticipant.deleteMany({courseStartDateSystem: {$lt: finalActualDate}}, function (value, err) {
    // console.error('delete error :', err);
   });*/

  CourseParticipant.find().then(courseParticipants => {
    res.status(200).json({
      message: "COURSES  fetched successfully!",
      courseParticipants: courseParticipants
    });
  });
});


router.delete("/:id",
  checkAuth,
  (req, res, next) => {
    console.log('REQ PARAMS ID : ', req.params.id);
    console.log('REQ BODY : ', req.body);
    CourseParticipant.findById({_id: req.params.id}).then((courseParticipantData) => {
      Course.findById({_id: courseParticipantData.courseId}).then((courseData) => {

        const deleteParticipants = courseData.busyPlaces - 1;

        const course = new Course({
          _id: courseData._id,
          courseStartDateSystem: courseData.courseStartDateSystem,
          courseStartDate: courseData.courseStartDate,
          courseEndDate: courseData.courseEndDate,
          time: courseData.time,
          price: courseData.price,
          numberOfPlaces: courseData.numberOfPlaces,
          busyPlaces: deleteParticipants
        });
        Course.updateOne({_id: courseData._id}, course).then(result => {
          // res.status(200).json({message: "UPDATE SUCCESS ! "});
        });

      });
    });

    CourseParticipant.deleteOne({_id: req.params.id}).then((result) => {
      res.status(200).json({message: 'COURSE PARTICIPANTS deleted ! '});
    })

  });


module.exports = router;

