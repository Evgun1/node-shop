const express = require('express');
const { route } = require('./categories');
const CartController = require('../controllers/Cart.controller');

const cartRouter = express.Router();

cartRouter.get('/', CartController.getAll);
cartRouter.get('/:userToken', CartController.getUserCart);
cartRouter.post('/add', CartController.saveCart); 

module.exports = cartRouter;
