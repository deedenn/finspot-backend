const express = require('express');
const { getRegistries, getRegistryByID, createRegistry } = require('../controllers/registries');

const registriesRouter = express.Router();

registriesRouter.get('/', getRegistries);
registriesRouter.get('/:id', getRegistryByID);
registriesRouter.post('/add', createRegistry);

module.exports = registriesRouter;