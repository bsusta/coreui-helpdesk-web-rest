import { CLEAR_FILTER_TASKS, SET_FILTERED_TASKS, SET_FILTER, SET_FILTER_PAGE,SET_SHOW_FILTER,SET_FILTER_LOADING, SET_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS, SET_FILTER_ORDER, SET_UPDATE_AT,
  SET_FILTER_BODY, ADD_TO_FILTER_BODY } from '../types';
import { TASKS_LIST, FILTERS_LIST } from '../urls';
import {processError,processRESTinput,filterToFilterState ,filterBodyFromState} from '../../helperFunctions';
import {getSidebar} from './sidebarActions';

export const clearFilterTasks = () => {
 return (dispatch) => {
   dispatch({ type: CLEAR_FILTER_TASKS  });
 }
};

export const setFilterOrder = (order) => {
 return (dispatch) => {
   dispatch({ type: SET_FILTER_BODY, order  });
 }
};

export const setFilterPage = (page) => {
 return (dispatch) => {
   dispatch({ type: SET_FILTER_BODY,page });
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

export const loadUnsavedFilter = (body,taskAttributes,token) => {
 return (dispatch) => {
   fetch(TASKS_LIST+'?limit='+body.count+'&page='+body.page+'&'+body.order+'&'+filterBodyFromState(body.body,taskAttributes), {
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
       processError(response,dispatch);
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
       processError(response,dispatch);
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

export const getUsersFilter = (taskAttributes,statuses,projects,users,tags,companies,body,token) => {
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
          console.log('failed');
          //processError(response,dispatch);
          return;
        }
      response.json().then((data) => {
        if(data){
          let body = filterToFilterState(data.data,taskAttributes,statuses,projects,users,tags,companies);
          if(project){
            body['projects']=[projects.find((item)=>item.id===project.id)];
          }
          dispatch({ type: SET_FILTER_BODY,body,page:1 });
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


export const getFilter = (taskAttributes,statuses,projects,users,tags,companies,history,token) => {
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
          processError(response,dispatch,history);
          return;
        }
      response.json().then((data) => {
        let body = filterToFilterState(data.data,taskAttributes,statuses,projects,users,tags,companies);
        dispatch({ type: SET_FILTER_BODY,body,filter:data.data,page:1 });
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

export const setFilterBody = (body, partial)=>{
  return (dispatch) => {
     dispatch({ type: SET_FILTER_BODY,...body,partial });
   }
}

export const deleteFilter =(id,ACL, token)=>{
  return (dispatch) => {
      fetch(FILTERS_LIST+'/'+id+'/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          processError(response,dispatch);
          return;
        }
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}
