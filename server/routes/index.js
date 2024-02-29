const express = require('express');
const categoryRouter = require('./categories');
const supplierRouter = require('./suppliers');
const productsRouter = require('./products');
const cartRouter = require('./cart');
const userRouter = require('./users');

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/suppliers', supplierRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/user', userRouter);

module.exports = router;
