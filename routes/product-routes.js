const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product-model');
const router = express.Router();



router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      res.json(product);
    })
    .catch(error => {
      res.json(error);
    });
});

router.post('/products', (req, res, next) => {

  const { store_id, name, description, picture, price, category,Tags } = req.body;
  Product.create({
    store_id, 
    name, 
    description, 
    picture, 
    price, 
    category,
    Tags
  })
    .then(theResponse => {
      res.json(theResponse);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT route => to update a specific product
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