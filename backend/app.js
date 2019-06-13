const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


compression = require('compression');

const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const leasingRouter = require('./routes/leasing');
const providerRouter = require('./routes/providers');


const carsRoute = require('./routes/cars');
const app = express();

app.use(compression());


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
app.use("/", express.static(path.join(__dirname, "vue")));


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


app.use("/provider", providerRouter);
app.use('/leasing', leasingRouter);
app.use('/cars', carsRoute);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "vue", "index.html"));
});


module.exports = app;


