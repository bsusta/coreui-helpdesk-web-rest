import { SET_FILTERS } from '../types';

export const setFilter = (body,token) => {
 return (dispatch) => {
   dispatch({ type: SET_FILTERS, tasks:[], filterID:'id' });
 }
};

export const clearFilterTasks = () => {
 return (dispatch) => {
   dispatch({ type: SET_FILTERS, tasks:[], filterID:null });
 }
};
