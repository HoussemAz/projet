import { ADD_TICKET, TICKET_ERROR } from '../actions/types';
const initialState = {
  ticket: null,
  tickets: [],
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, payload],
        loading: false
      };
    case TICKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
  }
}
