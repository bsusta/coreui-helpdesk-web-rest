import { SET_MESSAGES,SET_MESSAGES_READ,DELETE_MESSAGE, SET_ERROR_MESSAGE, SET_TOP_MESSAGES, START_MESSAGES_LOADING, LOWER_ACTIVE_REQUESTS } from '../types';
import { NOTIFICATIONS_LIST } from '../urls';
import {processError} from '../../helperFunctions';

export const getMessages = (limit,page,token) => {
  return (dispatch) => {
      fetch(NOTIFICATIONS_LIST+'?limit='+limit+'&page='+page+'', {//& order=title=>asc
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
        dispatch({ type: SET_MESSAGES, messages:data.data, numberOfPages:data.numberOfPages });
      });
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}

export const getTopMessages = (token) => {
  return (dispatch) => {
      fetch(NOTIFICATIONS_LIST+'?limit=5&page=1', {//& order=title=>asc
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          processError(response,dispatch);
          return;
        }
      response.json().then((data) => {
        dispatch({ type: SET_TOP_MESSAGES, messages:data.data, count:data._counts['not read']});
      });
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}

export const startMessagesLoading = () => {
 return (dispatch) => {
   dispatch({ type: START_MESSAGES_LOADING });
 }
};

export const setMessageStatus = (messages,read,token) => {
 return (dispatch) => {
   fetch(NOTIFICATIONS_LIST+'/read/'+read,{
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + token
     },
     method: 'PUT',
     body:JSON.stringify({notifications:JSON.stringify(messages)}),
   })
 .then((response)=>{
   if(!response.ok){
     processError(response,dispatch);
   }
   dispatch({ type: SET_MESSAGES_READ, messages, read });
 })
 .catch(function (error) {
   dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
   console.log(error);
 });
 }
};

export const deleteMessage = (limit,page,ids, token) => {
 return (dispatch) => {
   fetch(NOTIFICATIONS_LIST+'/delete', {//& order=title=>asc
     method: 'delete',
     headers: {
       'Authorization': 'Bearer ' + token,
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({notifications:JSON.stringify(ids)}),
   }).then((response) =>{
     if(!response.ok){
       processError(response,dispatch);
       return;
     }
    getMessages(limit,page,token)(dispatch);
 }).catch(function (error) {
   dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
   console.log(error);
 });

 }
};
