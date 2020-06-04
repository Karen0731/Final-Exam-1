const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
const {Actors} = require('./models/actor-model');
const {Movies} = require('./models/movie-model');

const app = express();

app.post('/api/add-movie-actor', jsonParser, (req,res)=>{
    console.log("create actor");

    let actor_ID = req.body.actor_ID;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    let newActor={
        firstName, lastName, actor_ID:Number(actor_ID)
    };

    Actors
        .createActor(newActor)
        .then(result=>{
            return res.status(201).json(result);
        })
        .catch(err=>{
            res.statusMessage = "something went wrong" + err;
            return res.status(404).end();
        });

});



app.patch('/api/add-movie-actor/:movie_ID', jsonParser, errorHandler, (req,res)=>{
    console.log("Patching an existing actor");

    let movieID = req.params.movie_ID;

    let bodyId = req.body.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    let updatedData ={
        firstName,
        lastName
    };

    Actors
        .updateActor(bodyId,updatedData)
        .then(result=>{
            return res.status(201).json(result);
        })
        .catch(err=>{
            //errorHandler(err,req,res);
           res.statusMessage = "something went wrong" + err;
           return res.status(404).end();
        });

});

app.get('/api/getActorByName',(req,res)=>{

    let firstName = req.query.name;

    Actors
        .getActorsByName(firstName)
        .then(result=>{
            return res.status(200).json(result);
        })
        .catch(err=>{
            res.statusMessage="something went wrong"+err;
            return res.status(400).end();
        })

});

app.post('/api/addActorToMovieList',jsonParser,(req,res)=>{

    let firstName = req.params.firstName;

    Actors
        .getActorsByName(firstName)
        .then(result=>{
            return res.status(201).json(result);
        })
        .catch(err=>{
            res.statusMessage="something went wrong"+err;
            return res.status(400).end();
        })

});

app.post('/api/add-movie', jsonParser, (req,res)=>{

    console.log("create actor");

    let movie_ID = req.body.movie_ID;
    let movie_title = req.body.movie_title;
    let year = req.body.year;
    let rating = req.body.rating;
    let actors = req.body.actors;


    let firstName = req.query.firstName;

    Actors
        .getActorsByName(firstName)
        .then(result=>{
            let newMovie={
                movie_ID:Number(movie_ID), movie_title, year:Number(year),rating:Number(rating), actors:[result._id]
            };
            Movies
                .createMovie(newMovie)
                .then(result=>{
                    return res.status(201).json(result);
                })
                .catch(err=>{
                    res.statusMessage = "something went wrong" + err;
                    return res.status(404).end();
                });
        })
        .catch(err=>{
            res.statusMessage="something went wrong"+err;
            return res.status(400).end();
        })

});

app.patch('/api/addActorToMovieList', jsonParser, (req,res)=>{

    console.log("create actor");


    let firstName = req.query.firstName;
    let movieId = req.query.movie_ID;

    Actors
        .getActorsByName(firstName)
        .then(actor=>{
            let actorId=actor._id
        Movies
            .updateActors(actorId,movieId)
            .then(result=>{
                return res.status(201).json(result);
            })
            .catch(err=>{
                res.statusMessage = "something went wrong" + err;
                return res.status(404).end();
            });
        })
        .catch(err=>{
            res.statusMessage="something went wrong"+err;
            return res.status(400).end();
        })

});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});