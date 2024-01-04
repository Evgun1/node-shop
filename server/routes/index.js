const express = require('express');
const categoryRouter = require('./categories');
const supplierRouter = require('./suppliers');
const productsRouter = require('./products');
const cartRouter = require('./cart');

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/suppliers', supplierRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);

module.exports = router;
