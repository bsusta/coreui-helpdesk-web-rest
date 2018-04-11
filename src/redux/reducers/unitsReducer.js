import { SET_UNITS, SET_UNITS_LOADING, ADD_UNIT, SET_UNIT_LOADING, SET_UNIT, EDIT_UNIT, LOGIN_LOGOUT } from '../types'

const initialState = {
  units:[],
  unitsLoaded:false,
  unit:null,
  unitLoaded:false,
};

export default function unitsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_UNITS:
      return { ...state, units:action.units };
    case ADD_UNIT:
      return { ...state, units:[action.unit,...state.units] };
      case SET_UNITS_LOADING:
        return { ...state, unitsLoaded:action.unitsLoaded };
      case SET_UNIT_LOADING:
        return { ...state, unitLoaded:action.unitLoaded };
      case SET_UNIT:
        return { ...state, unit:action.unit };
      case EDIT_UNIT:{
        //finds location of the current unit and replaces it with newer version
        let newUnits=[...state.units];
        newUnits[newUnits.findIndex((unit)=>unit.id==action.unit.id)]=action.unit;
        return { ...state, units:newUnits };
      }
      case LOGIN_LOGOUT:
        return { ...initialState };
    default:
      return state;
  }
}
