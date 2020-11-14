const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  store_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: String,
  description: String,
  picture: String,
  price: Number,
  category: {
    type: [String],
    enum: ['fromage', 'fleur', 'legume']
  },
  Tags: [String]
},
{timestamps: true}
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product; 