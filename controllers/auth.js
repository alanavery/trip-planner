// Import modules
let router = require('express').Router();
let db = require('../models');
let passport = require('../config/pp-config');

// Route: POST /auth/signup
router.post('/signup', async (req, res) => {
  try {
    let user = await db.user.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }
    });
    if (user[1]) {
      passport.authenticate('local', {
        successRedirect: '/trips',
        successFlash: 'Account created.',
        failureRedirect: '/'
      })(req, res);
    } else {
      req.flash('error', 'Invalid name, email and/or password.');
      res.redirect('/');
    }
  } catch (err) {
    req.flash('error', `An error occurred: ${err.message}`);
    res.redirect('/');
  }
});

// Route: POST /auth/login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/trips',
    successFlash: 'You are logged in.',
    failureRedirect: '/',
    failureFlash: 'Invalid email and/or password.'
  })
);

// Route: GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

// Export module
module.exports = router;
