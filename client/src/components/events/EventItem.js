import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import {
  addLike,
  removeLike,
  deleteEvent,
  getEventById
} from '../../actions/event';
const EventItem = ({
  auth,
  addLike,
  deleteEvent,
  removeLike,
  event: {
    _id,
    eventName,
    poster,
    likes,
    description,
    unlikes,
    dateDebut,
    dateFin,
    prix,
    user
  },
  showActions
}) => {
  return (
    <div className='event'>
      <img src={poster} />
      <div className='info'>
        <h4>{eventName}</h4>

        <div className='pp'>{description}</div>
        <div className='pp'>
          Date du debut <Moment format='YYYY/MM/DD'>{dateDebut}</Moment>
        </div>
        <div className='pp'>
          Date de la fin <Moment format='YYYY/MM/DD'>{dateFin}</Moment>
        </div>
        <div className='pp'>{prix}</div>
        {showActions && (
          <div className='infoBtn'>
            {' '}
            <Fragment>
              <button
                onClick={e => addLike(_id)}
                type='button'
                className='btn btn-outline-primary'
              >
                <i className='fas fa-thumbs-up' />{' '}
                <span>
                  {' '}
                  {likes && likes.length > 0 && <span>{likes.length}</span>}
                </span>
              </button>
              <button
                onClick={e => removeLike(_id)}
                type='button'
                className='btn btn-outline-primary'
              >
                <i className='fas fa-thumbs-down' />
              </button>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={e => deleteEvent(_id)}
                  type='button'
                  className='btn btn-danger'
                >
                  <i className='fas fa-times' />
                </button>
              )}
              <Link to={`/events/${_id}`}>
                <button type='button' class='btn btn-outline-success'>
                  Buy
                </button>
              </Link>
            </Fragment>
          </div>
        )}
      </div>
    </div>
  );
};

EventItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deleteEvent,
  getEventById
})(EventItem);

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  getEventById: PropTypes.func.isRequired
};
