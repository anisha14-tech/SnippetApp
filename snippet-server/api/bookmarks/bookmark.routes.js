const router = require('express').Router();

const controller = require('./bookmark.controller');

const middleware = require('../middleware/authorization');

router.post('/', middleware.verifyToken, controller.createBookmark);

router.delete('/:id', middleware.verifyToken, controller.deleteBookmark);

module.exports = router;
