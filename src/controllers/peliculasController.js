const db = require('../database/models');
const {Movie, Genre, Actor}= require('../database/models')

const {validationResult} = require('express-validator');

const {Op} = require('sequelize');  


module.exports = {
    
            

    
    all: async (req,res)=>{
        try{
            // todas las pelis
           
        const peliculas = await Movie.findAll({include:['Genre','actores']
                   
        })
    

    //    res.json(peliculas)
    res.render('peliculas',{peliculas})
        }catch(error){
            console.log(error)
        }
        
    },
    
    id:  async (req,res)=>{
        try{
            const pelicula = await Movie.findByPk(req.params.id,{include:['Genre','actores']})
            // res.json(peliculas)
            res.render('detalle_peli',{pelicula})
        }catch(error){
            console.log(error)
        }
    },

     recomendado:async (req,res)=>{
         try{
        const peliculas = await Movie.findAll({
            where:{rating:{[Op.gte]:8},
            },
            order:[
                ['rating','DESC']
            ]
        })
    
        const generos = await Genre.findAll();
        res.render('index',{peliculas,generos})
     }catch(error){
         console.log(error)
     }
    },
    create: async (req,res)=>{
        const generos = await Genre.findAll();
        const actores = await Actor.findAll()
    
        res.render('create',{generos,actores}) 
        },
    store: async (req,res)=>{
        // console.log(req.body)
        const generos = await Genre.findAll();
        const actores = await Actor.findAll()
        let errors = validationResult(req)
        if (errors.isEmpty()){
        const newMovie = await Movie.create(req.body)
        await newMovie.addActores(req.body.actores)
        res.redirect('/')
    }else{
        let oldValues = req.body
        res.render('create',{generos,actores,registerErrors:errors.errors, oldValues})
    }
    },
    update: async (req,res) =>{
    
        const movieId = req.params.id;
        const toEdit = await Movie.findByPk(movieId,{include:['Genre','actores']});
        const generos = await Genre.findAll();
        const actores = await Actor.findAll()
        
        
        res.render('update',{toEdit,generos,actores})
       
    },
    change: async(req,res)=>{
        try {
        let errors = validationResult(req)
        if (errors.isEmpty()){
        const movieId = req.params.id
        const toEdit = await Movie.findByPk(movieId,{include:['Genre','actores']});
        const changeMovie = await Movie.findByPk(movieId,{include:['Genre','actores']})
        await changeMovie.removeActores(changeMovie.actores)
        await changeMovie.addActores(req.body.actores)
        await changeMovie.update(req.body)
        res.redirect('/')
    }else{
        let oldValues = req.body
        res.render("update", {toEdit,generos,actores,registerErrors:errors.errors, oldValues})
    }
    }catch(error){
        console.log(error)
    }
    
    
    },
    // delete:async(req,res)=>{
    //     Movie.destroy({
    //         where:{id: req.params.id}
    //     })
    //     console.log('viajo por post')
    //     res.redirect('/peliculas')

    // },
    delete: async (req, res) => {
        try {
            const movieId = req.params.id; 
            const deleteMovie = await Movie.findByPk(movieId,{include: {all: true}});
            await deleteMovie.removeActores(deleteMovie.actores);
            deleteMovie.destroy({
                where: {
                    id: movieId
                }
            })             
            res.redirect("/peliculas")  
        }catch(error){
            console.log(error)
        }
    },


  
    finder: async(req,res)=>{
        const peliculas = await Movie.findAll({include:['Genre','actores']})

        const buscar= "%"+req.body.title+"%"
       const encontrados= await Movie.findAll({
            where:{title: {[Op.like]: buscar}}
        })
        res.render('index',{encontrados,peliculas})   
    },
    estrenos: async(req,res)=>{
        try{
        const peliculas = await Movie.findAll({
            order:[
                ['release_date','DESC']
                
            ],
            limit:5
        })
        res.render('estrenos',{peliculas})
            }catch(error){
                console.log(error)
       }
    }

    
}
      
