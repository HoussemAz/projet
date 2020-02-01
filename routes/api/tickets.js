const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Event = require('../../models/Event');
const User = require('../../models/User');
const Ticket = require('../../models/Ticket');

// router.get('/:id', auth, async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ msg: 'event not found' });
//     }
//     res.json(event);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'objectId') {
//       return res.status(404).json({ msg: 'Event not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

router.post(
  '/',

  [
    auth,
    [
      check('FirstName', 'FirstName is required')
        .not()
        .isEmpty(),
      check('LastName', 'LastName is required')
        .not()
        .isEmpty(),
      check('quantités', 'Quantités is required')
        .not()
        .isEmpty(),
      check('idEvent', 'Id Event is required')
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { LastName, FirstName, quantités, idEvent } = req.body;

    const ticketFileds = {};

    if (idEvent) ticketFileds.idEvent = idEvent;
    if (LastName) ticketFileds.LastName = LastName;
    if (FirstName) ticketFileds.FirstName = FirstName;
    if (quantités) ticketFileds.quantités = quantités;

    try {
      let ticket = await Ticket.findOne({ user: req.user.id });

      if (ticket) {
        ticket = await Ticket.findOneAndUpdate(
          { user: req.user.id },
          { $set: ticketFileds },
          { new: true }
        );

        return res.json(ticket);
      }
      ticket = new Ticket(ticketFileds);
      const addRes = await ticket.save();

      res.json(addRes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);
// router.get('/', auth, async (req, res) => {
//   try {
//     const tickets = await Ticket.find().sort({ date: -1 });
//     res.json(tickets);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// router.get('/', auth, async (req, res) => {
//   const { idTicket } = req.body;
//   try {
//     const ticket = await Ticket.findOne({
//       event: idTicket
//     }).populate('event', ['evntName', 'localisation', 'poster', 'prix']);

//     if (!ticket) {
//       return res.status(400).json({ msg: 'There is no Ticket' });
//     }
//     return res.json(ticket);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });
// router.get('/', auth, async (req, res) => {
//   try {
//     const event = await Event.findOne({
//       user: req.user.id
//     }).populate('event', ['eventName', 'poster', 'localisation']);

//     if (!event) {
//       return res.status(400).json({ msg: 'There is no ticket for this event' });
//     }
//     return res.json(event);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
