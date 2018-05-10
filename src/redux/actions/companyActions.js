import { SET_COMPANIES,SET_COMPANIES_LOADING, ADD_COMPANY, SET_COMPANY, SET_COMPANY_LOADING, EDIT_COMPANY,SET_ERROR_MESSAGE, SET_TASK_COMPANIES,ADD_ERROR_MESSAGE } from '../types';
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
 export const getCompanies= (updateDate,token) => {
   return (dispatch) => {
     fetch(COMPANIES_LIST+'?limit=999', {
       method: 'get',
       headers: {
         'Authorization': 'Bearer ' + token,
         'Content-Type': 'application/json'
       }
     }).then((response) =>{
       if(!response.ok){
         response.text().then((data)=>{
           dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
         });
         return;
       }
       response.json().then((data) => {
         dispatch({type: SET_COMPANIES, companies:data.data,updateDate});
         dispatch({ type: SET_COMPANIES_LOADING, companiesLoaded:true });
       });
     }
   ).catch(function (error) {
     dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
     console.log(error);
   });
 }
 }

 /**
  * Gets all companies available with no pagination
  * @param {string} token universal token for API comunication
  */
  export const getTaskCompanies = (updateDate,token) => {
    return (dispatch) => {
      fetch(COMPANIES_LIST+'/all'+(updateDate?'/'+updateDate:''), {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          response.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
          });
          return;
        }
        response.json().then((data) => {
          dispatch({type: SET_TASK_COMPANIES, companies:data.data,updateDate:data.date.toString()});
          dispatch({ type: SET_COMPANIES_LOADING, companiesLoaded:true });
        });
      }
    ).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
  }

/**
 * Adds new company
 * @param {object} body  All parameters in an object of the new company
 * @param {string} token universal token for API comunication
 */
export const addCompany = (body,token) => {
  return (dispatch) => {
      fetch(COMPANIES_LIST,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
      if(!response.ok){
        response.text().then((data)=>{
          dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
        });
        return;
      }
    response.json().then((response)=>{
      dispatch({type: ADD_COMPANY, company:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

/**
 * Sets status if company is loaded to false
 */
export const startCompanyLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_COMPANY_LOADING, companyLoaded:false });
  }
};

/**
 * Gets one company that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the company that we want to load
 */
export const getCompany = (id,token) => {
  return (dispatch) => {
      fetch(COMPANIES_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          response.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
          });
          return;
        }
      response.json().then((data) => {
        dispatch({type: SET_COMPANY, company:data.data});
        dispatch({ type: SET_COMPANY_LOADING, companyLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}

/**
 * Edits selected company
 * @param  {object}  body     data about company except for isActive
 * @param  {Boolean} isActive is active company parameter
 * @param  {int}  id       id of the company
 * @param  {string}  token    universal token for API comunication
 */
 export const editCompanyWithActive = (body,isActive,id,token) => {
   return (dispatch) => {
       Promise.all([
         fetch(COMPANIES_LIST+'/'+id, {
           method: 'put',
           headers: {
             'Authorization': 'Bearer ' + token,
             'Content-Type': 'application/json'
           },
           body:JSON.stringify(body)
         }),
         fetch(COMPANIES_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
           method: 'put',
           headers: {
             'Authorization': 'Bearer ' + token,
             'Content-Type': 'application/json'
           }
         })]).then(([response1,response2])=>{
           if(!response1.ok){
             response1.text().then((data)=>{
               dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response1.statusText+ JSON.parse(data).message });
             });
             return;
           }
           if(!response2.ok){
             response2.text().then((data)=>{
               dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response2.statusText+ JSON.parse(data).message });
             });
             return;
           }
           Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
           dispatch({type: EDIT_COMPANY, company:response1.data});
         })})
         .catch(function (error) {
           dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
       });

   };
 };

 export const editCompany = (body,isActive,id,token) => {
   return (dispatch) => {
       Promise.all([
         fetch(COMPANIES_LIST+'/'+id, {
           method: 'put',
           headers: {
             'Authorization': 'Bearer ' + token,
             'Content-Type': 'application/json'
           },
           body:JSON.stringify(body)
         }),
         fetch(COMPANIES_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
           method: 'put',
           headers: {
             'Authorization': 'Bearer ' + token,
             'Content-Type': 'application/json'
           }
         })]).then(([response1,response2])=>{
           if(!response1.ok){
             response1.text().then((data)=>{
               dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response1.statusText+ JSON.parse(data).message });
             });
             return;
           }
           if(!response2.ok){
             response2.text().then((data)=>{
               dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response2.statusText+ JSON.parse(data).message });
             });
             return;
           }
           Promise.all([response1.json()]).then(([response1])=>{
           dispatch({type: EDIT_COMPANY, company:response1.data});
         })})
         .catch(function (error) {
           dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
       });

   };
 };
