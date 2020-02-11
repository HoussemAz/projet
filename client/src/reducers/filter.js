import { FILTERBYNAME } from '../actions/types';

const initialState = {
  filterbyname: ''
};
const filterbyname = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILTERBYNAME:
      return { ...state, filterbyname: payload };
    default:
      return state;
  }
};
export default filterbyname;
