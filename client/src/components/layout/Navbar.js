import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='List'>
      <li>
        <Link to='/profiles'>Account's</Link>
      </li>
      <li>
        <Link to='/events'>Event's</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guesLinks = (
    <ul className='List'>
      <li>
        <Link to='/profiles'>Account's</Link>
      </li>
      <li>
        <Link to='/events'>Event's</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar'>
      <h1 className='List'>
        <Link to='/'>
          <i className='fab fa-creative-commons-sampling' /> Eventi
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guesLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
