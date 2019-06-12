const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


compression = require('compression');

const aboutsRouter = require('./routes/abouts');
const coursesRouter = require('./routes/courses');
const reservationRouter = require('./routes/reservations');
const courseParticipantRouter = require('./routes/course-participants');
const galleryRouter = require('./routes/gallery');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const reservationVerification = require('./routes/reservation-verification');
const reservationPlaces = require('./routes/reservation-places');
const reservationSelectedDate = require('./routes/reservation-selected-date');
const newsletterRoute = require('./routes/newsletters');
const leasingRouter = require('./routes/leasing');

const carsRoute = require('./routes/cars');
const Cars = require('./models/cars');

const app = express();

app.use(compression());

//kuba:Xb2Zto5TjWojACRa
mongoose
    .connect(
        "mongodb+srv://kuba:Xb2Zto5TjWojACRa@master-lease-92boh.mongodb.net/master-lease?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to database 28");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH,PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/leasing', leasingRouter);
app.use('/cars', carsRoute);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/newsletter', newsletterRoute);
app.use('/api/gallery', galleryRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/abouts', aboutsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/course-participants', courseParticipantRouter);
app.use('/reservation-verification', reservationVerification);
app.use('/reservation-places', reservationPlaces);
app.use('/reservation-selected-date', reservationSelectedDate);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
});


module.exports = app;


