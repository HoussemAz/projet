const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isEmpty = require('lodash').isEmpty;
const Profile = require('../../models/profile');
const User = require('../../models/User');
const Event = require('../../models/Event');

// get users profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['First_name', 'Last_name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this use' });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Create or Update user profile
router.post('/', auth, async (req, res) => {
  const { phone, adresse, youtube, facebook, instagram, twitter } = req.body;
  // build profile object
  const profileFileds = {};
  profileFileds.user = req.user.id;
  if (phone) profileFileds.phone = phone;
  if (adresse) profileFileds.adresse = adresse;
  //build social object
  socialFields = {};
  if (youtube) socialFields.youtube = youtube;
  if (facebook) socialFields.facebook = facebook;
  if (instagram) socialFields.instagram = instagram;
  if (twitter) socialFields.twitter = twitter;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //update
      if (!isEmpty(socialFields)) {
        profileFileds.social = [...profile.social, socialFields];
      }
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFileds },
        { new: true }
      );
      console.log('update');

      return res.json(profile);
    }
    //create
    console.log('create');
    profileFileds.social = [socialFields];
    profile = new Profile(profileFileds);
    const addRes = await profile.save();

    res.json(addRes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'First_name',
      'Last_name',
      'avatar'
    ]);

    if (!profiles) {
      return res.status(400).json({ msg: 'There is no profile' });
    }
    res.json(profiles);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//get profile by user ID
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['First_name', 'Last_name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    console.error(err.message);
    if (err.kid == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//Delete profile
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({
      user: req.user.id
    });

    res.json({ msg: 'Profile deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Delete event
router.delete('/', auth, async (req, res) => {
  try {
    await Event.deleteMany({
      user: req.user.id
    });

    res.json({ msg: 'Event deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Delete user
router.delete('/', auth, async (req, res) => {
  try {
    await User.findOneAndRemove({
      _id: req.user.id
    });

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put('/social', auth, async (req, res) => {
  const { facebook, instagram, twitter, youtube } = req.body;

  const newSocial = {
    facebook,
    instagram,
    twitter,
    youtube
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.social.unshift(newSocial);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/social/:soc_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.social
      .map(item => item.id)
      .indexOf(req.params.soc_id);

    profile.social.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
