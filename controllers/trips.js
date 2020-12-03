// Import modules
let router = require('express').Router();
let db = require('../models');

// Route: GET /trips
router.get('/', async (req, res) => {
  try {
    let user = await db.user.findOne({ where: { email: req.user.email } });
    let trips = await user.getTrips({ order: [['startDate', 'ASC']] });
    res.render('trips/dashboard', { user, trips });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
});

// Route: POST /trips
router.post('/', async (req, res) => {
  try {
    let user = await db.user.findOne({ where: { email: req.user.email } });
    let trip = await user.createTrip({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    });
    req.flash('success', 'Trip created.');
    res.redirect(`/trips/${trip.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
});

// Route: GET /trips/:id
router.get('/:id', async (req, res) => {
  try {
    let trip = await db.trip.findOne({ where: { id: req.params.id } });
    let subcategories = await db.subcategory.findAll();
    let segments = await db.segment.findAll({ where: { tripId: req.params.id } });
    res.render('trips/trip', { trip, subcategories, segments });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
});

// Route: PUT /trips/:id
router.put('/:id', async (req, res) => {
  try {
    await db.trip.update({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }, { where: { id: req.params.id } });
    req.flash('success', 'Trip updated.');
    res.redirect(`/trips/${req.params.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
});

// Route: DELETE /trips/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.trip.destroy({ where: { id: req.params.id } });
    req.flash('success', 'Trip deleted.');
    res.redirect('/trips');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
});

// Route: POST /trips/:id
router.post('/:id', async (req, res) => {
  try {
    let trip = await db.trip.findOne({ where: { id: req.params.id } });
    console.log(trip);
    console.log(req.body);
    await trip.createSegment({
      subcategoryId: req.body.subcategoryId,
      date: req.body.date,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      url: req.body.url,
      notes: req.body.notes,
      booked: req.body.booked
    });
    req.flash('success', 'Segment created.');
    res.redirect(`/trips/${req.params.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect(`/trips/${req.params.id}`);
  }
});

// Export module
module.exports = router;