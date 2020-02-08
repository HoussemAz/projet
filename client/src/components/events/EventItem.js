import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'ract-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { addLike, removeLike } from '../../actions/event';
const EventItem = ({
  auth,
  addLike,
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
  }
}) => {
  return (
    <div className='event'>
      <h4>{eventName}</h4>
      {/* <img src={poster} /> */}
      <p>{description}</p>
      <p>
        Date du debut <Moment format='YYYY/MM/DD'>{dateDebut}</Moment>
      </p>
      <p>
        Date de la fin <Moment format='YYYY/MM/DD'>{dateFin}</Moment>
      </p>
      <p>{prix}</p>
      <button
        onClick={e => addLike(e)}
        type='button'
        className='btn btn-primary'
      >
        <i className='fas fa-thumbs-up' />{' '}
        <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      <button
        onClick={e => removeLike(e)}
        type='button'
        className='btn btn-primary'
      >
        <i className='fas fa-thumbs-down' />
        {/* <span> {unlikes.length > 0 && <span>{unlikes.length}</span>}</span> */}
      </button>
      {!auth.loading && user === auth.user._id && (
        <button type='button' className='btn btn-danger'>
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addLike, removeLike })(EventItem);

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
