const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  sizes: { type: String },
  origin: { type: String },
  status: { type: String, default: 'Available' },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
