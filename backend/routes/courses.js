const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const checkAuth = require('../middleware/check-auth');
const CourseParticipants = require('../models/course-participant');
const nodemailer = require('nodemailer');


router.post("",
  checkAuth,
  (req, res, next) => {


    const course = new Course({
      courseStartDateSystem: req.body.courseStartDateSystem,
      courseStartDate: req.body.courseStartDate,
      courseEndDate: req.body.courseEndDate,
      time: req.body.time,
      price: req.body.price,
      numberOfPlaces: req.body.numberOfPlaces,
      busyPlaces: 0
    });

    course.save();
    res.status(201).json({
      message: "Course added successfully"
    });


  });

router.get("", (req, res, next) => {
  // delete the past courses
  const date = new Date();
  const finalActualDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  Course.deleteMany({courseStartDateSystem: {$lt: finalActualDate}}, function (value, err) {
    // console.error('delete error :', err);
  });
  Course.find().then(courses => {
    res.status(200).json({
      message: "COURSES  fetched successfully!",
      courses: courses
    });

  });
});


router.get("/:id", (req, res, next) => {

  Course.findById(req.params.id).then(course => {
    // console.log('course DATA : ', course);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({message: "course NOT FOUND ! "});
    }
  });
});


router.put("/:id",
  checkAuth,
  (req, res, next) => {

    const course = new Course({
      _id: req.body.id,
      courseStartDateSystem: req.body.courseStartDateSystem,
      courseStartDate: req.body.courseStartDate,
      courseEndDate: req.body.courseEndDate,
      time: req.body.time,
      numberOfPlaces: req.body.numberOfPlaces,
      price: req.body.price
    });

    CourseParticipants.find({courseId: req.body.id}).then((val) => {


      for (let i = 0; i < val.length; i++) {
        const courseUpdateParticipants = new CourseParticipants({
          _id: val[i]._id,
          name: val[i].name,
          birthdayDate: val[i].birthdayDate,
          email: val[i].email,
          telephone: val[i].telephone,
          courseStartDateSystem: req.body.courseStartDateSystem,
          courseStartDate: req.body.courseStartDate,
          courseEndDate: req.body.courseEndDate,
          courseTime: req.body.time,
          courseNumberOfPlaces: req.body.numberOfPlaces,
          coursePrice: req.body.price,
          courseId: req.body.courseId
        });


        CourseParticipants.updateOne({_id: val[i]._id}, courseUpdateParticipants).then(result => {
          //console.log('RESULT : ', result);
          res.status(200).json({message: "UPDATE SUCCESS ! "});
        });


        /* SEND INFO E-MAIL */
        const clientMail =
          `<body style="background-color: #f7f8fc">
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
                  <p class="lead" style="text-align: left">Cześć !</p>
                  <p class="lead">Niektóre dane kursu uległy zmianie, oto szczegóły : </p>
                  <ul style="list-style-type: circle;">
                    <li>
                      <p class="lead"> Aktualna data: ${req.body.courseStartDate} - ${req.body.courseEndDate}</p>
                    </li>
                    <li>
                      <p class="lead">Aktualna godzina: ${req.body.time} </p>
                    </li>
                    <li>
                      <p class="lead">Aktualna cena: ${req.body.price} ZŁ </p>
                    </li>
                  </ul>
                  <br>
                    <p class="lead" style="text-align: center">Do zobaczenia !</p>
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

        let clientMailOptions = {
          from: '"Szkolenia Before Shot Bar" <szkolenia@beforeshotbar.pl>', // sender address
          to: `${val[i].email}`,
          subject: 'Nowe dane kursu - Before Shot Bar', // Subject line
          text: 'Hello world?', // plain text body
          html: clientMail // html body
        };

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
        transporter.sendMail(clientMailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          //console.log('UPDATE MESSAGE', info.messageId);
        });


      }

    });

    Course.updateOne({_id: req.params.id}, course).then(result => {
      res.status(200).json({message: "UPDATE SUCCESS ! "});
    });

  });


router.delete("/:id",
  checkAuth,
  (req, res, next) => {
    CourseParticipants.find({courseId: req.params.id}).then((val) => {
      //console.log('VAL : ', val);
      for (let i = 0; i < val.length; i++) {

        CourseParticipants.deleteOne({_id: val[i]._id}).then((result) => {
          res.status(200).json({message: 'COURSE PARTICIPANTS DELETE ! '});
          //console.log('DELETE RESULT : ', result);
        });

        const clientMail =
          `<body style="background-color: #f7f8fc">
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
                    <p class="lead" style="text-align: left">Cześć,</p>
                    <p class="lead">Kurs  barmański w dniach  ${val[0].courseStartDate} - ${val[0].courseEndDate} niestety nie odbędzie się, przepraszamy za wszelkie niedogodności !  </p>
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

        const systemMail =
          `<body style="background-color: #f7f8fc">
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
                   <p class="lead" style="text-align: left">Lista uczestników którzy dołączyli do usuniętego kursu : </p>
                   <table>
                     <tr>
                       <th>Imię Nazwisko</th>
                       <th>E-Mail</th>
                       <th>Telefon</th>
                       <th>Data Rozpoczęcia Kursu</th>
                       <th>Data Zakończenia Kursu</th>
                     </tr>
                     <tr>
                       <td scope="row">
                         <p class="lead">
                           ${val[i].name}
                         </p>
                       </td>
                       <td>
                         <p class="lead">
                           ${val[i].email}
                         </p>
                       </td>
                       <td>
                         <p class="lead">
                           ${val[i].telephone}
                         </p>
                       </td>
                       <td>
                         <p class="lead">
                           ${val[i].courseStartDate}
                         </p>
                       </td>
                       <td>
                         <p class="lead">
                           ${val[i].courseEndDate}
                         </p>
                       </td>
                     </tr>
                   </table>
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


        let clientMailOptions = {
          from: '"Szkolenia Before Shot Bar" <szkolenia@beforeshotbar.pl>', // sender address
          to: `${val[i].email}`,
          subject: `Kurs w dniu ${val[0].courseStartDate} został odwołany - Before Shot Bar`, // Subject line
          text: 'Hello world?', // plain text body
          html: clientMail // html body
        };

        let systemtMailOptions = {
          from: '"Szkolenia Before Shot Bar" <szkolenia@beforeshotbar.pl>', // sender address
          to: "szkolenia@beforeshotbar.pl",
          subject: `Kurs w dniu ${val[0].courseStartDate} został odwołany - lista uczestników`, // Subject line
          text: 'Hello world?', // plain text body
          html: systemMail // html body
        };

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


        transporter.sendMail(clientMailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('UPDATE MESSAGE', info.messageId);
        });
        transporter.sendMail(systemtMailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('UPDATE MESSAGE', info.messageId);
        });

      }

    });

    Course.deleteOne({_id: req.params.id}).then((result) => {
      res.status(200).json({message: 'COURSE deleted ! '});
    });


  });


module.exports = router;

