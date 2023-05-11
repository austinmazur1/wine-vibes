const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productDetailsSchema = new Schema({
  product_vibe: { type: Object, required: true },
  product_name: { type: String, required: true },
  product_image: { type: String, required: true},
  product_price: { type: Number, required: true },
  vintage: { type: String, required: true },
  grape_variety: { type: String, required: true },
  bottle_size: { type: String, required: true },
  closure: { type: String, required: true },
  quality_level: { type: String, required: true },
  origin: { type: String, required: true },
  alcohol_content: { type: String, required: true },
  residual_sugar: { type: String, required: true },
  acidity: { type: String, required: true },
  recommended_serving_temperature: { type: String, required: true },
  fermentation: { type: String, required: true },
  maturation: { type: String, required: true },
  contains_sulfites: { type: Boolean, required: true },
  description: { type: String, required: true },
  pairs_with: { type: [String], required: true },
  producer: {
    name: { type: String, required: true },
    location: { type: String, required: true }
  }
});

const productDetails = mongoose.model('product details', productDetailsSchema);

module.exports = productDetails;
