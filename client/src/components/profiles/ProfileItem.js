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
    <div className='cardProf'>
      <div className='card' style={{ width: '200px' }}>
        <img src={avatar} className='card-img-top' alt='...' />
        <div className='card-body'>
          <h5 className='card-title'>{First_name}</h5>
          <p className='card-text'>
            <i className='fas fa-phone-alt'></i> {phone}
          </p>
          <p className='card-text'>
            <i className='fas fa-map-marked-alt'></i>
            {'  '}
            {adresse}
          </p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
      </div>
    </div>

    // <div>
    //   <img src={avatar} alt='' />

    //   <div>
    //     <div>{First_name}</div>
    //     <div>
    //       <i class='fas fa-phone-alt'></i> {phone}
    //     </div>
    //     <div>
    //       <i class='fas fa-map-marked-alt'></i>
    //       {'  '}
    //       {adresse}
    //     </div>

    //     <Link to={`/profile/${_id}`} className='btn btn-primary'>
    //       View Profile
    //     </Link>
    //   </div>
    // </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
