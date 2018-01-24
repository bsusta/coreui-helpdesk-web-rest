import { SET_USERS,SET_USERS_LOADING, ADD_USER, SET_USER, SET_USER_LOADING, EDIT_USER } from '../types';
import { USERS_LIST } from '../urls';

/**
 * Sets status if users are loaded to false
 */
export const startUsersLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_USERS_LOADING, usersLoaded:false });
  }
};

/**
 * Gets all users available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getUsers= (limit,page,token) => {
  return (dispatch) => {
      fetch(USERS_LIST+'?limit='+limit+'&page='+page, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        let links=data._links;
        links['numberOfPages']=data.numberOfPages;
        dispatch({type: SET_USERS, users:data.data,links});
        dispatch({ type: SET_USERS_LOADING, usersLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}
/**
 * Adds new user
 * @param {object} body  All parameters in an object of the new user
 * @param {string} token universal token for API comunication
 */
export const addUser = (body,company,role,token) => {
  return (dispatch) => {
      fetch(USERS_LIST + '/user-role/' + role + '/company/' + company,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
    response.json().then((response)=>{
      dispatch({type: ADD_USER, user:response.data});
    })})
    .catch(function (error) {
      console.log(error);
    });

  };
};

/**
 * Sets status if user is loaded to false
 */
export const startUserLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_USER_LOADING, userLoaded:false });
  }
};

/**
 * Gets one user that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the user that we want to load
 */
export const getUser = (id,token) => {
  return (dispatch) => {
      fetch(USERS_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_USER, user:data.data});
        dispatch({ type: SET_USER_LOADING, userLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}

/**
 * Edits selected user
 * @param  {object}  body     data about user except for isActive
 * @param  {Boolean} isActive is active user parameter
 * @param  {int}  id       id of the user
 * @param  {string}  token    universal token for API comunication
 */
 export const editUser = (body,company,role,id,token) => {
   return (dispatch) => {
       fetch(USERS_LIST + '/'+id+'/user-role/' + role + '/company/' + company,{
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
         },
         method: 'PUT',
         body:JSON.stringify(body),
       })
     .then((response)=>{
     response.json().then((response)=>{
       dispatch({type: ADD_USER, user:response.data});
     })})
     .catch(function (error) {
       console.log(error);
     });

   };
 };
