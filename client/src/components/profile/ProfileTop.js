import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    phone,
    adresse,
    //  social,
    user: { First_name, avatar }
  }
}) => {
  return (
    <div className='profileCard'>
      <div className='profileInfo'>
        <div className='profileName'>{First_name}</div>
        <div className='profilePhone'>
          <i class='fas fa-phone-alt'></i> {phone}
        </div>
        <div className='profileAdresse'>
          <i class='fas fa-map-marked-alt'></i>
          {'  '}
          {adresse}
        </div>
      </div>
      <img className='profileAvatar' src={avatar} alt='' />

      {/* <div>
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            {' '}
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
      </div> */}
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
