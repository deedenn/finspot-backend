const express = require('express');
const { getOrganizations, createOrganization } = require('../controllers/organizations');

const organizationsRouter = express.Router();

organizationsRouter.get('/', getOrganizations);
organizationsRouter.post('/add', createOrganization);

module.exports = organizationsRouter;