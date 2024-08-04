import { getAllProductsService } from '../services/products.js';

export const getAllProducts = async (req, res) => {
  const products = await getAllProductsService();
  res.send({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};
