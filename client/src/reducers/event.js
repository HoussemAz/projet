import {
  GET_EVENTS,
  EVENT_ERROR,
  GET_EVENT,
  UPDATE_LIKES,
  DELETE_EVENT,
  ADD_EVENT
} from '../actions/types';
const initialState = {
  event: null,
  events: [],
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      };
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
        loading: false
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== payload),
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      const newLIKE = state.events.map(event =>
        event._id === payload.id ? { ...event, likes: payload.like } : event
      );
      return { ...state, events: newLIKE, loading: false };
    default:
      return state;
  }
}
