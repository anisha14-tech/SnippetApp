const router = require('express').Router();

const controller = require('./user.controller');

const middleware = require('../middleware/authorization');

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

router.get('/:id', controller.getUserById);

router.put('/:id', middleware.verifyToken, controller.updateUser);

module.exports = router;
