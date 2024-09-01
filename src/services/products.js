import { Product } from '../db/models/product.js';

export async function getAllProductsService(filter = {}, userId) {
  const productsQuery = Product.find({ userId });
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

export async function getProductByIdService(productId, userId) {
  return await Product.findOne({ _id: productId, userId });
}

export function createProduct(payload) {
  return Product.create(payload);
}

export function updateProduct(productId, userId) {
  return Product.findByIdAndUpdate({ _id: productId, userId });
}

export function deleteProduct(productId, userId) {
  return Product.findByIdAndDelete({ _id: productId, userId });
}
