const Request = require('../models/requests');
const BadRequestError = require('../errors/badrequest');

// получить список всех заявок
const getRequests = (req, res, next) => {
  Request.find()
    .then((request) => {
      res.send({ request });
    })
    .catch((err) => {
      next(err);
    });
};

// получить список всех заявок пользователя
const getOwnerRequest = (req, res, next) => {
  Request.find({ owner: req.user._id })
    .populate(['owner'])
    .then((request) => {
      res.send(request);
    })
    .catch((err) => {
      next(err);
    });
};

// создание новой заявки
// Нужно добавить права на видимость заявки и редактирование
const createRequest = (req, res, next) => {
  const { _id } = req.user;
  const {
    requestId, description, organization, contragent, amount,
  } = req.body;
  Request.create(
    {
      requestId, description, organization, contragent, amount, owner: _id, status: "Согласование ФД",
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

// редактирование заявки
// как поменять data? Не меняются значения

const editRequest = (req, res, next) => {
  const id = req.body._id;
  const { values } = req.body;
  console.log(values);

  Request.findByIdAndUpdate(id, {values},
    {
      new: true,
      runValidators: true,
    },
  )
    .then((request) => {
      if (!request) {
        throw new NotFoundError('Заявка с указанным ID не найдена');
      } else {
         res.send({ data: request });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

// изменение статуса заявки после действий пользователя

const checkRequest = (req, res, next) => {
  const id = req.body._id

  Request.findByIdAndUpdate(id, {status: req.body.status},
    {
      new: true,
      runValidators: true,
    },
  )
    .then((request) => {
      if (!request) {
        throw new NotFoundError('Заявка с указанным ID не найдена');
      } else {
         res.send({ data: request });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

// сделать заявку неактивной, статус "отменена"


module.exports = {
  getRequests, getOwnerRequest, createRequest, checkRequest, editRequest,
};
