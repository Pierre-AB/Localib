const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumerSchema = new Schema({
  email: String,
  password: String,
  type: {
    type: String,
    enum: ['store', 'consumer']
  }
},
  { timestamps: true }
);

const Consumer = mongoose.model('Consumer', consumerSchema);
module.exports = Consumer