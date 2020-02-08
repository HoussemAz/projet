import axios from 'axios';
import { setAlert } from './alert';
import { GET_EVENTS, EVENT_ERROR, GET_EVENT, UPDATE_LIKES } from './types';

// Get Events
// export const getEvents = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/events');
//     dispatch({
//       type: GET_EVENTS,
//       payload: res.data
//     });
//   } catch (error) {
//     dispatch({
//       type: EVENT_ERROR,
//       payload: { msg: error.response.statusText, status: error.response.status }
//     });
//   }
// };

export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/events');
    console.log('res', res);
    console.log('res', res);

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
// export const getProfileById = id => async dispatch => {
//   try {
//     const res = await axios.get(`/api/events/${id}`);
//     dispatch({
//       type: GET_EVENT,
//       payload: res.data
//     });
//   } catch (error) {
//     dispatch({
//       type: EVENT_ERROR,
//       payload: { msg: error.response.statusText, status: error.response.status }
//     });
//   }
// };

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
