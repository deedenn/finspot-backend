const express = require('express');
const { getUsers, createUser } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);

module.exports = usersRouter;