const express = require('express');
const router = express.Router();
const Store = require('../models/user-model');
const geocoder = require('../utils/geocoder')
const mongoose = require('mongoose');
const colors = require('colors');



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




const getDistances = (async (req, res, next) => {
  const { latlng, type } = req.params;
  const [lat, lng] = latlng.split(',');

  //par défaut c'est m
  const multiplier = 0.001;

  const distances = await Store.aggregate([
    {
      $geoNear: {
        near: {type: 'Point', coordinates: [lng * 1, lat * 1]},
        distanceField: 'distance',
        distanceMultiplier: multiplier,
        query: { businessType: type },
      }
    },
    {
      $project: {
        distance: 1,
        fullName: 1,
        address: 1, 
        businessType: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  });
});


router.route('/stores/zipcode/:zipcode/distance/:distance').get(getStoreInRadius);
router.route('/stores/distances/:latlng/type/:type').get(getDistances);






module.exports = router;


