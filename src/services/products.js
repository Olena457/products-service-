import { Product } from '../db/models/product.js';

export async function getAllProductsService() {
  return await Product.find();
}

export async function getProductByIdService(productId) {
  return await Product.findOne({ _id:productId });
}
