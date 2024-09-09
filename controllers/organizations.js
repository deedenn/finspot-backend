const Organization = require("../models/organizations");
const User = require("../models/users");

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

// получить организацию по ID
const getOrganizationByID = (req, res, next) => {
  const { id } = req.params;

  Organization.findById({ _id: id })
    .then((organization) => {
      if (!organization) {
        throw new NotFoundError('Организация не найдена');
      } else {
        res.send(organization);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Организации c таким ID не существует'));
        return;
      }
      next(err);
    });
};

// получение списка всех пользователей организации
const getUsersByOrg = (req, res, next) => {
  const { id } = req.params;
  Organization.findOne(id)
    .then((org) => {
      res.send({ org });
    })
    .catch((err) => {
      next(err);
    });
};

// добавление пользователя в организацию
const patchUsersByOrg = (req, res, next) => {
  const { id } = req.params;
  const { users } = req.body;
  Organization.findOneAndUpdate({ id: id }, { users: users })
    .then((org) => {
      res.send({ org });
    })
    .catch((err) => {
      next(err);
    });
};


// создание новой организиции
// добавить проверку на существование организации в БД (ИНН)
const createOrganization = (req, res, next) => {
  const {
    inn, name,
  } = req.body;
  console.log(inn, name);

  const id = req.user._id;
  Organization.create(
    {
      inn, name, supervisor: id,
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
const updateApproveList = async (req, res, next) => {
  const {
    approveUsers, id
  } = req.body;
  const org = await Organization.findByIdAndUpdate(id, { approveUsers })
  console.log(org);
  if (org) {
    res.status(200).send({ message: 'approveUsers is updated', org })
  } else {
    res.status(404).send({ message: "ApproveUser is not update" })
  }

}

// Продление срока действия подписки

// Прекращение доступа при неоплате подписки


module.exports = {
  getOrganizations, getOrganizationByID, getUsersByOrg, patchUsersByOrg, createOrganization, updateApproveList,
};