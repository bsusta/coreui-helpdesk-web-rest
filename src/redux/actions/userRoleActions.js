import { SET_USER_ROLES,SET_USER_ROLES_LOADING, ADD_USER_ROLE, SET_USER_ROLE, SET_USER_ROLE_LOADING, EDIT_USER_ROLE } from '../types';
import { USER_ROLES_LIST } from '../urls';

/**
 * Sets status if userRoles are loaded to false
 */
export const startUserRolesLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_USER_ROLES_LOADING, userRolesLoaded:false });
  }
};

/**
 * Gets all userRoles available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getUserRoles= (token) => {
  return (dispatch) => {
      fetch(USER_ROLES_LIST+'?limit=999', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_USER_ROLES, userRoles:data.data});
        dispatch({ type: SET_USER_ROLES_LOADING, userRolesLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}
