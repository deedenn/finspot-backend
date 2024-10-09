const Registry = require('../models/registries');
const Request = require('../models/requests');
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

// получить список всех заявок по ID организации
const getRegistriesByOrgID = (req, res, next) => {
  Registry.find({ organization: req.params.id })
    .then((registry) => {
      res.send({ registry });
    })
    .catch((err) => {
      next(err);
    });
};

// получить реестр по ID
const getRegistryByID = (req, res, next) => {
  const { id } = req.params;

  Registry.findById({ _id: id })
    .then((registry) => {
      if (!registry) {
        throw new NotFoundError('Реестр не найден');
      } else {
        res.send(registry);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Реестр c таким ID не существует'));
        return;
      }
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
const createRegistry = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const {
      organization, requests, amount
    } = req.body;
    const registries = await Registry.find({ organization })
    const registryID = `${organization.slice(organization.length - 4)}-${registries.length}`
    const newRegistry = await Registry.create(
      {
        organization, registryID, requests, amount, owner: _id, status: "Согласование ФД",
      }
    )
    //     .then((newRegistry) => {
    res.status(201).send(newRegistry);
    // Request.findByIdAndUpdate({ _id: id })
    //   .then((registry) => {
    //     if (!registry) {
    //       throw new NotFoundError('Заявка не найдена');
    //     } else {
    //       res.send(registry);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.name === 'CastError') {
    //       next(new BadRequestError('Заявки c таким ID не существует'));
    //       return;
    //     }
    //     next(err);
    //   });
    //      })
  }
  catch (err) { next(err) }

  //       .catch ((err) => {
  //   if (err.name === 'ValidationError') {
  //     next(new BadRequestError('Переданы некорректные данные при создании реестра'));
  //     return;
  //   }
  //   next(err);
  // });


  //   }
}

// изменение статуса реестров



module.exports = {
  getRegistries, getRegistriesByOrgID, getRegistryByID, getOwnerRegistry, createRegistry,
};
