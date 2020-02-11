import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons1'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i>
        Edit Profile
      </Link>
      <Link to='/add-social' className='btn btn-light'>
        <i class='fas fa-network-wired text-primary'></i>
        Add Social Network
      </Link>
    </div>
  );
};
export default DashboardActions;
