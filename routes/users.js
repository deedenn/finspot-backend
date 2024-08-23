const express = require('express');
const { getUsers, getInfoUser } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoUser);


module.exports = usersRouter;