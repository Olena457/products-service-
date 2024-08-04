import { Router } from 'express';
import {getAllProductsController, getProductByIdController } from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/products', ctrlWrapper(getAllProductsController));
router.get('/products/:productId', ctrlWrapper(getProductByIdController));

export default router;
