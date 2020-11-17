const express = require('express');
const authRoutes = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../models/user-model');

//  ######  ####  ######   ##    ##         ##     ## ########  
// ##    ##  ##  ##    ##  ###   ##         ##     ## ##     ## 
// ##        ##  ##        ####  ##         ##     ## ##     ## 
//  ######   ##  ##   #### ## ## ## ####### ##     ## ########  
//       ##  ##  ##    ##  ##  ####         ##     ## ##        
// ##    ##  ##  ##    ##  ##   ###         ##     ## ##        
//  ######  ####  ######   ##    ##          #######  ##        

authRoutes.post('/signup', (req, res, next) => {

  const { email, password, type, fullName, address, zip, geoloc, phone, description, openingHours, picture, businessType } = req.body;
  // const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ message: "please provide an email address" })
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(400).json({ message: "Password must have at least 6 characters, one cap letter AND one digit" })
    return;
  }

if (!type) {
  res.status(400).json({message: "Please check code, type of user is MANDATORY"})
  return;
}

if (type === 'store') {
  // ATTENTION: PICTURE IS NOT IMPLEMENTED YET
  if(!fullName || !address || !zip || !phone || !description || !openingHours || !siret)


}
  // res.json({ message: "link ok" })


  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User ({
    email,
    password: hashPass,
    type,
    fullName,
    address,
    zip,
    geoloc,
    phone,
    description,
    openingHours,
    picture,
    businessType
  });

  newUser.save().then().catch()

})

module.exports = authRoutes;