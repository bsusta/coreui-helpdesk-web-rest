import { SET_USER_ROLES,SET_USER_ROLES_LOADING, ADD_USER_ROLE, SET_USER_ROLE, SET_USER_ROLE_LOADING, EDIT_USER_ROLE, SET_ERROR_MESSAGE,ADD_ERROR_MESSAGE } from '../types';
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
      if(!response.ok){
        response.text().then((data)=>{
          dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
        });
        return;
      }
      response.json().then((data) => {
        dispatch({type: SET_USER_ROLES, userRoles:data.data});
        dispatch({ type: SET_USER_ROLES_LOADING, userRolesLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
  });
}
}

/**
* Adds new userRole
* @param {object} body  All parameters in an object of the new userRole
* @param {string} token universal token for API comunication
*/
export const addUserRole = (body,token) => {
  return (dispatch) => {
    fetch(USER_ROLES_LIST,{
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
        dispatch({type: ADD_USER_ROLE, userRole:response.data});
      })})
      .catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });

    };
  };

  /**
  * Sets status if userRole is loaded to false
  */
  export const startUserRoleLoading = () => {
    return (dispatch) => {
      dispatch({ type: SET_USER_ROLE_LOADING, userRoleLoaded:false });
    }
  };

  /**
  * Gets one userRole that was selected
  * @param  {string} token universal token for API comunication
  * @param  {int} id    interger, that is ID of the userRole that we want to load
  */
  export const getUserRole = (id,token) => {
    return (dispatch) => {
      fetch(USER_ROLES_LIST+'/'+id, {
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
          dispatch({type: SET_USER_ROLE, userRole:data.data});
          dispatch({ type: SET_USER_ROLE_LOADING, userRoleLoaded:true });
        });
      }
    ).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
    });
  }
}

/**
* Edits selected userRole
* @param  {object}  body     data about userRole except for isActive
* @param  {Boolean} isActive is active userRole parameter
* @param  {int}  id       id of the userRole
* @param  {string}  token    universal token for API comunication
*/
export const editUserRole = (body,isActive,id,token) => {
  return (dispatch) => {

    Promise.all([
      fetch(USER_ROLES_LIST+'/'+id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
      }),
      fetch(USER_ROLES_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })]).then(([response1,response2])=>{
        if(!response1.ok){
          response1.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response1.statusText+ JSON.parse(data).message });
          });
          return;
        }
        if(!response2.ok){
          response2.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response2.statusText+ JSON.parse(data).message });
          });
          return;
        }
        Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
        dispatch({type: EDIT_USER_ROLE, userRole:{...response1.data,is_active:isActive}});
      })})
      .catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });

    };
  };
