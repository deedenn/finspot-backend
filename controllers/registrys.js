const Registry = require('../models/registrys');
const BadRequestError = require('../errors/badrequest');

const getRegistrys = (req, res, next) => {
    Registry.find()
        .then((registry) => {
            res.send({ registry });
        })
        .catch((err) => {
            next(err);
        });
};

const createRegistry = (req, res, next) => {
  const {
      company, requests, amount,
  } = req.body;
  Registry.create(
      {
        company, requests, amount,
      }
  )
      .then((newRegistry) => {
          res.status(201).send(newRegistry);
      })
      .catch((err) => {
          if (err.name === 'ValidationError') {
              next(new BadRequestError('Переданы некорректные данные при создании реестра'));
              return;
          }
          next(err);
      });
}

module.exports = {
  getRegistrys, createRegistry,
};
