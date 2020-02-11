import axios from 'axios';
import { setAlert } from './alert';
import { ADD_TICKET, TICKET_ERROR } from './types';

export const addTicket = FormData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/tickets', FormData, config);

    dispatch({
      type: ADD_TICKET,
      payload: res.data
    });

    dispatch(setAlert('Ticket Reserved', 'success'));
  } catch (error) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
