const express = require("express");
const mongoose = require("mongoose")

const Actor = require('../models/actor');
const movie = require("../models/movie");
const Movie = require('../models/movie');

const router = express.Router()

router.get('/', (req, res) => {
    Movie.find({}).populate('actors').exec((err, movies) => {
        if (err) return res.status(400).json(err);
        res.json(movies);
    })
})

//adds movie into database
router.post('/', (req, res) => {
    let newMovieDetails = req.body;
    newMovieDetails._id = new mongoose.Types.ObjectId();

    Movie.create(newMovieDetails, (err, movie) => {
        if (err) return res.status(400).json(err);
        res.json(movie);
    })
})

//adds a actor for that movie
router.post('/:id/actors', (req, res) => {
    Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();

        Actor.findOne({ _id: req.body.id }, (err, actor) => {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            movie.actors.push(actor);

            movie.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(movie);
            });
        });
    });
});

//gets movie based off of Id
router.get('/:id', (req, res) => {
    Movie.findOne({ _id: req.params.id }).populate('actors').exec( (err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        res.json(movie);
    })
})

router.get('/:year1/:year2', (req, res) => {
    Movie.find({}).where('year').lt(req.params.year1).gt(req.params.year2).exec((err, movies) => {
        if (err) return res.status(400).json(err);
        if (!movies) return res.status(404).json;
        res.json(movies)
    })
})

//updates movie by id
router.put('/:id', (req, res) => {
    Movie.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        res.json(movie);
    })
})

//deletes movie by id
router.delete('/:id', (req, res) => {
    Movie.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (err) return res.status(400).json(err);
        res.json();
    });
})

//delete all movies between the 2 values
router.delete('/:year1/:year2', (req, res) => {
    Movie.find({}).where('year').gte(req.params.year1).lte(req.params.year2).exec((err, movies) => {
        if (err) return res.status(400).json(err);
        if (!movies) return res.status(404).json();

        for ( let i = 0; i < movies.length; i++ ) {
            Movie.findOneAndDelete({_id: movies[i]._id}, (err) => {
                if (err) return res.status(400).json(err);
            })
        }

        res.json();
    })
})

//remove actor from movie if in list
router.put('/:movieid/:actorid', (req, res) => {
    Movie.findOne({_id: req.params.actorid}, (err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();

        for ( let i = 0; i < movie.actors.length; i++ ) {
            if ( movie.actors[i] == req.params.actorid ) {
                movie.actors.splice(i, 1)
            }
        }

        movie.save(function (err) {
            if (err) return res.status(500).json(err);
            res.json(movie);
        })
    })
})

//add an actor into the movie datebase
router.post('/:movieTitle/:actorName', (req, res) => {
    Movie.findOne({title: req.params.movieTitle}, (err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();

        Actor.findOne({name: req.params.actorName}, (err, actor) => {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            movie.actors.push(actor);

            movie.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(movie);

                console.log("success")
            });
        });
    });
});

module.exports = router;