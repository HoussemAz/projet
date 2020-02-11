import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EVENTS,
  EVENT_ERROR,
  GET_EVENT,
  UPDATE_LIKES,
  DELETE_EVENT,
  ADD_EVENT
} from './types';

// Get Events

export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/events');
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
// Get event by ID
export const getEventById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`);
    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, like: res.data }
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, like: res.data }
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete event
export const deleteEvent = id => async dispatch => {
  try {
    await axios.delete(`/api/events/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id
    });

    dispatch(setAlert('Event Removed', 'success'));
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Add event
export const addEvent = FormData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/events', FormData, config);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Event Created', 'success'));
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
