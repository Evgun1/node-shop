const express = require('express');
const { route } = require('./categories');
const CartController = require('../controllers/Cart.controller');

const router = express.Router();

router.get('/cart', CartController.get);
router.post('/cart-add', CartController.post);
