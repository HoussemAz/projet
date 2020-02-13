import { FILTERBYNAME } from '../actions/types';

const initialState = {
  search: ''
};
const filterbyname = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILTERBYNAME:
      return { ...state, search: payload };
    default:
      return state;
  }
};
export default filterbyname;
