const Request = require('../models/requests');
const BadRequestError = require('../errors/badrequest');

const getRequests = (req, res, next) => {
    Request.find()
        .then((request) => {
            res.send({ request });
        })
        .catch((err) => {
            next(err);
        });
};

const createRequest = (req, res, next) => {
    const {
        description, company, contragent, amount,
    } = req.body;
    Request.create(
        {
            description, company, contragent, amount,
        }
    )
        .then((newRequest) => {
            res.status(201).send(newRequest);
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new BadRequestError('Переданы некорректные данные при создании заявки'));
                return;
            }
            next(err);
        });
}

module.exports = {
    getRequests, createRequest,
};
