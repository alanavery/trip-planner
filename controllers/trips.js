// Import modules
let router = require('express').Router();
let db = require('../models');

// Route: GET /trips
router.get('/', async (req, res) => {
  try {
    let user = await db.user.findOne({ where: { email: req.user.email } });
    let trips = await user.getTrips({
      order: [
        ['startDate', 'ASC']
      ]
    });
    res.render('trips/trips', { user, trips });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
});

// Route: POST /trips
router.post('/', async (req, res) => {
  try {
    let user = await db.user.findOne({
      where: { email: req.user.email }
    });
    let trip = await user.createTrip({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    });
    req.flash('success', 'Trip created.');
    res.redirect('/trips');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
});

// Export module
module.exports = router;