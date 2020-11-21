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
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  phone: String,
  description: String,
  openingHours: Array,
  picture: String,
  siret: String,
  numVAT: String,
  businessType: {
    type: String,
    enum: ["fromagerie", "fleuriste", "legume"]
  },
},
  { timestamps: true }
)

const User = mongoose.model('User', userSchema);
module.exports = User;