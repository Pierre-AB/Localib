const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const geocoder = require('../utils/geocoder')

const userSchema = new Schema({
  email: String,
  password: String,
  type: {
    type: String,
    enum: ['store', 'consumer',]
  },
  fullName: String,
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
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
    enum: ["fromagerie", "fleuriste", "legume", "Supermarché", "vinothèque"]
  },
},
  { timestamps: true }
);

// Geocode & create location field

userSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // // Do not save address in DB
  // this.address = undefined;
  // next();
});



const User = mongoose.model('User', userSchema);
module.exports = User;