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
    res.redirect('/trips');
  }
});

// Route: GET /trips/:id
router.get('/:id', async (req, res) => {
  try {
    let trip = await db.trip.findOne({ where: { id: req.params.id } });
    let subcategories = await db.subcategory.findAll();
    let segments = await db.segment.findAll({
      where: { tripId: req.params.id },
      order: [
        ['date', 'ASC'],
        ['time', 'ASC']
      ]
    });
    res.render('trips/trip', { trip, subcategories, segments });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/trips');
  }
});

// Route: PUT /trips/:id
router.put('/:id', async (req, res) => {
  try {
    await db.trip.update(
      {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      },
      { where: { id: req.params.id } }
    );
    req.flash('success', 'Trip updated.');
    res.redirect(`/trips/${req.params.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/trips');
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
    res.redirect('/trips');
  }
});

// Route: POST /trips/:id
router.post('/:id', async (req, res) => {
  try {
    let trip = await db.trip.findOne({ where: { id: req.params.id } });
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
    res.redirect(`/trips/${req.params.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/trips');
  }
});

// Route: PUT /trips/:id/:day/:segment
router.put('/:id/:day/:segment', async (req, res) => {
  try {
    await db.segment.update(
      {
        subcategoryId: req.body.subcategoryId,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        url: req.body.url,
        notes: req.body.notes,
        booked: req.body.booked
      },
      { where: { id: req.params.segment } }
    );
    res.redirect(`/trips/${req.params.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/trips');
  }
});

// Route: DELETE /trips/:id/:day/:segment
router.delete('/:id/:day/:segment', async (req, res) => {
  try {
    await db.segment.destroy({ where: { id: req.params.segment } });
    res.redirect(`/trips/${req.params.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/trips');
  }
});

// Route: PUT /trips/:id/:day
router.put('/:id/:day', async (req, res) => {
  try {
    let array = req.body.order.split(', ');
    await array.forEach((segmentId, index) => {
      db.segment.update(
        {
          time: index + 1
        },
        { where: { id: parseInt(segmentId) } }
      );
    });
    res.redirect(`/trips/${req.params.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/trips');
  }
});

// Export module
module.exports = router;
