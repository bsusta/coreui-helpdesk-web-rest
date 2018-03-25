import { SET_COMPANIES, SET_COMPANIES_LOADING, ADD_COMPANY, SET_COMPANY_LOADING, SET_COMPANY, EDIT_COMPANY } from '../types'

const initialState = {
  companies:[],
  companiesLoaded:false,
  companies:null,
  companyLoaded:false,
  updateDate:null,
};

export default function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANIES:{
      if(!state.updateDate){
        return { ...state, companies:action.companies, updateDate:action.updateDate };
      }
      let newCompanies=[...state.companies];
      action.companies.map((company)=>{
        let index= newCompanies.findIndex((item)=>item.id===company.id);
        if(index!=-1){
          if(!company.is_active){
            newCompanies.splice(index,1);
          }
          else{
            newCompanies[index]=company;
          }
        }
        else{
          newCompanies.push(company);
        }
      });
      return { ...state, companies:newCompanies, updateDate:action.updateDate };

    }
    case ADD_COMPANY:
      return { ...state, companies:[action.company,...state.companies] };
      case SET_COMPANIES_LOADING:
        return { ...state, companiesLoaded:action.companiesLoaded };
      case SET_COMPANY_LOADING:
        return { ...state, companyLoaded:action.companyLoaded };
      case SET_COMPANY:
        return { ...state, company:action.company,companyLoaded:true };
      case EDIT_COMPANY:{
        //finds location of the current company and replaces it with newer version
        let newCompanies=[...state.companies];
        if(action.company.is_active){
          newCompanies[newCompanies.findIndex((company)=>company.id==action.company.id)]=action.company;
        }
        else{
          newCompanies.splice(newCompanies.findIndex((company)=>company.id==action.company.id),1);
        }
        return { ...state, companies:newCompanies };
      }
    default:
      return state;
  }
}
