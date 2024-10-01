const express = require('express');
const { celebrate } = require('celebrate');
const { organizationValidation } = require('../utils/validation');
const { getOrganizations, getOrganizationByID, getUsersByOrg, patchUsersByOrg, createOrganization, updateApproveList } = require('../controllers/organizations');
const organizations = require('../models/organizations');

const organizationsRouter = express.Router();

organizationsRouter.get('/', getOrganizations);
organizationsRouter.get('/:id', getOrganizationByID);
organizationsRouter.get('/users/:id', getUsersByOrg);
organizationsRouter.post('/add', celebrate(organizationValidation), createOrganization);
organizationsRouter.patch('/updateApproveList', updateApproveList);
organizationsRouter.patch('/addusers', patchUsersByOrg);

module.exports = organizationsRouter;