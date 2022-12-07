const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type:DataTypes.ENUM('1','2','3','4','5'),
        },
        duration:{
            type:DataTypes.INTEGER
        },
        season:{
            type:DataTypes.STRING
        }
    });
};