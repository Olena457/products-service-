import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/prodacts.js';
import { isValidId } from '../middlewares/isValisId.js';

const router = Router();

router.get('/products', ctrlWrapper(getAllProductsController));
router.get(
  '/products/:productId',
  isValidId,
  ctrlWrapper(getProductByIdController),
);
router.post(
  '/products',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);
router.delete(
  'products/:productId',
  isValidId,
  ctrlWrapper(deleteProductController),
);
router.patch(
  '/products/:productId',
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);
export default router;
