import { SET_MESSAGES,SET_MESSAGES_READ,DELETE_MESSAGE, SET_ERROR_MESSAGE, ADD_ERROR_MESSAGE, SET_TOP_MESSAGES, START_MESSAGES_LOADING } from '../types';
import { NOTIFICATIONS_LIST } from '../urls';

export const getMessages = (limit,page,token) => {
  return (dispatch) => {
      fetch(NOTIFICATIONS_LIST+'?limit='+limit+'&page='+page+'', {//& order=title=>asc
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
          response.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
          });
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
     response.text().then((data)=>{
       dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
     });
   }
   dispatch({ type: SET_MESSAGES_READ, messages, read });
 })
 .catch(function (error) {
   dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
   console.log(error);
 });
 }
};

export const deleteMessage = (id) => {
 return (dispatch) => {
   dispatch({ type: DELETE_MESSAGE, id });
 }
};
