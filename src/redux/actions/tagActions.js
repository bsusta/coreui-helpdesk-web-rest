import { SET_TAGS,SET_TAGS_LOADING, ADD_TAG, SET_TAG, SET_TAG_LOADING, EDIT_TAG, DELETE_TAG, SET_ERROR_MESSAGE,ADD_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS } from '../types';
import { TAGS_LIST } from '../urls';
import {processError} from '../../helperFunctions';

/**
 * Sets status if tags are loaded to false
 */
export const startTagsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_TAGS_LOADING, tagsLoaded:false });
  }
};

/**
 * Gets all tags available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getTags= (token) => {
  return (dispatch) => {
      fetch(TAGS_LIST+'/all', {
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
        dispatch({type: SET_TAGS, tags:data.data});
        dispatch({ type: SET_TAGS_LOADING, tagsLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}
/**
 * Adds new tag
 * @param {object} body  All parameters in an object of the new tag
 * @param {string} token universal token for API comunication
 */
export const addTag = (body,token) => {
  return (dispatch) => {
      fetch(TAGS_LIST,{
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
      dispatch({type: ADD_TAG, tag:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

/**
 * Sets status if tag is loaded to false
 */
export const startTagLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_TAG_LOADING, tagLoaded:false });
  }
};

/**
 * Gets one tag that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the tag that we want to load
 */
export const getTag = (id,token) => {
  return (dispatch) => {
      fetch(TAGS_LIST+'/'+id, {
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
        dispatch({type: SET_TAG, tag:data.data});
        dispatch({ type: SET_TAG_LOADING, tagLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}

/**
 * Edits selected tag
 * @param  {object}  body     data about tag except for isActive
 * @param  {Boolean} isActive is active tag parameter
 * @param  {int}  id       id of the tag
 * @param  {string}  token    universal token for API comunication
 */
export const editTag = (body,id,token) => {
  return (dispatch) => {

        fetch(TAGS_LIST+'/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }).then((response)=>{
          if(!response.ok){
            processError(response,dispatch);
            return;
          }
          response.json().then((response)=>{
          dispatch({type: EDIT_TAG, tag:response.data});
        })})
        .catch(function (error) {
          console.log(error);
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      });

  };
};

export const deleteTag = (id,token) => {
  return (dispatch) => {
      fetch(TAGS_LIST+'/'+id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          processError(response,dispatch);
          return;
        }
        dispatch({type: DELETE_TAG, id});
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}
