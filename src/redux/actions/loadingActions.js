import { CLEAR_ERROR_MESSAGE,SET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGES, SET_ACTIVE_REQUESTS, ADD_ACTIVE_REQUESTS } from '../types';

export const clearErrorMessage = (errorID) => {
 return (dispatch) => {
   dispatch({ type: CLEAR_ERROR_MESSAGE, errorID });
 }
};

export const setActiveRequests = (activeRequests) => {
 return (dispatch) => {
   dispatch({ type: SET_ACTIVE_REQUESTS, activeRequests });
 }
};

export const addActiveRequests = (activeRequests) => {
 return (dispatch) => {
   dispatch({ type: ADD_ACTIVE_REQUESTS, activeRequests });
 }
};

export const clearErrors = () => {
 return (dispatch) => {
   dispatch({ type: CLEAR_ERROR_MESSAGES });
 }
};
