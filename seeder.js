const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Orders = require('./models/order-model');
const Products = require('./models/product-model');
const User = require('./models/user-model');

// Connect to DB
mongoose
.connect(process.env.MONGODB_URI, {  
  useNewUrlParser: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// Read JSON files
const orders = JSON.parse(
  fs.readFileSync(`${__dirname}/seed-data/orders.json`, 'utf-8')
);

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/seed-data/products.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/seed-data/users.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
  try {
    await Orders.create(orders);
    await Products.create(products);
    await User.create(users);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Orders.deleteMany();
    await Products.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};


if (process.argv[2] === '-i') { // Node seeder -i pour importer data
  importData();
} else if (process.argv[2] === '-d') { // Node seeder -i pour supprimer data
  deleteData();
}
