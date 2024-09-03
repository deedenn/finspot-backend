const { auth } = require('../middlewares/auth')
const express = require('express');
const { getOrganizations, getOrganizationByID, getUsersByOrg, patchUsersByOrg, createOrganization, updateApproveList } = require('../controllers/organizations');
const organizations = require('../models/organizations');

const organizationsRouter = express.Router();

organizationsRouter.get('/', getOrganizations);
organizationsRouter.get('/:id', getOrganizationByID);
organizationsRouter.get('/users/:id', getUsersByOrg);
organizationsRouter.post('/add', auth, createOrganization);
organizationsRouter.patch('/updateApproveList', auth, updateApproveList);
organizationsRouter.patch('/addusers', auth, patchUsersByOrg);

module.exports = organizationsRouter;