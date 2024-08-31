import { Product } from '../db/models/product.js';

export async function getAllProductsService(filter = {}, userId) {
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

export async function getProductByIdService(productId, userId) {
  return await Product.findOne({ _id: productId, userId });
}

export function createProduct(payload) {
  return Product.create(payload);
}

export function updateProduct(productId, userId, updateData) {
  return Product.findByIdAndUpdate(productId, userId, updateData, {
    new: true,
    runValidators: true,
  });
}

export function deleteProduct(productId, userId) {
  return Product.findByIdAndDelete(productId, userId);
}
