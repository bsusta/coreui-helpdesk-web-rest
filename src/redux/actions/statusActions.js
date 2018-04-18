import { SET_STATUSES,SET_STATUSES_LOADING, ADD_STATUS, SET_STATUS, SET_STATUS_LOADING, EDIT_STATUS, SET_ERROR_MESSAGE } from '../types';
import { STATUSES_LIST } from '../urls';

/**
 * Sets status if statuses are loaded to false
 */
export const startStatusesLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_STATUSES_LOADING, statusesLoaded:false });
  }
};


export const getStatuses= (updateDate,token) => {
  return (dispatch) => {
      fetch(STATUSES_LIST+'?limit=999', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      }).then((response) =>{
        if(!response.ok){
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
          return;
        }
      response.json().then((data) => {
        dispatch({type: SET_STATUSES, statuses:data.data,updateDate});
        dispatch({ type: SET_STATUSES_LOADING, statusesLoaded:true });
      });
    })
  }
}


/**
 * Gets all statuses available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getTaskStatuses= (updateDate,token) => {
  return (dispatch) => {
    console.log(STATUSES_LIST+'/all'+(updateDate?'/'+updateDate:''));
      fetch(STATUSES_LIST+'/all'+(updateDate?'/'+updateDate:''), {
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
        dispatch({type: SET_STATUSES, statuses:data.data,updateDate:data.date.toString()});
        dispatch({ type: SET_STATUSES_LOADING, statusesLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}
/**
 * Adds new status
 * @param {object} body  All parameters in an object of the new status
 * @param {string} token universal token for API comunication
 */
export const addStatus = (body,token) => {
  return (dispatch) => {
      fetch(STATUSES_LIST,{
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
    })
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

/**
 * Sets status if status is loaded to false
 */
export const startStatusLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_STATUS_LOADING, statusLoaded:false });
  }
};

/**
 * Gets one status that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the status that we want to load
 */
export const getStatus = (token,id) => {
  return (dispatch) => {
      fetch(STATUSES_LIST+'/'+id, {
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
        dispatch({type: SET_STATUS, status:data.data});
        dispatch({ type: SET_STATUS_LOADING, statusLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}

/**
 * Edits selected status
 * @param  {object}  body     data about status except for isActive
 * @param  {Boolean} isActive is active status parameter
 * @param  {int}  id       id of the status
 * @param  {string}  token    universal token for API comunication
 */
export const editStatus = (body,id,isActive,token) => {
  return (dispatch) => {

      Promise.all([
        fetch(STATUSES_LIST+'/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }),
        fetch(STATUSES_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
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
          dispatch({type: EDIT_STATUS, status:{...response1.data,is_active:isActive}});
        })})
        .catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
      });

  };
};
