const {Movie, Genre, Actor}= require('../database/models')

module.exports = {
    all: async (req,res)=>{
       
        const actors = await Actor.findAll()
    
       res.json(actors)
        
        
    },
    id: async(req,res)=>{
        const actor= await Actor.findByPk(req.params.id,{include:[Movie]})
        const peliculas = Movie.findAll()
        // res.json(actor)
        res.render('detalle_actor',{actor})

    }
}