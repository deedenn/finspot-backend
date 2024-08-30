const Request = require('../models/requests');
const BadRequestError = require('../errors/badrequest');
const Organization = require("../models/organizations");
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

// получить заявку по ID
const getRequestByID = (req, res, next) => {
const {id} = req.params;

  Request.findById({ _id: id })
    .then((request) => {
      if (!request) {
        throw new NotFoundError('Заявка не найдена');
      } else {
        res.send(request);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Заявки c таким ID не существует'));
        return;
      }
      next(err);
    });
};

// получить список всех заявок, где пользователь имеет права чтение
// не работает!!!
const getUserRequests = async (req, res, next) => {
  const { id } = req.params;

  const organizations = await Organization.find({
    approveUsers: { $elemMatch: { id: id } }
  })
  const requests = await organizations.map(async (item) => await Request.find({ organization: item }))
  // const requests = await Request.find({ organization: organizations[1]._id })
  res.send({ organizations, requests })
}

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

const editRequest = (req, res, next) => {
  const id = req.body._id;
  const data = req.body;
  console.log(data);

  if (data.status !== "Черновик") res.status(400).send('Заявку с таким статусом невозможно изменить');

  Request.findByIdAndUpdate(id, { ...data },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((request) => {
      if (!request) {
        throw new NotFoundError('Заявка с указанным ID не найдена');
      } else {
        res.send(request);
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

  Request.findByIdAndUpdate(id, { status: req.body.status },
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
  getRequests, getOwnerRequest, getRequestByID, createRequest, checkRequest, editRequest, getUserRequests,
};
