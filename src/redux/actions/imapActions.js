import { SET_IMAPS,SET_IMAPS_LOADING, ADD_IMAP, SET_IMAP, SET_IMAP_LOADING, EDIT_IMAP, DELETE_IMAP, SET_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS } from '../types';
import { IMAPS_LIST } from '../urls';
import {processError} from '../../helperFunctions';

/**
 * Sets status if imaps are loaded to false
 */
export const startImapsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_IMAPS_LOADING, imapsLoaded:false });
  }
};

/**
 * Gets all imaps available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getImaps= (token) => {
  return (dispatch) => {
      fetch(IMAPS_LIST+'?limit=999', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        dispatch({type: LOWER_ACTIVE_REQUESTS});
        if(!response.ok){
          processError(response,dispatch);
          return;
        }
      response.json().then((data) => {
        dispatch({type: SET_IMAPS, imaps:data.data});
        dispatch({ type: SET_IMAPS_LOADING, imapsLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}
/**
 * Adds new imap
 * @param {object} body  All parameters in an object of the new imap
 * @param {string} token universal token for API comunication
 */
export const addImap = (body,project,token) => {
  return (dispatch) => {
      fetch(IMAPS_LIST+'/project/'+project,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
      if(!response.ok){
        processError(response,dispatch);
        return;
      }
    response.json().then((response)=>{
      dispatch({type: ADD_IMAP, imap:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

/**
 * Sets status if imap is loaded to false
 */
export const startImapLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_IMAP_LOADING, imapLoaded:false });
  }
};

/**
 * Gets one imap that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the imap that we want to load
 */
export const getImap = (token,id) => {
  return (dispatch) => {
      fetch(IMAPS_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        dispatch({type: LOWER_ACTIVE_REQUESTS});
        if(!response.ok){
          processError(response,dispatch);
          return;
        }
      response.json().then((data) => {
        dispatch({type: SET_IMAP, imap:data.data});
        dispatch({ type: SET_IMAP_LOADING, imapLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}

/**
 * Edits selected imap
 * @param  {object}  body     data about imap except for isActive
 * @param  {Boolean} isActive is active imap parameter
 * @param  {int}  id       id of the imap
 * @param  {string}  token    universal token for API comunication
 */
export const editImap = (body,project,id,isActive,token) => {
  return (dispatch) => {

      Promise.all([
        fetch(IMAPS_LIST+'/'+id+'/project/'+project, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }),
        fetch(IMAPS_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        })
      ]).then(([response1,response2])=>{
        if(!response1.ok){
          processError(response1,dispatch);
          return;
        }
        if(!response2.ok){
        processError(response2,dispatch);
          return;
        }
        Promise.all([response1.json()]).then(([response1])=>{
          dispatch({type: EDIT_IMAP, imap:{...response1.data,is_active:isActive}});
        })})
        .catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
      });
  };
};

export const deleteImap = (id,token) => {
  return (dispatch) => {
      fetch(IMAPS_LIST+'/'+id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          processError(response,dispatch);
          return;
        }
        dispatch({type: DELETE_IMAP, id});
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}
