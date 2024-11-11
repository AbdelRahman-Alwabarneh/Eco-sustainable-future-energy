// src/app/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, default: 0 },
  ecoBenefits: { type: String },
});

// Check if the model already exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;