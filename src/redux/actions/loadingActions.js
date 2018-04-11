import { CLEAR_ERROR_MESSAGE,SET_ERROR_MESSAGE } from '../types';

export const clearErrorMessage = (errorID) => {
 return (dispatch) => {
   dispatch({ type: CLEAR_ERROR_MESSAGE, errorID });
 }
};
