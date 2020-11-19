const express = require('express');
const ordersRoute = express.Router();

const Order = require('../models/product-model')

ordersRoute.post('/orders', (req, res, next) => {
  const { client_id, store_id, products, totalAmount, appointment, comment, status } = req.body;

  const newOrder = new Order({
    client_id: req.session.currentUser,
    store_id,
    products,
    totalAmount,
    appointment,
    comment,
    status
  })

  newOrder.save()
    .then(order => {
      res.status(200).json(order);
    })
    .catch(err => res.status(500).json('Order creation failed'));

})

ordersRoute.get('/order', (req, res, next) => {


})



module.exports = ordersRoute