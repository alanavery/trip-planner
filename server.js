// Import modules
let express = require('express');
let layouts = require('express-ejs-layouts');
let session = require('express-session');
let morgan = require('morgan');
let passport = require('./config/pp-config');
let flash = require('connect-flash');
let isLoggedIn = require('./middleware/is-logged-in');
let methodOverride = require('method-override');
require('dotenv').config();

// Initialize Google api
// let {Client} = require('@googlemaps/google-maps-services-js')

// Import API modules
let axios = require('axios');

// Environment variables
let SESSION_SECRET = process.env.SESSION_SECRET;

// Initialize app
let app = express();

// Middleware ——————————————————————————————
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Set up session module
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Add connect-flash
app.use(flash());

// Custom middleware
app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/trips', isLoggedIn, require('./controllers/trips'));
// ——————————————————————————————

// Home route: GET /
app.get('/', (req, res) => {
  res.render('index');
});

// Test route: POST /
app.post('/', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.body.term}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${process.env.GOOGLE_MAPS_API_KEY}`).then(jsonData => {
    console.log(jsonData.data);
    res.redirect('/');
  });
});

// Instruct app to listen for requests
let PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => {
  console.log(`The server is up and running on PORT ${PORT}.`);
});

// Export server for testing
module.exports = server;