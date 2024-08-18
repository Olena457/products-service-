import { Product } from '../db/models/product.js';

export async function getAllProductsService(filter = {}) {
  const productsQuery = Product.find();
  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }
  if (filter.maxPrice) {
    productsQuery.where('price').lte(filter.maxPrice);
  }
  if (filter.minPrice) {
    productsQuery.where('price').gte(filter.minPrice);
  }
  const products = await productsQuery.exec();

  return products;
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
