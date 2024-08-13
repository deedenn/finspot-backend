const express = require('express');
const { getRegistries, getOwnerRegistry, createRegistry } = require('../controllers/registries');

const registriesRouter = express.Router();

registriesRouter.get('/', getOwnerRegistry);
registriesRouter.get('/all', getRegistries);
registriesRouter.post('/add', createRegistry);

module.exports = registriesRouter;