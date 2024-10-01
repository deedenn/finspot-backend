const Request = require('../models/requests');
const BadRequestError = require('../errors/badrequest');
const Organization = require("../models/organizations");
const requests = require('../models/requests');

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

// получить список всех заявок по ID организации
const getRequestsByOrgID = (req, res, next) => {
  Request.find({ organization: req.params.id })
    .then((request) => {
      res.send({ request });
    })
    .catch((err) => {
      next(err);
    });
};

// получить список всех заявок по ID организации и со статусом "Утвержден"
const getRequestsApproved = (req, res, next) => {
  Request.find({ organization: req.params.id, status: "Утверждено" })
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
      next(new Error('Заявки не найдены'));
    });
};

// получить заявку по ID
const getRequestByID = (req, res, next) => {
  const { id } = req.params;

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
const getUserRequests = async (req, res, next) => {
  const { id } = req.params;

  const organizations = await Organization.find({
    approveUsers: { $elemMatch: { id: id } }
  })

  const reqs = await Promise.all(organizations.map(async org => {
    const index = org.approveUsers.findIndex(user => user.id === id)
    const reqs = await Request.find({ organization: org._id, stage: index })
    return { org, reqs }
  }))

  // const requests = await organizations.map(async (item) => await Request.find({ organization: item }))
  // const requests = await Request.find({ organization: organizations[1]._id })
  res.send(reqs)
}

// создание новой заявки
// Нужно добавить права на видимость заявки и редактирование
const createRequest = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const {
      description, organization, contragent, amount, type, statuslog, track,
    } = req.body;
    const requests = await Request.find({ organization })
    const requestId = `${organization.slice(organization.length - 4)}-${requests.length}`
    const newRequest = await Request.create(
      {
        description, requestId, organization, contragent, amount, type, owner: _id, stage: 1, status: "Согласование ФД", statuslog,
        track,
      }
    )
    res.status(201).send(newRequest);
  } catch (err) { next(err) }
}

// редактирование заявки, если статус Черновик. Редактирует только создатель.

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

const checkRequest = async (req, res, next) => {
  try {
    const { _id, status, stageStatus, message, user } = req.body
    const request = await Request.findOne({ _id })
    if (!request) res.status(404).send({ message: 'request is not a found' })
    request.statuslog.push({ stage: request.status, date: Date.now(), user: user, message: message })
    request.status = status
    request.stage = request.stage + stageStatus
    request.save()
    res.status(200).send({ request })
  } catch (err) { next(err) }
}

// отмена заявки
// сделать заявку неактивной, статус "отменена"

const cancelRequest = async (req, res, next) => {
  try {
    const { _id, message, user } = req.body
    const request = await Request.findOne({ _id })
    if (!request) res.status(404).send({ message: 'request is not a found' })
    request.statuslog.push({ stage: request.status, date: Date.now(), user: user, message: message })
    request.status = "Отменено"
    request.stage = -1
    request.save()
    res.status(200).send({ request })
  } catch (err) { next(err) }
}

// Request.findByIdAndUpdate(id, { status: req.body.status,  },
//   {
//     new: true,
//     runValidators: true,
//   },
// )
//   .then((request) => {
//     if (!request) {
//       throw new NotFoundError('Заявка с указанным ID не найдена');
//     } else {
//       res.send({ data: request });
//     }
//   })
//   .catch((err) => {
//     if (err.name === 'ValidationError') {
//       next(new BadRequestError('Переданы некорректные данные'));
//       return;
//     }
//     next(err);
//   });



module.exports = {
  getRequests, getRequestsByOrgID, getOwnerRequest, getRequestsApproved, getRequestByID, createRequest, checkRequest, cancelRequest, editRequest, getUserRequests,
};
