import { SET_UNITS, SET_UNITS_LOADING } from '../types'

const initialState = {
  units:[],
  unitsLoaded:false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_UNITS:
      return { ...state, units:action.units };
    case SET_UNITS_LOADING:
      return { ...state, unitsLoaded:action.unitsLoaded };
    default:
      return state;
  }
}
