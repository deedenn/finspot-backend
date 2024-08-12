const router = require('express').Router();
const usersRouter = require('./users');
const requestsRouter = require('./requests');
const signRouter = require('./sign');
const organizationsRouter = require('./organizations');
const { auth } = require('../middlewares/auth');

router.use(signRouter);

router.use('/users', auth, usersRouter);
router.use('/requests', auth, requestsRouter);
router.use('/organizations', organizationsRouter);

module.exports = router;
