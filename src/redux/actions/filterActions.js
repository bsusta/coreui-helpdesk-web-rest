import { SET_FILTERS, SET_ERROR_MESSAGE } from '../types';
import { TASKS_LIST, FILTERS_LIST } from '../urls';
import {processRESTinput} from '../../helperFunctions';

export const clearFilterTasks = () => {
 return (dispatch) => {
   dispatch({ type: SET_FILTERS, tasks:[], filterID:null, numberOfPages:1 });
 }
};

export const loadUnsavedFilter = (count,page,token,body,originalBody) => {
  body.addedParameters=processRESTinput(body.addedParameters);
 return (dispatch) => {
   fetch(TASKS_LIST+'?limit='+count+'&page='+page+'&order=title=>asc&'+processRESTinput(body), {
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
     dispatch({ type: SET_FILTERS, tasks:data.data, filterID:'id',body, numberOfPages:data.numberOfPages,originalBody});
     });
 }
  ).catch(function (error) {
   dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
   console.log(error);
 });
 }
};

export const createFilter = (body,token) => {
 return (dispatch) => {
   fetch(FILTERS_LIST, {
     method: 'POST',
     headers: {
       'Authorization': 'Bearer ' + token,
       'Content-Type': 'application/json'
     },
     body:JSON.stringify(body),
   }).then((response) =>{
     if(!response.ok){
       dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
       return;
     }
   response.json().then((data) => {
     console.log(data);
     });
 }
  ).catch(function (error) {
   dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
   console.log(error);
 });
 }
};
