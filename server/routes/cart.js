const express = require('express');
const { route } = require('./categories');
const CartController = require('../controllers/Cart.controller');
const CartValidation = require('../validation/CartValidation');

const cartRouter = express.Router();

cartRouter.get('/', CartController.getAll);
cartRouter.get('/:userToken', CartController.getUserCart);
cartRouter.post('/', CartValidation.saveCart, CartController.saveCart);
cartRouter.put('/', CartValidation.saveCart, CartController.updateCart);
cartRouter.delete('/', CartController.deleteCart);

module.exports = cartRouter;
