import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section classeName='landing'>
      <div classeName='dark-overlay'>
        <div classeName='landing-inner'>
          <h1 className='profileTitel'>Client Connector</h1>
          <p
            style={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '700',
              marginTop: '100px'
            }}
          >
            Create Profile, Book your spot/share events, "Eventi and Live your
            experience"
          </p>
          <div
            className='buttons'
            style={{ textAlign: 'center', marginTop: '100px' }}
          >
            <Link
              to='/register'
              className='btn btn-primary'
              style={{ marginRight: '30px' }}
            >
              Sing Up
            </Link>

            <Link to='/login' classeName='btn btn-light'>
              login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
