import {
  GET_EVENTS,
  EVENT_ERROR,
  GET_EVENT,
  UPDATE_LIKES
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
    // case GET_EVENT:
    //   return {
    //     ...state,
    //     event: payload,
    //     loading: false
    //   };
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === payload.id ? { ...event, likes: payload.likes } : event
        ),
        loading: false
      };
    default:
      return state;
  }
}
