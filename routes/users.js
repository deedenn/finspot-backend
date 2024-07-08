const express = require('express');
const { celebrate } = require('celebrate');
const { getInfoUser } = require('../controllers/users');
const {
  getUserByIdValidation, updateProfileValidation,
} = require('../utils/validation');

const usersRouter = express.Router();
const {
  getUsers, getUser, updateUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoUser);
usersRouter.get('/:userId', celebrate(getUserByIdValidation), getUser);
usersRouter.patch('/me', celebrate(updateProfileValidation), updateUser);

module.exports = usersRouter;
