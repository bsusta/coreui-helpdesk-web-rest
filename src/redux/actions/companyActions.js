import { SET_COMPANIES,SET_COMPANIES_LOADING, ADD_COMPANY, SET_COMPANY, SET_COMPANY_LOADING, EDIT_COMPANY } from '../types';
import { COMPANIES_LIST } from '../urls';

/**
 * Sets status if companies are loaded to false
 */
export const startCompaniesLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_COMPANIES_LOADING, companiesLoaded:false });
  }
};

/**
 * Gets all companies available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getCompanies= (limit,page,token) => {
  return (dispatch) => {
      fetch(COMPANIES_LIST+'?limit='+limit+'&page='+page, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        let links=data._links;
        links['numberOfPages']=data.numberOfPages;
        dispatch({type: SET_COMPANIES, companies:data.data,links});
        dispatch({ type: SET_COMPANIES_LOADING, companiesLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}
