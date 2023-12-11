const express = require('express');
const categoryRouter = require('./categories');
const supplierRouter = require('./suppliers');
const productsRouter = require('./products');

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/suppliers', supplierRouter);
router.use('/products', productsRouter);

module.exports = router;
