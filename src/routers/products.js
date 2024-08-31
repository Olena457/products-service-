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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getAllProductsController));
router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));
router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);
router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));
router.patch(
  '/:productId',
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);
export default router;
