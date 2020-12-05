const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderModel = new Schema({
  client_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  store_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  products: [String],
  totalAmount: Number,
  appointmentDay: Date,
  appointmentTime: "",
  comment: [String],
  status: {
    type: String,
    enum: ["confirmed", "ready", "picked-up"]
  }
})

const Order = mongoose.model('Order', orderModel);
module.exports = Order;