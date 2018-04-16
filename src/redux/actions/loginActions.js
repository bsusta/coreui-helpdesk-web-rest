import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT, TOKEN_CHECKED } from '../types';
import { LOGIN_URL, USERS_LIST } from '../urls';
import jwt_decode from 'jwt-decode';

export const loginUser = (username, password) => {
   return (dispatch) => {
     dispatch({ type: LOGIN_START });
     fetch(LOGIN_URL, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({username,password})
     }).then((JSONresponse) => {
       JSONresponse.json().then((response)=>{
         if(JSONresponse.ok){
           let user=jwt_decode(response.token);
           storeTokenToStorage(response.token);
           dispatch({
             type: LOGIN_SUCCESS,token:response.token,user
           });
         }
         else{
           console.log(JSONresponse);
           dispatch({ type: LOGIN_FAIL, error:JSONresponse.statusText });
         }
       });
     })
     .catch(function (error) {
       console.log(error);
       dispatch({ type: LOGIN_FAIL });
     });
   };
 };

export const logoutUser = () => {
   return (dispatch) => {
     localStorage.removeItem('lansystems');
     dispatch({ type: LOGIN_LOGOUT });
   }
 };

 const storeTokenToStorage = (token) => {
   localStorage.setItem("lansystems", token);
 };


 export const checkToken = () => {
    return (dispatch) => {
      let token = localStorage.getItem("lansystems");
      if(token){
        fetch(USERS_LIST+'/'+jwt_decode(token).id, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then((response)=>{
          if(response.ok){
            let user=jwt_decode(token);
            dispatch({
              type: LOGIN_SUCCESS,token,user
            });
          }
          else{
            localStorage.removeItem("lansystems");
          }
          dispatch({ type: TOKEN_CHECKED });
        });
      }
      else{
        dispatch({ type: TOKEN_CHECKED });
      }

    };
  };
