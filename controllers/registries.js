const Registry = require('../models/registries');
const BadRequestError = require('../errors/badrequest');


// список всех реестров
const getRegistries = (req, res, next) => {
  Registry.find()
    .then((registry) => {
      res.send({ registry });
    })
    .catch((err) => {
      next(err);
    });
};

// список всех реестров, которые доступны для просмотра пользователю
const getOwnerRegistry = (req, res, next) => {
  console.log(req.user._id);
  Registry.find({ owner: req.user._id })
    .populate(['owner'])
    .then((registry) => {
      res.send(registry);
    })
    .catch((err) => {
      next(err);
    });
};

// создание реестра
const createRegistry = (req, res, next) => {
  const { _id } = req.user;
  const {
    organization, requests,
  } = req.body;
  Registry.create(
    {
      organization, requests, owner: _id, status: "Согласование ФД",
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

// изменение статуса реестров



module.exports = {
  getRegistries, getOwnerRegistry, createRegistry,
};