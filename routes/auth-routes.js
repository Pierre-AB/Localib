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

  const { email, password, type, fullName, address, zip, geoloc, phone, description, openingHours, picture, siret, numVAT, businessType } = req.body;
  // const { email, password } = req.body;


  // console.log(req.session.currentUser)

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
    res.status(400).json({ message: "Please check code, type of user is MANDATORY" })
    return;
  }

  //STORE CREATION

  if (type === 'store') {
    // ATTENTION: PICTURE IS NOT IMPLEMENTED YET
    if (!fullName || !address || !zip || !phone || !description || !openingHours || !siret || !numVAT || !businessType) {
      res.status(412).json({ message: "Please fill-in all fields marked with *" });
      return;
    }

    User.findOne({ siret })
      .then(store => {
        if (store) {
          res.status(400).json({ message: "This store is already existing" });
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const newStore = new User({
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
          siret,
          numVAT,
          businessType
        });

        newStore.save()
          .then(newStore => {
            req.session.currentUser = newStore;
            res.status(200).json(newStore);
          })
          .catch(err => {
            res.status(500).json({ message: 'Saving newStore to database went wrong.' })
          })

      })
      .catch(err => {
        res.status(500).json({ message: "Siret check went bad" })
      })

  }
  // res.json({ message: "link ok" })




})

module.exports = authRoutes;