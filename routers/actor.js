const express = require("express");
const mongoose = require("mongoose");
const actor = require("../models/actor");

const Actor = require('../models/actor');
const Movie = require('../models/movie');

const router = express.Router()

//get all actors and the details of the mvoies
router.get('/', (req, res) => {
    Actor.find({}).populate('movies').exec((err, actors) => {
        if (err) return res.status(400).json(err);
        res.json(actors);
    });
});

//create an actor
router.post('/', (req, res) => {
    let newActorDetails = req.body;
    newActorDetails._id = new mongoose.Types.ObjectId();

    Actor.create(newActorDetails, (err, actor) => {
        if (err) return res.status(400).json(err);
        res.json(actor);
    });
});

//get a specific actor
router.get('/:id', (req, res) => {
    Actor.findOne({ _id: req.params.id }).populate('movies').exec( (err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        res.json(actor);
    });
});

//updates an existing actor
router.put('/:id', (req, res) => {
    Actor.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        res.json(actor);
    });
});

//adds a movie for that actor
router.post('/:id/movies', (req, res) => {
    Actor.findOne({ _id: req.params.id }, (err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        Movie.findOne({ _id: req.body.id }, (err, movie) => {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            actor.movies.push(movie);
            movie.actors.push(actor);

            actor.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(actor);
            });
        });
    });
});

//deletes that actor from the database
router.delete('/:id', (req, res) => {
    Actor.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) return res.status(400).json(err);
        res.json();
    });
});

//delete actor and all it's movies
router.delete('/:id/movies', (req, res) => {
    Actor.findOne({_id: req.params.id}, (err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        
        for ( let i = 0; i < actor.movies.length; i++ ) {
            Movie.findOneAndDelete({_id: actor.movies[i]}, (err) => {
                if (err) return res.status(400).json(err);
                console.log("deleted")
            })
        }

        Actor.findOneAndDelete({_id: req.params.id}, (err) => {
            if (err) return res.status(400).json(err);
            res.json();
        })
    })
})

//remove movie from actor if in list
router.put('/:actorid/:movieid', (req, res) => {
    Actor.findOne({_id: req.params.actorid}, (err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        for ( let i = 0; i < actor.movies.length; i++ ) {
            if ( actor.movies[i] == req.params.movieid ) {
                actor.movies.splice(i, 1)
            }
        }

        actor.save(function (err) {
            if (err) return res.status(500).json(err);
            res.json(actor);
        })
    })
})

router.get('/actorsByMoviesYear/:year', (req, res) => {
    Movie.find({'year': req.params.year}).populate('actors').exec((err, movies) => {
        if (err) return res.status(400).json(err);

        console.log(movies[0].actors[0].name);

        res.json(movies);

    });
});


module.exports = router;