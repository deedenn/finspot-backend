const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;
const BadRequestError = require('../errors/badrequest');
const NotFoundError = require('../errors/notfound');
const UnauthorizedError = require('../errors/unautorized');
const ConflictError = require('../errors/conflict');


// получение списка всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

// получение данных о пользователе
const getInfoUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователя c таким ID не существует'));
        return;
      }
      next(err);
    });
};

// создание нового пользователя
const createUser = (req, res, next) => {
  const {
    name, fullname, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, fullname, email, password: hash,
    }))
    .then((newUser) => {
      res.status(200).send({
        email: newUser.email,
        name: newUser.name,
        fullname: newUser.fullname,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError('Пользователь c таким email уже зарегистрирован'),
        );
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
};

// логин
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неправильная почта или пароль'));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
            {
              expiresIn: '7d',
            },
          );
          return res.send({ token });
        });
    })
    .catch(next);
};

// редактирование пароля пользователя


// удаление пользователя из доступа к организации


module.exports = {
  getUsers, getInfoUser, createUser, login,
};
