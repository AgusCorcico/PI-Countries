const { Router } = require('express');
const { Activity, Country} = require('../db');
const { Op, Sequelize } = require('sequelize');
const axios = require('axios');
const { handleHttpError } = require('../utils/handleHttpError')

const router = Router();

const countriesApi = async() => {
    const infoApi = await axios.get('https://restcountries.com/v3/all');

    const countries = await infoApi.data.map( e =>{
        return {
            name: e.name.common,
            id: e.cca3,
            image: e.flags[0],
            continent: e.continents[0],
            capital:  e.capital ? e.capital[0] : 'Capital not found',
            subregion: e.subregion,
            area: e.area,
            population: e.population
        }
    })
    return countries;
};

router.get('/', async(req,res)=>{

    const name = req.query.name
    const countries = await countriesApi();

    try {
        //busco todos los paises de la db
        const allCountries = await Country.findAll({include: Activity})
        //en caso de que no se hayan cargado en la db, los creo
        if(!allCountries.length){
            //el bulkCreate va rellenando los valores de la tabla 
            await Country.bulkCreate(countries)
        }
        if(name){
            const countryByName = await Country.findAll({
                where: {
                    //uso iLike porque es un operador case-insensitive
                    //los %% son para hacer una consulta parcial, si solo pongo el name me lo busca solo de forma exacta
                    name: {[Sequelize.Op.iLike]: `%${name}%`}
                }
            })
            countryByName.length ? 
            res.status(200).send(countryByName) : 
            handleHttpError(res, "COUNTRY_DOESN'T_EXIST",404);
        }else{
            res.status(200).send(allCountries);
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_COUNTRIES');
    }


});



router.get('/:id', async(req,res)=>{

    const id = req.params.id;


    try {
        let countryByPk = await Country.findByPk(id, {include: Activity})

        countryByPk = {
            name: countryByPk.name,
            id: countryByPk.id,
            image: countryByPk.image,
            continent: countryByPk.continent,
            capital: countryByPk.capital,
            subregion: countryByPk.subregion,
            area: countryByPk.area,
            population: countryByPk.population,
            activities: countryByPk.activities.map(e=>{
                return {
                    id:e.id,
                    name: e.name,
                    difficulty: e.difficulty,
                    time: e.time,
                    season: e.season
                }
            })
        }
        res.status(200).send(countryByPk)
    } catch (error) {
        handleHttpError(res, "ID_INCORRECT",404);
    }
});

module.exports = router;


