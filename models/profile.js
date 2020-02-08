const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  phone: {
    type: String
  },

  adresse: {
    type: String
  },

  social: [
    {
      youtube: {
        type: String
      },
      twitter: {
        type: String
      },
      instagram: {
        type: String
      },
      facebook: {
        type: String
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

// const user = {...this.props.user}
// user.name
// {((this.props.user || {}).list  || {}).car}
