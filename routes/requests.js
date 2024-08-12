const express = require('express');
const { getRequests, createRequest } = require('../controllers/requests');

const requestsRouter = express.Router();

requestsRouter.get('/', getRequests);
requestsRouter.post('/add', createRequest);

module.exports = requestsRouter;