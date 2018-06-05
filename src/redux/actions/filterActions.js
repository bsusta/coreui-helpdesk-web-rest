import { CLEAR_FILTER_TASKS, SET_FILTERED_TASKS, SET_FILTER, SET_FILTER_PAGE,SET_SHOW_FILTER, ADD_ERROR_MESSAGE,SET_FILTER_LOADING, SET_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS } from '../types';
import { TASKS_LIST, FILTERS_LIST } from '../urls';
import {processRESTinput,filterToFilterState ,filterBodyFromState} from '../../helperFunctions';

export const clearFilterTasks = () => {
 return (dispatch) => {
   dispatch({ type: CLEAR_FILTER_TASKS  });
 }
};

export const setFilterPage = (page) => {
 return (dispatch) => {
   dispatch({ type: SET_FILTER_PAGE,page });
 }
};

export const setShowFilter = (showFilter) => {
 return (dispatch) => {
   dispatch({ type: SET_SHOW_FILTER,showFilter });
 }
};

export const startFilterLoading = (filterLoaded)=>{
  return (dispatch) => {
     dispatch({ type: SET_FILTER_LOADING, filterLoaded });
   }
}

export const loadUnsavedFilter = (count,page,body,token) => {
 return (dispatch) => {
   fetch(TASKS_LIST+'?limit='+count+'&page='+page+'&order=title=>asc&'+body, {
     method: 'get',
     headers: {
       'Authorization': 'Bearer ' + token,
       'Content-Type': 'application/json'
     }
   }).then((response) =>{
   dispatch({type: LOWER_ACTIVE_REQUESTS});
     if(!response.ok){
       response.text().then((data)=>{
         dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
       });
       return;
     }
   response.json().then((data) => {
     dispatch({ type: SET_FILTERED_TASKS, tasks:data.data, numberOfPages:data.numberOfPages,total:data.total});
     });
 }).catch(function (error) {
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
       response.text().then((data)=>{
         dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
       });
       return;
     }
   response.json().then((data) => {
     });
 }
  ).catch(function (error) {
   dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
   console.log(error);
 });
 }
};

export const editFilter = (body,id,token) => {
 return (dispatch) => {
   fetch(FILTERS_LIST+'/'+id, {
     method: 'PUT',
     headers: {
       'Authorization': 'Bearer ' + token,
       'Content-Type': 'application/json'
     },
     body:JSON.stringify(body),
   }).then((response) =>{
     if(!response.ok){
       response.text().then((data)=>{
         dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
       });
       return;
     }
   response.json().then((data) => {
     });
 }
  ).catch(function (error) {
   dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
   console.log(error);
 });
 }
};


export const getUsersFilter = (taskAttributes,statuses,projects,users,tags,companies,token) => {
  return (dispatch) => {
      fetch(FILTERS_LIST+'/user-remembered', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      dispatch({type: LOWER_ACTIVE_REQUESTS});
        if(!response.ok){
          response.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
          });
          return;
        }
      response.json().then((data) => {
        if(data){
          let filterState = filterToFilterState(data.data,taskAttributes,statuses,projects,users,tags,companies);
          let body = filterBodyFromState(filterState,taskAttributes);
          dispatch({ type: SET_FILTER,body,filterState,page:1 });
          dispatch({ type: SET_FILTER_LOADING, filterLoaded:true });
        } else{
          dispatch({ type: SET_FILTER_LOADING, filterLoaded:true });
          dispatch({ type: CLEAR_FILTER_TASKS  });
        }
        dispatch({ type: SET_FILTER_LOADING, filterLoaded:true });
        //save as body and state
      });
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}

export const getFilter = (taskAttributes,statuses,projects,users,tags,companies,id,token) => {
  return (dispatch) => {
      fetch(FILTERS_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      dispatch({type: LOWER_ACTIVE_REQUESTS});
        if(!response.ok){
          response.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
          });
          return;
        }
      response.json().then((data) => {
        let filterState = filterToFilterState(data.data,taskAttributes,statuses,projects,users,tags,companies);
        let body = filterBodyFromState(filterState,taskAttributes);
        dispatch({ type: SET_FILTER,body,filterState,page:1 });
        dispatch({ type: SET_FILTER_LOADING, filterLoaded:true });
        return;
        //save as body and state
      });
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}

export const setFilterBody = (body,filterState,page)=>{
  return (dispatch) => {
     dispatch({ type: SET_FILTER,body,filterState,page });
   }
}

export const deleteFilter =(id, token)=>{
  return (dispatch) => {
      fetch(FILTERS_LIST+'/'+id+'/delete', {
        method: 'DELETE',
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
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}
