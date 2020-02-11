const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Event = require('../../models/Event');
// const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.post(
  '/',

  [
    auth,
    [
      check('eventName', 'Event Name is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('poster', 'Poster is required')
        .not()
        .isEmpty(),
      check('dateDebut', 'Date Debut is required')
        .not()
        .isEmpty(),
      check('location', 'Location is required')
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // *************
      const user = await User.findById(req.user.id).select('-password');
      const newEvent = new Event({
        description: req.body.description,
        eventName: req.body.eventName,
        poster: req.body.poster,
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        location: req.body.location,
        prix: req.body.prix,
        ticket: req.body.ticket,
        user: req.user.id
        // user: user.First_name
      });

      const event = await newEvent.save();

      return res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// *********************

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'objectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }
    await event.remove();
    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'objectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.put('/like/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (
      event.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'event already liked' });
    }

    event.likes.unshift({ user: req.user.id });

    await event.save();

    res.json(event.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (
      event.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'event has not yet been liked' });
    }

    const removeIndex = event.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    event.likes.splice(removeIndex, 1);

    await event.save();

    res.json(event.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put(
  '/:id',

  [
    auth,
    [
      check('eventName', 'Event Name is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('poster', 'Poster is required')
        .not()
        .isEmpty(),
      check('dateDebut', 'Date Debut is required')
        .not()
        .isEmpty(),
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('prix', 'Prix is required')
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      description,
      dateDebut,
      eventName,
      poster,
      location,
      prix,
      ticket,
      dateFin
    } = req.body;

    eventFileds = {};
    if (description) eventFileds.description = description;
    if (dateDebut) eventFileds.dateDebut = dateDebut;
    if (eventName) eventFileds.eventName = eventName;
    if (poster) eventFileds.poster = poster;
    if (location) eventFileds.location = location;
    if (ticket) eventFileds.ticket = ticket;
    if (dateFin) eventFileds.dateFin = dateFin;
    if (prix) eventFileds.prix = prix;

    try {
      let event = await Event.findById(req.params.id);

      event = await Event.findOneAndUpdate(
        { _id: req.params.id },
        { $set: eventFileds },
        { new: true, upsert: true }
      );

      return res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
