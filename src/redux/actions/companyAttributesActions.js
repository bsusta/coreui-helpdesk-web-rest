import { SET_COMPANY_ATTRIBUTES,SET_COMPANY_ATTRIBUTES_LOADING, ADD_COMPANY_ATTRIBUTE, SET_COMPANY_ATTRIBUTE, SET_COMPANY_ATTRIBUTE_LOADING, EDIT_COMPANY_ATTRIBUTE } from '../types';
import { COMPANY_ATTRIBUTES_LIST } from '../urls';

/**
 * Sets status if companyAttributes are loaded to false
 */
export const startCompanyAttributesLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_COMPANY_ATTRIBUTES_LOADING, companyAttributesLoaded:false });
  }
};

/**
 * Gets all companyAttributes available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getCompanyAttributes= (token) => {
  return (dispatch) => {
      fetch(COMPANY_ATTRIBUTES_LIST+'?limit=999', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_COMPANY_ATTRIBUTES, companyAttributes:data.data});
        dispatch({ type: SET_COMPANY_ATTRIBUTES_LOADING, companyAttributesLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}
/**
 * Adds new companyAttribute
 * @param {object} body  All parameters in an object of the new companyAttribute
 * @param {string} token universal token for API comunication
 */
export const addCompanyAttribute = (body,token) => {
  return (dispatch) => {
      fetch(COMPANY_ATTRIBUTES_LIST,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
    response.json().then((response)=>{
      dispatch({type: ADD_COMPANY_ATTRIBUTE, companyAttribute:response.data});
    })})
    .catch(function (error) {
      console.log(error);
    });

  };
};

/**
 * Sets status if companyAttribute is loaded to false
 */
export const startCompanyAttributeLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_COMPANY_ATTRIBUTE_LOADING, companyAttributeLoaded:false });
  }
};

/**
 * Gets one companyAttribute that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the companyAttribute that we want to load
 */
export const getCompanyAttribute = (id,token) => {
  return (dispatch) => {
      fetch(COMPANY_ATTRIBUTES_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_COMPANY_ATTRIBUTE, companyAttribute:data.data});
        dispatch({ type: SET_COMPANY_ATTRIBUTE_LOADING, companyAttributeLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}

/**
 * Edits selected companyAttribute
 * @param  {object}  body     data about companyAttribute except for isActive
 * @param  {Boolean} isActive is active companyAttribute parameter
 * @param  {int}  id       id of the companyAttribute
 * @param  {string}  token    universal token for API comunication
 */
export const editCompanyAttribute = (body,isActive,id,token) => {
  return (dispatch) => {

      Promise.all([
        fetch(COMPANY_ATTRIBUTES_LIST+'/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }),
        fetch(COMPANY_ATTRIBUTES_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        })]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
          dispatch({type: EDIT_COMPANY_ATTRIBUTE, companyAttribute:{...response1.data,is_active:isActive}});
        }))
        .catch(function (error) {
          console.log(error);
      });

  };
};
