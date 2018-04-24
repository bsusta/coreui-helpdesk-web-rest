import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT, TOKEN_CHECKED } from '../types';
import { LOGIN_URL, USERS_LIST } from '../urls';
import jwt_decode from 'jwt-decode';
import i18n from 'i18next';

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
           storeTokenToStorage(response.token);
           checkToken()(dispatch);
           return;
         }
         dispatch({ type: LOGIN_FAIL, error:JSONresponse.statusText });
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
          if(!response.ok){
            dispatch({ type: TOKEN_CHECKED });
            localStorage.removeItem("lansystems");
            return;
          }
          response.json().then((data) => {
            let user=data.data;
            i18n.changeLanguage(user.language);
            dispatch({
              type: LOGIN_SUCCESS,token,user
            });
            dispatch({ type: TOKEN_CHECKED });
          });
        }).catch(function (error) {
          dispatch({ type: TOKEN_CHECKED });
          localStorage.removeItem("lansystems");
          console.log(error);
        });
      }
      else{
        dispatch({ type: TOKEN_CHECKED });
      }

    };
  };
