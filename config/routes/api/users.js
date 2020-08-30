const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('/Users/Peter/Desktop/devconnector/models/User');
// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'please enter 6 or more chars').isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //400 is a bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await user.findOne({ email });
      //see if user exists
      if (user) {
        res.status(400).json({
          errors: [{ msg: 'User already exists' }],
        });
      }
      //get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new user({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Return jsonwebtoken

      res.send('User registered');

      console.log(req.body);
      res.send('user route');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
