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
    const {
        inn, name,
    } = req.body;
    Organization.create(
        {
            inn, name,
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

// Установка маршрута согласования

// Продление срока действия подписки

// Прекращение доступа при неоплате подписки


module.exports = {
    getOrganizations, createOrganization,
};