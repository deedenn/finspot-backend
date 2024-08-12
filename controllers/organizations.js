const Organisation = require("../models/organizations");

const getOrganizations = (req, res, next) => {
    Organisation.find({})
        .then((organizations) => {
            res.send({ organizations });
        })
        .catch((err) => {
            next(err);
        });
};

const createOrganization = (req, res, next) => {
    const {
        inn, name,
    } = req.body;
    Organisation.create(
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

module.exports = {
    getOrganizations, createOrganization,
};