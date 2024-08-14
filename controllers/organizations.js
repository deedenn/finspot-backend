const Organization = require("../models/organizations");

// список всех организаций
const getOrganizations = (req, res, next) => {
  Organization.find({})
    .then((organizations) => {
      res.send({ organizations });
    })
    .catch((err) => {
      next(err);
    });
};

// создание новой организиции
const createOrganization = (req, res, next) => {
  console.log(req.body.users);
  const {
    inn, name, users,
  } = req.body;
  Organization.create(
    {
      inn, name, users,
    }
  )
    .then((newOrganization) => {
      res.status(201).send(newOrganization);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании организации'));
        return;
      }
      next(err);
    });
}

// Изменение маршрута согласования

// Продление срока действия подписки

// Прекращение доступа при неоплате подписки


module.exports = {
  getOrganizations, createOrganization,
};