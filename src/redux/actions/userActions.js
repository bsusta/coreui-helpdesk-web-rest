import { SET_USERS,SET_USERS_LOADING, ADD_USER, SET_USER, SET_USER_LOADING, EDIT_USER } from '../types';
import { USERS_LIST, IMAGE_UPLOAD, GET_IMAGE_LOC, GET_IMAGE } from '../urls';

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
      response.json().then((data) => {
        dispatch({type: SET_USERS, users:data.data,updateDate:data.date.toString()});
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
export const addUser = (body,company,role,image,token) => {
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
            response.json().then((response)=>{
              dispatch({type: ADD_USER, user:response.data});
            })})
            .catch(function (error) {
              console.log(error);
            });

          })})
          .catch(function (error) {
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
            response.json().then((response)=>{
              dispatch({type: ADD_USER, user:response.data});
            })})
            .catch(function (error) {
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
            response.json().then((data) => {
              if(data.data.image){
                fetch(GET_IMAGE_LOC+data.data.image+'/download-location', {
                  method: 'get',
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  }
                }).then((response2)=>response2.json().then((data2)=>{
                  console.log('Bearer ' + token);
                  fetch(GET_IMAGE+data2.data.fileDir+'/'+data2.data.fileName, {
                    method: 'get',
                    headers: {
                      'Authorization': 'Bearer ' + token,
                    }
                  }).then((response3) =>response3.json().then((data3)=>{
                    console.log('response3');
                    console.log(data3);
                    let user = {...data.data};
                    user['image']=data3;
                    dispatch({type: SET_USER, user});
                  })).catch(function (error) {
                    console.log(error);
                  });
                }).catch(function (error) {
                  console.log(error);
                })
              ).catch(function (error) {
                console.log(error);
              });

            }
            else{
              dispatch({type: SET_USER, user:data.data});
            }
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

  export const editUser = (body,company,role,id,isActive,image,token) => {
    return (dispatch) => {
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
          })]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
            dispatch({type: EDIT_USER, user:{...response1.data,is_active:isActive}});
          }))
          .catch(function (error) {
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
                })]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
                  dispatch({type: EDIT_USER, user:{...response1.data,is_active:isActive}});
                }))
                .catch(function (error) {
                  console.log(error);
                });

              })
              .catch(function (error) {
                console.log(error);
              });
            })
            .catch(function (error) {
              console.log(error);
            });

          }

        };
      };
