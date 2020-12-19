const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderModel = new Schema({
  client_id: [{ type: Schema.Types.ObjectId, ref: 'Consumer' }],
  store_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  products: [Array],
  storeImg: String,
  storeName: String,
  totalAmount: Number,
  appointmentDay: String,
  appointmentTime: String,
  comment: [String],
  status: {
    type: String,
    enum: ["confirmed", "ready", "picked-up"]
  },
},
  { timestamps: true }
);

const Order = mongoose.model('Order', orderModel);
module.exports = Order;