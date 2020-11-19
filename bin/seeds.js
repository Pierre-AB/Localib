const mongoose = require('mongoose');
const Product = require('../models/product-model')

const productData = require('../seed-data/products');

Product.create(productData)
  .then(() => {
    console.log("Products seeded")
    mongoose.connection.close()
  })
  .catch(err => {
    console.log('🚨 Seeding error =', err)
  })