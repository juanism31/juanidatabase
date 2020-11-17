var express = require('express');
var router = express.Router();

const peliculasController =require('../controllers/peliculasController')
const actoresController = require('../controllers/actoresController')
const generosController = require('../controllers/generosController')
const crearPeliMiddleware = require('../middleware/crearPeliMiddleware');
const { Router } = require('express');


router.get('/peliculas',peliculasController.all)
router.get('/',peliculasController.recomendado)
router.get('/create',peliculasController.create)
router.post('/create',crearPeliMiddleware,peliculasController.store)
router.get('/update/:id',peliculasController.update)
router.post('/update/:id/',crearPeliMiddleware,peliculasController.change)
router.get('/pelicula/:id',peliculasController.id)
router.post('/borrar/:id',peliculasController.delete)
router.get('/estrenos',peliculasController.estrenos)


router.post('/',peliculasController.finder)


router.get('/generos',generosController.all)
router.get('/generos/:id',generosController.detalle)


router.get('/actores',actoresController.all)
router.get('/actores/:id',actoresController.id)




module.exports = router;
