const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event'
  },

  FirstName: {
    type: String,
    required: true
  },

  LastName: {
    type: String,
    required: true
  },

  quantités: {
    type: String,
    required: true
  },

  idEvent: {
    type: String
  }
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
