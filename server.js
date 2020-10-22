const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const actorsRouter = require("./routers/actor");
const moviesRouter = require("./routers/movie");
const path = require("path");

const app = express();

app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/lab10")));

app.use('/actors', actorsRouter);
app.use('/movies', moviesRouter);

mongoose.connect('mongodb://localhost:27017/lab7db', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});