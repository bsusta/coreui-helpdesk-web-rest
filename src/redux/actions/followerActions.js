import { SET_FOLLOWERS, SET_FOLLOWERS_LOADING, ADD_FOLLOWER, DELETE_FOLLOWER, SET_ERROR_MESSAGE } from '../types';
import { TASKS_LIST } from '../urls';

/**
 * Sets status if followers are loaded to false
 */
export const startFollowersLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_FOLLOWERS_LOADING, followersLoaded:false });
  }
};

/**
 * Gets all followers available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getFollowers= (taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/follower', {
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
        dispatch({type: SET_FOLLOWERS, followers:data.data});
        dispatch({ type: SET_FOLLOWERS_LOADING, followersLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}

/**
 * Adds new follower
 * @param {object} body  All parameters in an object of the new follower
 * @param {string} token universal token for API comunication
 */
export const addFollower = (userID,taskID,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/add-follower/'+userID,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'PUT',
      })
    .then((response)=>{
      if(!response.ok){
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
        return;
      }
    response.json().then((response)=>{
      dispatch({type: ADD_FOLLOWER, follower:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  };
};

export const deleteFollower = (userID,taskID,token) => {
  return (dispatch) => {
    fetch(TASKS_LIST+'/'+taskID+'/remove-follower/'+userID,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'PUT',
    })
  .then((response)=>{
    if(!response.ok){
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
      return;
    }
    dispatch({ type: DELETE_FOLLOWER,id: userID });
  })
  .catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });

  }
};
