const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  description: {
    type: String,
    required: true
  },

  eventName: {
    type: String,
    required: true
  },

  poster: {
    type: String,
    required: true
  },

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  },

  dateDebut: {
    type: Date,
    required: true
  },

  dateFin: {
    type: Date
  },

  location: {
    type: String,
    required: true
  },

  ticket: {
    type: String
  },

  prix: {
    type: String,
    required: true
  }
});
module.exports = Event = mongoose.model('event', EventSchema);
