const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product-model');
const User = require('../models/user-model');

const router = express.Router();


/*                                                                                                           ,,                                   
`7MM"""Mq.                        `7MM                      mm           
  MM   `MM.                         MM                      MM           
  MM   ,M9 `7Mb,od8 ,pW"Wq.    ,M""bMM `7MM  `7MM  ,p6"bo mmMMmm ,pP"Ybd 
  MMmmdM9    MM' "'6W'   `Wb ,AP    MM   MM    MM 6M'  OO   MM   8I   `" 
  MM         MM    8M     M8 8MI    MM   MM    MM 8M        MM   `YMMMa. 
  MM         MM    YA.   ,A9 `Mb    MM   MM    MM YM.    ,  MM   L.   I8 
.JMML.     .JMML.   `Ybmd9'   `Wbmd"MML. `Mbod"YML.YMbmd'   `MbmoM9mmmP'                                                                                                                                                
*/


/***
 *    ########  ######## ########    ###    #### ##        ######  
 *    ##     ## ##          ##      ## ##    ##  ##       ##    ## 
 *    ##     ## ##          ##     ##   ##   ##  ##       ##       
 *    ##     ## ######      ##    ##     ##  ##  ##        ######  
 *    ##     ## ##          ##    #########  ##  ##             ## 
 *    ##     ## ##          ##    ##     ##  ##  ##       ##    ## 
 *    ########  ########    ##    ##     ## #### ########  ######  
 */
// Voir un produit
router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      res.json(product); // return le produit
    })
    .catch(error => {
      res.json(error);
    });
});

/***
 *     ######  ########  ########    ###    ######## ######## 
 *    ##    ## ##     ## ##         ## ##      ##    ##       
 *    ##       ##     ## ##        ##   ##     ##    ##       
 *    ##       ########  ######   ##     ##    ##    ######   
 *    ##       ##   ##   ##       #########    ##    ##       
 *    ##    ## ##    ##  ##       ##     ##    ##    ##       
 *     ######  ##     ## ######## ##     ##    ##    ######## 
 */

 router.post('/products', (req, res, next) => {
  const { store_id, name, description, picture, price, category,Tags } = req.body;
  Product.create({
    store_id: req.session.currentUser._id, // à tester
    name, 
    picture, 
    price, 
    category,
    Tags
  })
    .then(theResponse => {
      res.json(theResponse);
      console.log(theResponse)
    })
    .catch(err => {
      res.json(err);
    });
});

/***
 *    ##     ## ########  ########     ###    ######## ######## 
 *    ##     ## ##     ## ##     ##   ## ##      ##    ##       
 *    ##     ## ##     ## ##     ##  ##   ##     ##    ##       
 *    ##     ## ########  ##     ## ##     ##    ##    ######   
 *    ##     ## ##        ##     ## #########    ##    ##       
 *    ##     ## ##        ##     ## ##     ##    ##    ##       
 *     #######  ##        ########  ##     ##    ##    ######## 
 */
router.put('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});

/*
 *    ########  ######## ##       ######## ######## ######## 
 *    ##     ## ##       ##       ##          ##    ##       
 *    ##     ## ##       ##       ##          ##    ##       
 *    ##     ## ######   ##       ######      ##    ######   
 *    ##     ## ##       ##       ##          ##    ##       
 *    ##     ## ##       ##       ##          ##    ##       
 *    ########  ######## ######## ########    ##    ######## 
 */
router.delete('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;