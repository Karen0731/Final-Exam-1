const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieById:function(id){
        return moviesCollection
            .findOne({movie_ID:id})
            .then(movie=>{
                if(!movie) {
                    throw new Error("Movie not found");
                }
                return movie
            })
            .catch(err=>{
                throw new Error(err);
            })
    },
    updateActors:function(actorId,movieId){
        return moviesCollection
            .findOneAndUpdate(movieId,{$push:{actors:actorId}},{new:true,useFindAndModify:false})
            .populate('actors',['firstName','lastName'])
            .then(movie=>{
                return movie;
            })
            .catch(err=>{
                throw new Error(err);
            })
    }
};

module.exports = {
    Movies
};

