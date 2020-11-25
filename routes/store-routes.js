const express = require('express');
const router = express.Router();
const Store = require('../models/user-model');
const geocoder = require('../utils/geocoder')
const mongoose = require('mongoose');
const colors = require('colors');
const User = require('../models/user-model');


/***
 *      ______                       __                                __      __                     
 *     /      \                     |  \                              |  \    |  \                    
 *    |  $$$$$$\  ______    ______  | $$  ______    _______  ______  _| $$_    \$$  ______   _______  
 *    | $$ __\$$ /      \  /      \ | $$ /      \  /       \|      \|   $$ \  |  \ /      \ |       \ 
 *    | $$|    \|  $$$$$$\|  $$$$$$\| $$|  $$$$$$\|  $$$$$$$ \$$$$$$\\$$$$$$  | $$|  $$$$$$\| $$$$$$$\
 *    | $$ \$$$$| $$    $$| $$  | $$| $$| $$  | $$| $$      /      $$ | $$ __ | $$| $$  | $$| $$  | $$
 *    | $$__| $$| $$$$$$$$| $$__/ $$| $$| $$__/ $$| $$_____|  $$$$$$$ | $$|  \| $$| $$__/ $$| $$  | $$
 *     \$$    $$ \$$     \ \$$    $$| $$ \$$    $$ \$$     \\$$    $$  \$$  $$| $$ \$$    $$| $$  | $$
 *      \$$$$$$   \$$$$$$$  \$$$$$$  \$$  \$$$$$$   \$$$$$$$ \$$$$$$$   \$$$$  \$$  \$$$$$$  \$$   \$$
 *                                                                                                    
 *                                                                                                    
 *                                                                                                    
 */



/***
 *    ______          _ _           
 *    | ___ \        | (_)          
 *    | |_/ /__ _  __| |_ _   _ ___ 
 *    |    // _` |/ _` | | | | / __|
 *    | |\ \ (_| | (_| | | |_| \__ \
 *    \_| \_\__,_|\__,_|_|\__,_|___/
 *                                  
 *                                  
 */

// On va chercher les Stores disponibles dans un radius (Distance) pour
// un code postal en particulier 

const getStoreInRadius = (async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const locFR = loc.filter(e => e.countryCode === "FR")

  console.log(colors.green.inverse(locFR))

  const lat = locFR[0].latitude
  const lng = locFR[0].longitude

  console.log('🎢🎢🎢🎢🎢 LAT:', lat)
  console.log('👽👽👽👽LON:', lng)

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6378 km
  const radius = distance / 6378;

  const stores = await Store.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: stores.length,
    data: stores
  });
});

/***
 *    ______ _     _                       
 *    |  _  (_)   | |                      
 *    | | | |_ ___| |_ __ _ _ __   ___ ___ 
 *    | | | | / __| __/ _` | '_ \ / __/ _ \
 *    | |/ /| \__ \ || (_| | | | | (_|  __/
 *    |___/ |_|___/\__\__,_|_| |_|\___\___|
 *                                         
 *                                         
 */

//Get distance à partir de la latitud et longitud 

router.get('/stores/distances/:latlng', (req, res, next) => {
  const { latlng, } = req.params;
  const [lat, lng] = latlng.split(',');

  //par défaut c'est meters
  const multiplier = 1;

  Store
    .aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng * 1, lat * 1] },
          distanceField: 'distance',
          distanceMultiplier: multiplier,
          // query: { businessType: type },
        }
      },
      {
        $project: {
          distance: 1,
          fullName: 1,
          address: 1,
          businessType: 1,
          picture: 1,
          location: 1,
        }
      }
    ])
    .then(project => {
      console.log(colors.green.inverse(project))
      res.status(200).json(project);
    })
    .catch(error => {
      res.json(error);
    });
});

/***
 *    ______            _            
 *    | ___ \          | |           
 *    | |_/ /___  _   _| |_ ___  ___ 
 *    |    // _ \| | | | __/ _ \/ __|
 *    | |\ \ (_) | |_| | ||  __/\__ \
 *    \_| \_\___/ \__,_|\__\___||___/
 *                                   
 *                                   
 */

router.route('/stores/zipcode/:zipcode/distance/:distance').get(getStoreInRadius);
//router.route('/stores/distances/:latlng/type/:type').get(getDistances); >> voir si c'est mieux



/**
$$$$$$$\  $$$$$$$$\ $$$$$$$$\  $$$$$$\  $$$$$$\ $$\       $$$$$$\
$$  __$$\ $$  _____|\__$$  __|$$  __$$\ \_$$  _|$$ |     $$  __$$\
$$ |  $$ |$$ |         $$ |   $$ /  $$ |  $$ |  $$ |     $$ /  \__|
$$ |  $$ |$$$$$\       $$ |   $$$$$$$$ |  $$ |  $$ |     \$$$$$$\
$$ |  $$ |$$  __|      $$ |   $$  __$$ |  $$ |  $$ |      \____$$\
$$ |  $$ |$$ |         $$ |   $$ |  $$ |  $$ |  $$ |     $$\   $$ |
$$$$$$$  |$$$$$$$$\    $$ |   $$ |  $$ |$$$$$$\ $$$$$$$$\\$$$$$$  |
\_______/ \________|   \__|   \__|  \__|\______|\________|\______/
 */

router.get(`/stores/:id`, (req, res, next) => {

  const storeId = req.params.id;
  console.log("params", req.params)
  console.log("storeId", storeId)
  User.findById(storeId)
    .then(store => {
      res.status(200).json(store)
    })
    .catch(err => {
      res.status(400).json({ message: err })
    })


})











module.exports = router;


