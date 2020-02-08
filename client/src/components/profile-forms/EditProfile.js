import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  connect
  //  useSelector
} from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    phone: '',
    adresse: '',
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: ''
  });
  // const social = useSelector(state => state.profile.profile.social[0]);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData(
      !loading && {
        phone: profile.phone,
        adresse: profile.adresse,
        facebook: profile.social[0].facebook,
        youtube: profile.social[0].youtube,
        instagram: profile.social[0].instagram,
        twitter: profile.social[0].twitter
      }

      // {
      //   phone: loading || !profile.phone ? '' : profile.phone,
      //   adresse: loading || !profile.adresse ? '' : profile.adresse,
      //   facebook: loading || !profile.social ? '' : profile.social[0].facebook,
      //   youtube: loading || !profile.social[0] ? '' : profile.social[0].youtube,
      //   instagram:
      //     loading || !profile.social[0] ? '' : profile.social[0].instagram,
      //   twitter: loading || !profile.social[0] ? '' : profile.social[0].twitter
      // }
    );
  }, [getCurrentProfile, loading]);

  const { phone, adresse, facebook, instagram, youtube, twitter } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='profileTitel'>Edite Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Let's get some information to make your profile stand out
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className=' form-group'>
          <input
            type='text'
            placeholder='Phone'
            name='phone'
            value={phone}
            onChange={e => onChange(e)}
          />
        </div>

        <div className=' form-group'>
          <input
            type='text'
            placeholder='Adresse'
            name='adresse'
            value={adresse}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Edit Social Network Links
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                defaultValue={facebook}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='Youtube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i class='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
