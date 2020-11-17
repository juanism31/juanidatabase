const {Movie, Genre, Actor}= require('../database/models')
// const {Op} = require(sequelize)
module.exports = {
    all: async (req,res)=>{
        
        const generos = await Genre.findAll()
       
       
        res.json(generos)
        res.render('generos',generos)
    },
    detalle: async (req,res)=>{
        const peliculas = await Movie.findAll()
        const genero = await Genre.findByPk(req.params.id)

        
                // res.json(genero)
                res.render('genero',{genero,peliculas})
        
            }
        
    
}