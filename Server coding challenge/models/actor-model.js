const mongoose = require( 'mongoose' );

const actorsSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    actor_ID : {
        type : Number,
        unique : true,
        required : true
    }
});

const actorsCollection = mongoose.model( 'actors', actorsSchema );

const Actors = {
    createActor : function( newActor ){
        return actorsCollection
                .create( newActor )
                .then( createdActor => {
                    return createdActor;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    updateActor:function (id_,updatedData) {
      return actorsCollection
          .updateOne({id:id_},{$set:updatedData})
          .then(updatedActor=>{
              return updatedActor;
          })
          .catch(err=>{
              return err;
          });
    },
    getActorsByName:function(firstName){
        return actorsCollection
            .findOne({firstName:firstName})
            .then(actor=>{
                if(!actor) {
                    throw new Error("Actor not found");
                }
                return actor
            })
            .catch(err=>{
                throw new Error(err);
            })
    }
};

module.exports = {
    Actors
};

