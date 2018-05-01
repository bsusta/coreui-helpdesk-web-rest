import { SET_COMPANY_ATTRIBUTES, SET_COMPANY_ATTRIBUTES_LOADING, ADD_COMPANY_ATTRIBUTE, SET_COMPANY_ATTRIBUTE_LOADING, SET_COMPANY_ATTRIBUTE, EDIT_COMPANY_ATTRIBUTE, LOGIN_LOGOUT } from '../types'

const initialState = {
  companyAttributes:[],
  companyAttributesLoaded:false,
  companyAttribute:null,
  companyAttributeLoaded:false,
};

export default function companyAttributesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANY_ATTRIBUTES:
      return { ...state, companyAttributes:action.companyAttributes };
    case ADD_COMPANY_ATTRIBUTE:
      return { ...state, companyAttributes:[action.companyAttribute,...state.companyAttributes] };
    case SET_COMPANY_ATTRIBUTES_LOADING:
      return { ...state, companyAttributesLoaded:action.companyAttributesLoaded };
    case SET_COMPANY_ATTRIBUTE_LOADING:
      return { ...state, companyAttributeLoaded:action.companyAttributeLoaded };
    case SET_COMPANY_ATTRIBUTE:
      return { ...state, companyAttribute:action.companyAttribute };
    case EDIT_COMPANY_ATTRIBUTE:{
      //finds location of the current companyAttribute and replaces it with newer version
      let newCompanyAttributes=[...state.companyAttributes];
      newCompanyAttributes[newCompanyAttributes.findIndex((companyAttribute)=>companyAttribute.id==action.companyAttribute.id)]=action.companyAttribute;
      return { ...state, companyAttributes:newCompanyAttributes };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
