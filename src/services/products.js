import { Product } from '../db/models/product.js';

export async function getAllProductsService() {
  return await Product.find();
}

export async function getProductByIdService(productId) {
  return await Product.findOne({ _id: productId });
}

export function createProduct(payload) {
  return Product.create(payload);
}

export function updateProduct(productId, updateData) {
  return Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });
}

export function deleteProduct(productId) {
  return Product.findByIdAndDelete(productId);
}
