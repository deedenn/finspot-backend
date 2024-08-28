const express = require('express');
const { getRequests, getOwnerRequest, createRequest, checkRequest, editRequest, getUserRequests } = require('../controllers/requests');

const requestsRouter = express.Router();

requestsRouter.get('/', getOwnerRequest);
requestsRouter.get('/all', getRequests);
requestsRouter.post('/add', createRequest);
requestsRouter.post('/check', checkRequest);
requestsRouter.patch('/edit', editRequest);
requestsRouter.get('/approve/:id', getUserRequests);

module.exports = requestsRouter;