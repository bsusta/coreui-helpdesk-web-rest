import { SET_TASK_ATTRIBUTES,SET_TASK_ATTRIBUTES_LOADING, ADD_TASK_ATTRIBUTE, SET_TASK_ATTRIBUTE, SET_TASK_ATTRIBUTE_LOADING, EDIT_TASK_ATTRIBUTE,SET_ERROR_MESSAGE } from '../types';
import { TASK_ATTRIBUTES_LIST } from '../urls';

/**
 * Sets status if taskAttributes are loaded to false
 */
export const startTaskAttributesLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_TASK_ATTRIBUTES_LOADING, taskAttributesLoaded:false });
  }
};

/**
 * Gets all taskAttributes available with no pagination
 * @param {string} token universal token for API comunication
 */
 export const getTaskAttributes= (token) => {
   return (dispatch) => {
       fetch(TASK_ATTRIBUTES_LIST+'?limit=999', {
         method: 'get',
         headers: {
           'Authorization': 'Bearer ' + token,
           'Content-Type': 'application/json'
         }
       }).then((response) =>{
         if(!response.ok){
           dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
           return;
         }
       response.json().then((data) => {
         dispatch({type: SET_TASK_ATTRIBUTES, taskAttributes:data.data});
         dispatch({ type: SET_TASK_ATTRIBUTES_LOADING, taskAttributesLoaded:true });
       });
     }
   ).catch(function (error) {
     dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
     console.log(error);
   });
 }
 }

 /**
  * Gets all active taskAttributes available with no pagination
  * @param {string} token universal token for API comunication
  */
  export const getActiveTaskAttributes= (token) => {
    return (dispatch) => {
        fetch(TASK_ATTRIBUTES_LIST+'?limit=999&isActive=true', {
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }).then((response) =>{
          if(!response.ok){
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
            return;
          }
        response.json().then((data) => {
          dispatch({type: SET_TASK_ATTRIBUTES, taskAttributes:data.data});
          dispatch({ type: SET_TASK_ATTRIBUTES_LOADING, taskAttributesLoaded:true });
        });
      }
    ).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
  }

/**
 * Adds new taskAttribute
 * @param {object} body  All parameters in an object of the new taskAttribute
 * @param {string} token universal token for API comunication
 */
export const addTaskAttribute = (body,token) => {
  return (dispatch) => {
      fetch(TASK_ATTRIBUTES_LIST,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
      if(!response.ok){
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
        return;
      }
    response.json().then((response)=>{
      dispatch({type: ADD_TASK_ATTRIBUTE, taskAttribute:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

/**
 * Sets status if taskAttribute is loaded to false
 */
export const startTaskAttributeLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_TASK_ATTRIBUTE_LOADING, taskAttributeLoaded:false });
  }
};

/**
 * Gets one taskAttribute that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the taskAttribute that we want to load
 */
export const getTaskAttribute = (id,token) => {
  return (dispatch) => {
      fetch(TASK_ATTRIBUTES_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
          return;
        }
      response.json().then((data) => {
        dispatch({type: SET_TASK_ATTRIBUTE, taskAttribute:data.data});
        dispatch({ type: SET_TASK_ATTRIBUTE_LOADING, taskAttributeLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}

/**
 * Edits selected taskAttribute
 * @param  {object}  body     data about taskAttribute except for isActive
 * @param  {Boolean} isActive is active taskAttribute parameter
 * @param  {int}  id       id of the taskAttribute
 * @param  {string}  token    universal token for API comunication
 */
export const editTaskAttribute = (body,isActive,id,token) => {
  return (dispatch) => {

      Promise.all([
        fetch(TASK_ATTRIBUTES_LIST+'/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }),
        fetch(TASK_ATTRIBUTES_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        })]).then(([response1,response2])=>{
          if(!response1.ok){
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response1.statusText });
            return;
          }
          if(!response2.ok){
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response2.statusText });
            return;
          }
          Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
          dispatch({type: EDIT_TASK_ATTRIBUTE, taskAttribute:{...response1.data,is_active:isActive}});
        })})
        .catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
          console.log(error);
      });

  };
};
