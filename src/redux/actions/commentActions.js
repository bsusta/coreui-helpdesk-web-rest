import { SET_COMMENTS,SET_COMMENTS_LOADING, ADD_COMMENT, EDIT_COMMENT,DELETE_COMMENT } from '../types';
import { TASKS_LIST } from '../urls';

/**
 * Sets status if comments are loaded to false
 */
export const startCommentsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_COMMENTS_LOADING, commentsLoaded:false });
  }
};

/**
 * Gets all comments available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getComments= (taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/comments', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_COMMENTS, comments:data.data});
        dispatch({ type: SET_COMMENTS_LOADING, commentsLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
  }
}
/**
 * Adds new comment
 * @param {object} body  All parameters in an object of the new comment
 * @param {string} token universal token for API comunication
 */

export const addComment = (body,taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/add-comment',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
    response.json().then((response)=>{
      dispatch({type: ADD_COMMENT, comment:response.data});
    })})
    .catch(function (error) {
      console.log(error);
    });

  };
};

export const editComment = (body,commentID,unitID,taskID,token) => {
  return (dispatch) => {
        fetch(TASKS_LIST+'/'+taskID+'/comments/'+commentID+'/unit/'+unitID, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }).then((response)=>response.json().then((response)=>{
          dispatch({type: EDIT_COMMENT, comment:response.data});
        }))
        .catch(function (error) {
          console.log(error);
      });
  };
};

export const deleteComment = (id,taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/comments/'+id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        dispatch({type: DELETE_COMMENT, id});
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}
