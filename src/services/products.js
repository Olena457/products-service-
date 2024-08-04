import { Product } from '../db/models/product.js';

export async function getAllProductsService() {
  return await Product.find();
}
