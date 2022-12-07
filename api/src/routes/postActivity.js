const { Router } = require('express');
const { Activity, Country} = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');


const router = Router();

router.post('/', async(req,res)=>{

    try {
        const { name, difficulty, duration, season, countries } = req.body;

        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            countries
        });
        //Parseo el array countries para crear la actividad en cada uno
        countries.forEach(async (country) => {
            let activity = await Country.findOne({
                where: {
                    name: country
                }
            })
            //Añado una columna nueva a la tabla country
            await newActivity.addCountry(activity);
        });
        res.status(200).send('Activity created successfully');

    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_POST_ACTIVITY', 500);
        
    }



});

router.get('/', async(req,res)=>{

    try {
        const activities = await Activity.findAll({
            include: [{
                model: Country,
            }]
        })
        res.status(200).send(activities)
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ACTIVITIES');
    }

});

module.exports = router;