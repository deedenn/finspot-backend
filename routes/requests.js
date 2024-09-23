const express = require('express');
const { getRequests, getRequestsByOrgID, getOwnerRequest, getRequestsApproved, getRequestByID, createRequest, checkRequest, editRequest, getUserRequests, cancelRequest } = require('../controllers/requests');

const requestsRouter = express.Router();

requestsRouter.get('/', getOwnerRequest);
requestsRouter.get('/org/:id', getRequestsByOrgID)
requestsRouter.get('/:id', getRequestByID);
requestsRouter.get('/all', getRequests);
requestsRouter.post('/add', createRequest);
requestsRouter.patch('/check', checkRequest);
requestsRouter.patch('/edit', editRequest);
requestsRouter.patch('/cancel', cancelRequest);
requestsRouter.get('/approve/:id', getUserRequests);
requestsRouter.get('/approved/:id', getRequestsApproved)


module.exports = requestsRouter;