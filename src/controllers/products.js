import {
  createProduct,
  deleteProduct,
  getAllProductsService,
  getProductByIdService,
  updateProduct,
} from '../services/products.js';
import createHttpError from 'http-errors';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllProductsController = async (req, res) => {
  const filter = parseFilterParams(req.query);
  const products = await getAllProductsService({
    filter,
    userId: req.user._id,
  });
  res.send({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const product = await getProductByIdService(productId, userId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  if (product.userId.toString() !== userId.toString()) {
    return next(createHttpError(403, 'Access denied'));
  }
  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};
export const createProductController = async (req, res) => {
  const userId = req.user._id;
  const payload = { ...req.body, userId };
  const product = await createProduct(payload, userId);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const patchProductController = async (req, res, next) => {
  const userId = req.user._id;

  const { productId } = req.params;
  const result = await updateProduct(productId, req.body, userId);
  if (!result) {
    next(createHttpError(404, 'Product not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result.product,
  });
};
export const updateProductController = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const updatedProduct = await updateProduct(
    { _id: productId, userId },
    req.body,
  );

  if (updatedProduct === null) {
    throw createHttpError.NotFound('Product not found');
  }

  res.send({
    status: 200,
    message: 'Successfully patched a product!',
    data: updatedProduct,
  });
};

export const deleteProductController = async (req, res, next) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const deletedProduct = await deleteProduct({ _id: productId, userId });

  if (deletedProduct === null) {
    return next(createHttpError.NotFound('Product not found'));
  }

  res.status(204).send();
};
