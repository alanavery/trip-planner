// Import modules
let router = require('express').Router();
let db = require('../models');

// Route: GET /trips
router.get('/', (req, res) => {
  res.render('trips/trips');
});

// Route: POST /trips
router.post('/', (req, res) => {

});

// Export module
module.exports = router;