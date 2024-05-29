const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login, getUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

router.get('/', 
 auth,
 getUser);

module.exports = router;
