const express = require('express');
const { getRegistries, getRegistryByID, getOwnerRegistry, createRegistry } = require('../controllers/registries');

const registriesRouter = express.Router();

registriesRouter.get('/', getOwnerRegistry);
registriesRouter.get('/:id', getRegistryByID);
registriesRouter.get('/all', getRegistries);
registriesRouter.post('/add', createRegistry);

module.exports = registriesRouter;