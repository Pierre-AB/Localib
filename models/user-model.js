const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  type: {
    type: String,
    enum: ['store', 'consumer',]
  },
  fullName: String,
  address: String,
  zip: String,
  geoloc: [Number], // maybe create an object {lat: 12, long: 34}
  phone: String,
  description: String,
  openingHours: Array,
  picture: String,
  businessType: {
    type: String,
    enum: ["fromagerie", "fleuriste", "legume"]
  },
},
  { timestamps: true }
)

const User = mongoose.model('User', userSchema);
module.exports = User;