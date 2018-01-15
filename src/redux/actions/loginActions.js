import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOGOUT } from '../types';
import { LOGIN_URL } from '../urls';
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
           dispatch({
             type: LOGIN_SUCCESS,token:response.token,user
           });
         }
         else{
           dispatch({ type: LOGIN_FAIL });
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
     dispatch({ type: LOGIN_LOGOUT });
   }
 };
