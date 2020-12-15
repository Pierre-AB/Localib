const express = require('express');
const authRoutes = express.Router();
const fileUploader = require('../configs/cloudinary.config');


const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const Consumer = require('../models/consumer-model');

//  ######  ########  #######  ########  ########     ######  ####  ######   ##    ## ##     ## ########  
// ##    ##    ##    ##     ## ##     ## ##          ##    ##  ##  ##    ##  ###   ## ##     ## ##     ## 
// ##          ##    ##     ## ##     ## ##          ##        ##  ##        ####  ## ##     ## ##     ## 
//  ######     ##    ##     ## ########  ######       ######   ##  ##   #### ## ## ## ##     ## ########  
//       ##    ##    ##     ## ##   ##   ##                ##  ##  ##    ##  ##  #### ##     ## ##        
// ##    ##    ##    ##     ## ##    ##  ##          ##    ##  ##  ##    ##  ##   ### ##     ## ##        
//  ######     ##     #######  ##     ## ########     ######  ####  ######   ##    ##  #######  ##        

authRoutes.post('/storeSignup', fileUploader.single('image'), (req, res, next) => {

  const { email, password, type, fullName, address, zip, geoloc, phone, description, openingHours, picture, siret, numVAT, businessType } = req.body;

  if (!email) {
    console.log("bloque a cause de lemail")
    res.status(400).json({ message: "please provide an email address" })
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    console.log("bloque a cause du password")
    res.status(400).json({ message: "Password must have at least 6 characters, one cap letter AND one digit" })
    return;
  }

  if (!type) {
    console.log("bloque a cause du type")
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
      })
      .catch(err => {
        res.status(500).json({ message: "Siret check went bad" })
      })
    // Si c'est un consumer.
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.status(400).json({ message: 'Email already taken' });
          return;
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Consumer check went wrong' })
      })
  }


  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  //LOCATION DATA IS CREATED IN USER MODEL THROUGH GEOCODER.

  console.log("ookkkkk")

  const newUser = new User({
    email,
    password: hashPass,
    type,
    fullName,
    address,
    zip,
    phone,
    description,
    openingHours,
    // picture: req.file && req.file.path || 'https://res.cloudinary.com/dbsnbga7z/image/upload/v1602449425/Ironring/Profile_cssetb.png',
    siret,
    numVAT,
    businessType
  });

  newUser.save()
    .then(newUser => {
      console.log("signup - req.session.currentUser", req.session.currentUser)
      req.session.currentUser = newUser;
      res.status(200).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: 'Saving newUser to database went wrong.' })
    })


  // res.json({ message: "link ok" })


})

//  ######   #######  ##    ##  ######  ##     ## ##     ## ######## ########      ######  ####  ######   ##    ## ##     ## ########  
// ##    ## ##     ## ###   ## ##    ## ##     ## ###   ### ##       ##     ##    ##    ##  ##  ##    ##  ###   ## ##     ## ##     ## 
// ##       ##     ## ####  ## ##       ##     ## #### #### ##       ##     ##    ##        ##  ##        ####  ## ##     ## ##     ## 
// ##       ##     ## ## ## ##  ######  ##     ## ## ### ## ######   ########      ######   ##  ##   #### ## ## ## ##     ## ########  
// ##       ##     ## ##  ####       ## ##     ## ##     ## ##       ##   ##            ##  ##  ##    ##  ##  #### ##     ## ##        
// ##    ## ##     ## ##   ### ##    ## ##     ## ##     ## ##       ##    ##     ##    ##  ##  ##    ##  ##   ### ##     ## ##        
//  ######   #######  ##    ##  ######   #######  ##     ## ######## ##     ##     ######  ####  ######   ##    ##  #######  ##        

authRoutes.post('/consumerSignup', (req, res, next) => {

  const { email, password, type } = req.body;

  console.log(email);
  console.log(password);
  console.log(type);



  if (!email) {
    console.log("bloque a cause de lemail")
    res.status(400).json({ message: "please provide an email address" })
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    console.log("bloque a cause du password")
    res.status(400).json({ message: "Password must have at least 6 characters, one cap letter AND one digit" })
    return;
  }

  if (!type) {
    console.log("bloque a cause du type")
    res.status(400).json({ message: "Please check code, type of user is MANDATORY" })
    return;
  }

  Consumer.findOne({ email })
    .then(consumer => {
      if (consumer) {
        console.log(consumer)
        res.status(400).json({ message: 'Email already taken' });
        return;
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Consumer check went wrong' })
    })



  const salt = bcrypt.genSaltSync(10);
  const hashPassCons = bcrypt.hashSync(password, salt);

  const newConsumer = new Consumer({
    email,
    password: hashPassCons,
    type
  })

  newConsumer.save()
    .then(newConsumer => {
      req.session.currentUser = newConsumer;
      console.log("signup - req.session.currentUser", req.session.currentUser)
      res.status(200).json(newConsumer);
    })
    .catch(err => {
      res.status(500).json({ message: 'Saving newConsumer to database went wrong.' })
    })

})




// ##        #######   ######   #### ##    ## 
// ##       ##     ## ##    ##   ##  ###   ## 
// ##       ##     ## ##         ##  ####  ## 
// ##       ##     ## ##   ####  ##  ## ## ## 
// ##       ##     ## ##    ##   ##  ##  #### 
// ##       ##     ## ##    ##   ##  ##   ### 
// ########  #######   ######   #### ##    ## 


authRoutes.post('/login', (req, res, next) => {
  const { email, password } = req.body
  console.log("Email=", email);

  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(500).json({ message: 'Not registered user' })
      return;
    }


    if (bcrypt.compareSync(password, user.password) !== true) {
      res.status(500).json({ message: 'wrong credentials' });
      return;
    } else {
      req.session.currentUser = user;
      res.json(user)
    }
  }).catch(next)


})

// ##        #######   ######    #######  ##     ## ######## 
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ##       ##     ## ##        ##     ## ##     ##    ##    
// ##       ##     ## ##   #### ##     ## ##     ##    ##    
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ##       ##     ## ##    ##  ##     ## ##     ##    ##    
// ########  #######   ######    #######   #######     ##    


authRoutes.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' })
})


// ##        #######   ######    ######   ######## ########  #### ##    ## 
// ##       ##     ## ##    ##  ##    ##  ##       ##     ##  ##  ###   ## 
// ##       ##     ## ##        ##        ##       ##     ##  ##  ####  ## 
// ##       ##     ## ##   #### ##   #### ######   ##     ##  ##  ## ## ## 
// ##       ##     ## ##    ##  ##    ##  ##       ##     ##  ##  ##  #### 
// ##       ##     ## ##    ##  ##    ##  ##       ##     ##  ##  ##   ### 
// ########  #######   ######    ######   ######## ########  #### ##    ## 

authRoutes.get('/loggedIn', (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
    return;
  }
  res.status(403).json({ message: 'Please log in' });
})





module.exports = authRoutes;