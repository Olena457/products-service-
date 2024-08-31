import { Router } from 'express';
import productsRouter from './products.js';
import authRouter from './users.js';
const router = Router();
router.use('/products', productsRouter);
router.use('/auth', authRouter);
export default router;
