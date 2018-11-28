import {
  CLEAR_REPORT_TASKS,
  SET_REPORT_TASKS,
  SET_REPORT,
  SET_REPORT_PAGE,
  SET_SHOW_REPORT,
  SET_REPORT_LOADING,
  SET_REPORT_ORDER,
  SET_REPORT_BODY,
  SET_REPORT_FORCE_UPDATE,
  SET_ERROR_MESSAGE,
  LOWER_ACTIVE_REQUESTS
 } from '../types';
import { TASKS_LIST, FILTERS_LIST } from '../urls';
import {processError,processRESTinput,filterToFilterState ,filterBodyFromState,createEmptyFilterBody} from '../../helperFunctions';
import {getSidebar} from './sidebarActions';

export const clearReportTasks = () => {
 return (dispatch) => {
   dispatch({ type: CLEAR_REPORT_TASKS  });
 }
};

export const setReportOrder = (order) => {
 return (dispatch) => {
   dispatch({ type: SET_REPORT_BODY, order  });
 }
};

export const setReportPage = (page) => {
 return (dispatch) => {
   dispatch({ type: SET_REPORT_BODY,page });
 }
};

export const setShowReport = (showFilter) => {
 return (dispatch) => {
   dispatch({ type: SET_SHOW_REPORT,showFilter });
 }
};

export const setReportForceUpdate = (forceUpdate) => {
 return (dispatch) => {
   dispatch({ type: SET_REPORT_FORCE_UPDATE,forceUpdate });
 }
};

export const startReportLoading = (reportLoaded)=>{
  return (dispatch) => {
     dispatch({ type: SET_REPORT_LOADING, reportLoaded });
   }
}

export const loadUnsavedReport = (body,taskAttributes,token) => {
 return (dispatch) => {
   fetch(TASKS_LIST+'?report=true&limit=998&page='+body.page+'&'+body.order+(body.body?('&'+filterBodyFromState(body.body,taskAttributes)):""), {
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
     dispatch({ type: SET_REPORT_TASKS, tasks:data.data, numberOfPages:data.numberOfPages,total:data.total});
     });
 }).catch(function (error) {
   dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
   console.log(error);
 });
 }
};

export const createReport = (body,token) => {
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

export const editReport = (body,id,token) => {
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

export const getUsersReport = (taskAttributes,statuses,projects,users,tags,companies,body,token) => {
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
          //console.log('failed');
          //processError(response,dispatch);
          return;
        }
      response.json().then((data) => {
        let newBody;
        if(data){
          newBody = filterToReportState(data.data,taskAttributes,statuses,projects,users,tags,companies);
        }else{
          newBody = createEmptyFilterBody();
        }
        newBody.title=body.search;
        loadUnsavedReport({...body,body:newBody},taskAttributes,token)(dispatch);
        //console.log('user report set the body');
        dispatch({ type: SET_REPORT_BODY,body:newBody,page:body.page });
        dispatch({ type: SET_REPORT_LOADING, reportLoaded:true });
        //save as body and state
      });
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}


export const getReport = (taskAttributes,statuses,projects,users,tags,companies,history,body,token) => {
  return (dispatch) => {
      fetch(FILTERS_LIST+'/'+body.reportID, {
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
        let newBody = filterToFilterState(data.data,taskAttributes,statuses,projects,users,tags,companies);
        loadUnsavedReport({...body,body:newBody},taskAttributes,token)(dispatch);
        dispatch({ type: SET_REPORT_BODY,...body,body:newBody,report:data.data,page:body.page });
        dispatch({ type: SET_REPORT_LOADING, reportLoaded:true });
        return;
        //save as body and state
      });
    }).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}

export const setReportBody = (body, partial)=>{
  return (dispatch) => {
    //console.log('function set the body');
     dispatch({ type: SET_REPORT_BODY,...body,partial });
   }
}

export const deleteReport =(id,ACL, token)=>{
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
