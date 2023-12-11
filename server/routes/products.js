const express = require('express');
const productController = require('../controllers/Products.controller');
const router = express.Router();

router.get('/', productController.getAll);

router.post('/create', productController.create);

router.put('/change', productController.change);

router.delete('/delete', productController.delete);

module.exports = router;
