// Import modules
let router = require('express').Router();

// Route: GET /trips
router.get('/', (req, res) => {
  res.render('trips/trips');
});

// Export module
module.exports = router;