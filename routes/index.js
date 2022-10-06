const router = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  validateLogin,
  validateSignup,
} = require('../middlewares/validationJoi');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateLogin, login);
router.post('/signup', validateSignup, createUser);

router.get('/signout', logout);

router.use(auth, usersRoutes);
router.use(auth, moviesRoutes);

module.exports = router;
