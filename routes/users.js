const express = require('express');
const { getUsers, getInfoUser, getInfoUserByID } = require('../controllers/users');
const { auth } = require('../middlewares/auth')

const usersRouter = express.Router();

usersRouter.get('/', auth, getUsers);
usersRouter.get('/me', auth, getInfoUser);
usersRouter.get('/:id', auth, getInfoUserByID);

module.exports = usersRouter;