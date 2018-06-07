import { SET_SUBTASKS,SET_SUBTASKS_LOADING, ADD_SUBTASK, EDIT_SUBTASK,DELETE_SUBTASK, SET_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS } from '../types';
import { TASKS_LIST } from '../urls';
import {processError} from '../../helperFunctions';

/**
 * Sets status if subtasks are loaded to false
 */
export const startSubtasksLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_SUBTASKS_LOADING, subtasksLoaded:false });
  }
};

/**
 * Gets all subtasks available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getSubtasks= (taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/subtasks', {
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
        dispatch({type: SET_SUBTASKS, subtasks:data.data});
        dispatch({ type: SET_SUBTASKS_LOADING, subtasksLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
  }
}
/**
 * Adds new subtask
 * @param {object} body  All parameters in an object of the new subtask
 * @param {string} token universal token for API comunication
 */

export const addSubtask = (body,taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/subtask',{
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
      dispatch({type: ADD_SUBTASK, subtask:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

export const editSubtask = (body,id,taskID,token) => {
  return (dispatch) => {
        fetch(TASKS_LIST+'/'+taskID+'/subtask/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }).then((response)=>{
          if(!response.ok){
            processError(response,dispatch);
            return;
          }
          response.json().then((response)=>{
          dispatch({type: EDIT_SUBTASK, subtask:response.data});
        })})
        .catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
      });
  };
};

export const deleteSubtask = (id,taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/subtask/'+id, {
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
        dispatch({type: DELETE_SUBTASK, id});
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}
