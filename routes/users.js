const express = require('express');
const { getUsers, getInfoUser, getInfoUserByID, getInfoUserByEmail, activeUser } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoUser);
usersRouter.get('/:id', getInfoUserByID);
usersRouter.post('/email/check', getInfoUserByEmail);
usersRouter.post('/active', activeUser);

module.exports = usersRouter;