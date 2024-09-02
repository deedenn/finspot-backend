const { auth } = require('../middlewares/auth')
const express = require('express');
const { getOrganizations, getOrganizationByID, createOrganization, updateApproveList } = require('../controllers/organizations');
const organizations = require('../models/organizations');

const organizationsRouter = express.Router();

organizationsRouter.get('/', getOrganizations);
organizationsRouter.get('/:id', getOrganizationByID);
organizationsRouter.post('/add', auth, createOrganization);
organizationsRouter.patch('/updateApproveList', auth, updateApproveList);

module.exports = organizationsRouter;