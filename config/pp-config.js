// Import modules
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let db = require('../models');

// Serialize user ID to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user ID and find user
passport.deserializeUser(async (id, done) => {
  try {
    let user = await db.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Set up Passport's local strategy for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        let user = await db.user.findOne({ where: { email: email } });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Export module
module.exports = passport;
