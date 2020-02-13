import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventDashboard from '../events/EventDashboard';
import Spinner from '../layout/Spinner';
import { getEvents } from '../../actions/event';
import { filterbyname } from '../../actions/filter';

const Landing = ({
  isAuthenticated,
  getEvents,
  search,
  event: { events, loading }
}) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return loading || events === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section classeName='landing'>
        <div classeName='dark-overlay'>
          <div classeName='landing-inner'>
            <div className='welcome'>
              <h1 className='profileTitel'>Client Connector</h1>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: '700',
                  marginTop: '100px'
                }}
              >
                Create Profile, Book your spot/share events,
                <br /> "Eventi and Live your experience"
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

                <Link to='/login'>
                  <button type='button' class='btn btn-light'>
                    Login
                  </button>
                </Link>
              </div>
            </div>
            <div className='body'>
              {events &&
                events
                  .filter(event =>
                    event.eventName.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(event => <EventDashboard {...event} />)}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  getEvents: PropTypes.func.isRequired,
  filterbyname: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    event: state.event,
    search: state.filterbyname.search
  };
};

export default connect(mapStateToProps, { getEvents, filterbyname })(Landing);
