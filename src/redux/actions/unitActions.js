import { SET_UNITS,SET_UNITS_LOADING, ADD_UNIT, SET_UNIT, SET_UNIT_LOADING, EDIT_UNIT, SET_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS } from '../types';
import { UNITS_LIST } from '../urls';
import {processError} from '../../helperFunctions';

/**
 * Sets status if units are loaded to false
 */
export const startUnitsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_UNITS_LOADING, unitsLoaded:false });
  }
};

/**
 * Gets all units available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getTaskUnits= (token) => {
  return (dispatch) => {
      fetch(UNITS_LIST+'/all', {
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
        dispatch({type: SET_UNITS, units:data.data});
        dispatch({ type: SET_UNITS_LOADING, unitsLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}

/**
 * Gets all units available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getUnits= (token) => {
  return (dispatch) => {
      fetch(UNITS_LIST+'?limit=999', {
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
        dispatch({type: SET_UNITS, units:data.data});
        dispatch({ type: SET_UNITS_LOADING, unitsLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}
/**
 * Adds new unit
 * @param {object} body  All parameters in an object of the new unit
 * @param {string} token universal token for API comunication
 */
export const addUnit = (body,token) => {
  return (dispatch) => {
      fetch(UNITS_LIST,{
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
      dispatch({type: ADD_UNIT, unit:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

/**
 * Sets status if unit is loaded to false
 */
export const startUnitLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_UNIT_LOADING, unitLoaded:false });
  }
};

/**
 * Gets one unit that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the unit that we want to load
 */
export const getUnit = (id,token) => {
  return (dispatch) => {
      fetch(UNITS_LIST+'/'+id, {
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
        dispatch({type: SET_UNIT, unit:data.data});
        dispatch({ type: SET_UNIT_LOADING, unitLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}

/**
 * Edits selected unit
 * @param  {object}  body     data about unit except for isActive
 * @param  {Boolean} isActive is active unit parameter
 * @param  {int}  id       id of the unit
 * @param  {string}  token    universal token for API comunication
 */
export const editUnit = (body,isActive,id,token) => {
  return (dispatch) => {

      Promise.all([
        fetch(UNITS_LIST+'/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }),
        fetch(UNITS_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        })]).then(([response1,response2])=>{
          if(!response1.ok){
            processError(response1,dispatch);
            return;
          }
          if(!response2.ok){
            processError(response2,dispatch);
            return;
          }
          Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
          dispatch({type: EDIT_UNIT, unit:{...response1.data,is_active:isActive}});
        })})
        .catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
          console.log(error);
      });

  };
};
