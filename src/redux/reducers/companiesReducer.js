import { SET_COMPANIES, SET_COMPANIES_LOADING, ADD_COMPANY, SET_COMPANY_LOADING, SET_COMPANY, EDIT_COMPANY } from '../types'

const initialState = {
  companies:[],
  companiesLoaded:false,
  company:null,
  companyLoaded:false,
  companiesLinks:null,
};

export default function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANIES:
      return { ...state, companies:action.companies, companiesLinks:action.links };
    case ADD_COMPANY:
      return { ...state, companies:[action.company,...state.companies] };
    case SET_COMPANIES_LOADING:
      return { ...state, companiesLoaded:action.companiesLoaded };
    case SET_COMPANY_LOADING:
      return { ...state, companyLoaded:action.companyLoaded };
    case SET_COMPANY:
      return { ...state, company:action.company };
    case EDIT_COMPANY:{
      //finds location of the current company and replaces it with newer version
      let newCompanies=[...state.companies];
      newCompanies[newCompanies.findIndex((company)=>company.id==action.company.id)]=action.company;
      return { ...state, companies:newCompanies };
    }
    default:
      return state;
  }
}
