import { CLEAR_ERROR_MESSAGE,SET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGES } from '../types';

export const clearErrorMessage = (errorID) => {
 return (dispatch) => {
   dispatch({ type: CLEAR_ERROR_MESSAGE, errorID });
 }
};

export const clearErrors = () => {
 return (dispatch) => {
   dispatch({ type: CLEAR_ERROR_MESSAGES });
 }
};
