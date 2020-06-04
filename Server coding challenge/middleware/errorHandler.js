function errorHandler(error, req, res) {

    if(!req.body.id)
    {
        res.statusMessage = "Id is missing in the body of the request";
        return res.status(406).end();
    }

     if(req.params.movie_ID!==req.body.id)
     {
         res.statusMessage="id and movie_ID do not match";
         return res.status(409).end();
     }

     if(!req.body.firstName || !req.body.lastName)
     {
         res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list";
         return res.status(403).end();
     }



     next();
}

module.exports = errorHandler;