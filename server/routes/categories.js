const express = require('express');
const categoryController = require('../controllers/Category.controller');
const router = express.Router();

router.get('/', categoryController.get);
router.get('/:categoryID', categoryController.getCategoryId);
router.post('/create', categoryController.create);
router.put('/change', categoryController.change);
router.delete('/delete', categoryController.delete);

module.exports = router;
