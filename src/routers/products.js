import { Router } from 'express';
import { getAllProducts } from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/products', ctrlWrapper(getAllProducts));

export default router;
