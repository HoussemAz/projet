import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, First_name, avatar },
    phone,
    adresse
  }
}) => {
  return (
    <div>
      <img src={avatar} alt='' />

      <div>
        <div>{First_name}</div>
        <div>
          <i class='fas fa-phone-alt'></i> {phone}
        </div>
        <div>
          <i class='fas fa-map-marked-alt'></i>
          {'  '}
          {adresse}
        </div>

        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
