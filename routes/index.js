const router = require('express').Router();
const usersRouter = require('./users');
const requestsRouter = require('./requests');
const registriesRouter = require('./registries');
const signRouter = require('./sign');
const organizationsRouter = require('./organizations');
const { auth } = require('../middlewares/auth');

router.use(signRouter);

router.use('/users', auth, usersRouter);
router.use('/requests', auth, requestsRouter);
router.use('/registries', auth, registriesRouter);
router.use('/organizations', organizationsRouter);

module.exports = router;