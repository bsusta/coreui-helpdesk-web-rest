import { SET_USERS,SET_USERS_LOADING, ADD_USER, SET_USER, SET_USER_LOADING, EDIT_USER, SET_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS, SET_USER_EMAIL_ERROR } from '../types';
import { USERS_LIST, IMAGE_UPLOAD, GET_LOC, GET_FILE } from '../urls';
import i18n from 'i18next';
import {processError} from '../../helperFunctions';

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
export const getUsers= (updateDate,token) => {
  return (dispatch) => {
    fetch(USERS_LIST+'/all'+(updateDate?'/'+updateDate:''), {
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
        dispatch({type: SET_USERS, users:data.data,updateDate:data.date.toString()});
        dispatch({ type: SET_USERS_LOADING, usersLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}

export const setUserEmailError = (userLoaded) => {
  return (dispatch) => {
    dispatch({ type: SET_USER_EMAIL_ERROR, userLoaded });
  }
};


/**
* Adds new user
* @param {object} body  All parameters in an object of the new user
* @param {string} token universal token for API comunication
*/
export const addUser = (body,company,role,image,afterSuccess,token) => {
  return (dispatch) => {
    if(image!==null){
      let formData = new FormData();
      formData.append("file", image);
      fetch(IMAGE_UPLOAD,{
        headers: {
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:formData,
      })
      .then((response)=>{
        if(!response.ok){
          processError(response,dispatch);
          return;
        }
        response.json().then((response)=>{
          body['image']=response.data.slug;
          fetch(USERS_LIST + '/user-role/' + role + '/company/' + company,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            method: 'POST',
            body:JSON.stringify(body),
          }).then((response)=>{
            if(!response.ok){
              if(response.status===409){
                dispatch({type: SET_USER_EMAIL_ERROR, nameError:true});
              }
              else{
                processError(response,dispatch);
              }
              return;
            }
            response.json().then((response)=>{
              dispatch({type: ADD_USER, user:response.data});
              afterSuccess();
            })})
            .catch(function (error) {
              dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
            });

          })})
          .catch(function (error) {
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
          });
        }
        else{
          fetch(USERS_LIST + '/user-role/' + role + '/company/' + company,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            method: 'POST',
            body:JSON.stringify(body),
          }).then((response)=>{
            if(!response.ok){
              if(response.status===409){
                dispatch({type: SET_USER_EMAIL_ERROR, nameError:true});
              }
              else{
                processError(response,dispatch);
              }
              return;
            }
            response.json().then((response)=>{
              dispatch({type: ADD_USER, user:response.data});
              afterSuccess();
            })})
            .catch(function (error) {
              dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
            });
          }
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
          dispatch({type: LOWER_ACTIVE_REQUESTS});
            if(!response.ok){
              processError(response,dispatch);
              return;
            }
            response.json().then((data) => {
              if(data.data.image){
                fetch(GET_LOC+data.data.image+'/download-location', {
                  method: 'get',
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  }
                }).then((response2)=>{
                  if(!response2.ok){
                    processError(response2,dispatch);
                    return;
                  }
                  response2.json().then((data2)=>{
                  fetch(GET_FILE+data2.data.fileDir+'/'+data2.data.fileName, {
                    method: 'get',
                    headers: {
                      'Authorization': 'Bearer ' + token,
                    }
                  }).then((response3) =>{
                    if(!response3.ok){
                      processError(response3,dispatch);
                      return;
                    }
                    let user = {...data.data};
                    user['image']=response3.url;
                    dispatch({type: SET_USER, user});
                  }).catch(function (error) {
                    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
                  });
                }).catch(function (error) {
                  dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
            });}
              ).catch(function (error) {
                dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
              });

            }
            else{
              dispatch({type: SET_USER, user:data.data});
            }
          });
        }
      ).catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });
    }
  }


  export const editProfile = (body,id,image,company,role,token) => {
    return (dispatch) => {
      i18n.changeLanguage(body.language);
      if(image===null){
        Promise.all([
          fetch(USERS_LIST + '/'+id+'/user-role/' + role + '/company/' + company, {
            method: 'put',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
          })]).then(([response1])=>{
            if(!response1.ok){
              processError(response1,dispatch);
              return;
            }
            Promise.all([response1.json()]).then(([response1])=>{
            dispatch({type: EDIT_USER, user:response1.data});
          })})
          .catch(function (error) {
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
            console.log(error);
          });
        }
        else{
          let formData = new FormData();
          formData.append("file", image);
          fetch(IMAGE_UPLOAD,{
            headers: {
              'Authorization': 'Bearer ' + token
            },
            method: 'POST',
            body:formData,
          })
          .then((response)=>{
            if(!response.ok){
              processError(response,dispatch);
              return;
            }
            response.json().then((response)=>{
              body['image']=response.data.slug;
              Promise.all([
                fetch(USERS_LIST + '/'+id+'/user-role/' + role + '/company/' + company, {
                  method: 'put',
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify(body)
                })]).then(([response1])=>{
                  if(!response1.ok){
                    processError(response1,dispatch);
                    return;
                  }
                  Promise.all([response1.json()]).then(([response1])=>{
                  dispatch({type: EDIT_USER, user:response1.data});
                })})
                .catch(function (error) {
                  dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
                  console.log(error);
                });

              })
              .catch(function (error) {
                dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
                console.log(error);
              });
            })
            .catch(function (error) {
              dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
                console.log(error);
            });

          }

        };
      };


  /**
  * Edits selected user
  * @param  {object}  body     data about user except for isActive
  * @param  {Boolean} isActive is active user parameter
  * @param  {int}  id       id of the user
  * @param  {string}  token    universal token for API comunication
  */

  export const editUser = (body,company,role,id,isActive,image,changeLanguage,token) => {
    return (dispatch) => {
      if(changeLanguage){
        i18n.changeLanguage(body.language);
      }
      if(image===null){
        Promise.all([
          fetch(USERS_LIST + '/'+id+'/user-role/' + role + '/company/' + company, {
            method: 'put',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
          }),
          fetch(USERS_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
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
            dispatch({type: EDIT_USER, user:{...response1.data,is_active:isActive}});
          })})
          .catch(function (error) {
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
            console.log(error);
          });
        }
        else{
          let formData = new FormData();
          formData.append("file", image);
          fetch(IMAGE_UPLOAD,{
            headers: {
              'Authorization': 'Bearer ' + token
            },
            method: 'POST',
            body:formData,
          })
          .then((response)=>{
            if(!response.ok){
              processError(response,dispatch);
              return;
            }
            response.json().then((response)=>{
              body['image']=response.data.slug;

              Promise.all([
                fetch(USERS_LIST + '/'+id+'/user-role/' + role + '/company/' + company, {
                  method: 'put',
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify(body)
                }),
                fetch(USERS_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
                  method: 'put',
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  }
                })]).then(([response1,response2])=>{
                  if(!response2.ok){
                    processError(response2,dispatch);
                    return;
                  }
                  if(!response1.ok){
                    processError(response1,dispatch);
                    return;
                  }
                  Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
                  dispatch({type: EDIT_USER, user:{...response1.data,is_active:isActive}});
                })})
                .catch(function (error) {
                  dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
                  console.log(error);
                });

              })
              .catch(function (error) {
                dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
                console.log(error);
              });
            })
            .catch(function (error) {
              dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
                console.log(error);
            });

          }

        };
      };
