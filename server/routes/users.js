const { Router } = require('express');
const UserController = require('../controllers/User.controller');

const router = new Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/auth', UserController.check);

module.exports = router;
