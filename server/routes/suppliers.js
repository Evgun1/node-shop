const express = require('express');
const suppliersController = require('../controllers/Suppliers.controller');
const router = express.Router();

router.get('/', suppliersController.get);
router.post('/create', suppliersController.create);
router.put('/change', suppliersController.change);
router.delete('/delete', suppliersController.delete);


module.exports = router