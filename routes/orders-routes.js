const express = require('express');
const ordersRoute = express.Router();

const Order = require('../models/order-model')


// RETRIEVE APPOINTMENTS FOR A STORE

ordersRoute.get('/orders', (req, res, next) => {
  const storeId = req.query.storeId
  Order.find({ store_id: storeId })
    .then(response => {
      console.log("🍫 ORDER FROM DB=", response);
      res.status(200).json('ORDERS RETRIEVED')
    })
    .catch(err => { console.log("🥕", err) });

})



//CREATE A NEW ORDER / APPOINTMENT

ordersRoute.post('/orders', (req, res, next) => {
  // const { client_id, store_id, products, totalAmount, appointmentDay, appointmentTime, comment, status } = req.body;
  const { store_id, products, totalAmount, appointmentDay, appointmentTime, comment, status } = req.body;

  const newOrder = new Order({
    // client_id: req.session.currentUser,
    store_id,
    products,
    totalAmount,
    appointmentDay,
    appointmentTime,
    comment,
    status
  })

  newOrder.save()
    .then(order => {
      res.status(200).json(order);
      console.log("ORDER SAVED");
      console.log(order);
    })
    .catch(err => {
      res.status(500).json('Order creation failed')
      console.log(err);
    });

})




module.exports = ordersRoute