import { SET_ITEMS,SET_ITEMS_LOADING, ADD_ITEM, EDIT_ITEM,DELETE_ITEM, SET_ERROR_MESSAGE, ADD_ERROR_MESSAGE } from '../types';
import { TASKS_LIST } from '../urls';

/**
 * Sets status if items are loaded to false
 */
export const startItemsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_ITEMS_LOADING, itemsLoaded:false });
  }
};

/**
 * Gets all items available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getItems= (taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/invoiceable-items', {
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
        dispatch({type: SET_ITEMS, items:data.data});
        dispatch({ type: SET_ITEMS_LOADING, itemsLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
  }
}
/**
 * Adds new item
 * @param {object} body  All parameters in an object of the new item
 * @param {string} token universal token for API comunication
 */

export const addItem = (body,unitID,taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/invoiceable-items/unit/'+unitID,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
      if(!response.ok){
        response.text().then((data)=>{
          dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
        });
        return;
      }
    response.json().then((response)=>{
      dispatch({type: ADD_ITEM, item:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

export const editItem = (body,itemID,unitID,taskID,token) => {
  return (dispatch) => {
        fetch(TASKS_LIST+'/'+taskID+'/invoiceable-items/'+itemID+'/unit/'+unitID, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }).then((response)=>{
          if(!response.ok){
            response.text().then((data)=>{
              dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
            });
            return;
          }
          response.json().then((response)=>{
          dispatch({type: EDIT_ITEM, item:response.data});
        })})
        .catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
      });
  };
};

export const deleteItem = (id,taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/invoiceable-items/'+id, {
        method: 'delete',
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
        dispatch({type: DELETE_ITEM, id});
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}
