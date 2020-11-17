const {sequelize,DataTypes}= require('sequelize')
const peliculasController = require('../../controllers/peliculasController')

module.exports = (sequelize,DataTypes) =>{
    const Actor =sequelize.define('Actor',{
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
       favorite_movie_id: DataTypes.DECIMAL
        
    },{
        timeStamps: false
    })
    Actor.associate = (models=>{
        Actor.belongsToMany(models.Movie,{
            
            through: 'actor_movie',
        })
    })
    return Actor
}

