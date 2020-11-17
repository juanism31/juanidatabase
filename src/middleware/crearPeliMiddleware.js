const {body, validationResult} = require('express-validator');

module.exports=[
    body('title')
    .notEmpty()
    .withMessage('No te olvides de poner el Nombre de la Pelicula!'),

    body('rating')
    .isNumeric()
    .withMessage('El rating tiene que ser un numero')
    .isDecimal()
    .withMessage('El rating debe ponerse con decimales'),

    body('length')
    .isNumeric()
    .withMessage('la duracion tiene que ser un numero')
    .isInt()
    .withMessage('La duracion debe estar escrita en minutos'),

    body('awards')
    .isNumeric()
    .withMessage('la cantidad de premios debe estar escrita en numeros')
    .isInt()
    .withMessage("no puede haber decimales! uno no puede recibir medio premio!"),
    body('genre_id')
    .notEmpty()
    .withMessage("te falta elegir un genero!"),
    body("actores")
    .notEmpty()
    .withMessage("pone al menos un actor, despues podes modificarlo para agregar mas"),
    body("release_date")
    .notEmpty()
    .withMessage('falta completar la fecha')
    .isDate()
    .withMessage("tiene que ser una fecha")




]