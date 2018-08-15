import { CLEAR_FILTER_TASKS, SET_FILTERED_TASKS, SET_FILTER, SET_FILTER_PAGE,SET_SHOW_FILTER,SET_FILTER_LOADING, SET_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS, SET_FILTER_ORDER, SET_UPDATE_AT } from '../types';
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
   dispatch({ type: SET_FILTER_ORDER, order  });
 }
};

export const changeUpdateAt = () => {
 return (dispatch) => {
   dispatch({ type: SET_UPDATE_AT, updateAt:(new Date()).getTime()  });
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

export const loadUnsavedFilter = (count,page,body,order,token) => {
 return (dispatch) => {
   fetch(TASKS_LIST+'?limit='+count+'&page='+page+'&'+order+'&'+body, {
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

export const getUsersFilter = (taskAttributes,statuses,projects,users,tags,companies,project,params,order,token) => {
  return (dispatch) => {
      dispatch({ type: CLEAR_FILTER_TASKS  });
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
          console.log('there are data');
          let filterState = filterToFilterState(data.data,taskAttributes,statuses,projects,users,tags,companies);
          if(project){
            filterState['projects']=[projects.find((item)=>item.id===project.id)];
          }
          let body = filterBodyFromState(filterState,taskAttributes);
          dispatch({ type: SET_FILTER,body,filterState,page:1 });
          dispatch({ type: SET_FILTER_LOADING, filterLoaded:true });
        } else{
          if(project){
            dispatch({ type: SET_FILTER,body:'project='+ project.id,filterState:{projects:[projects.find((item)=>item.id===project.id)]},page:1 });
            console.log('this is done');
            console.log(project);
          }else{
            loadUnsavedFilter(params.count?params.count:20,params.page?params.page:1,'',order,token)(dispatch);
          }
          dispatch({ type: SET_FILTER_LOADING, filterLoaded:true });
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


export const getFilter = (taskAttributes,statuses,projects,users,tags,companies,id,history,project,token) => {
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
        let filterState = filterToFilterState(data.data,taskAttributes,statuses,projects,users,tags,companies);
        if(project){
          filterState['projects']=[projects.find((item)=>item.id===project.id)];
        }
        let body = filterBodyFromState(filterState,taskAttributes);
        dispatch({ type: SET_FILTER,body,filterState,filter:data.data,page:1 });
        console.log('trough filter set body');
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
     console.log('functionally changed body');
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
        getSidebar(null,ACL,token)(dispatch);
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}
