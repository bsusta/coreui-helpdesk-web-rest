import { SET_UNITS,SET_UNITS_LOADING } from '../types';
import { UNITS_LIST } from '../urls';

export const startUnitsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_UNITS_LOADING, unitsLoaded:false });
  }
};

export const getUnits= (token) => {
  return (dispatch) => {
      fetch(UNITS_LIST, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        console.log(response);
      response.json().then((data) => {
        dispatch({type: SET_UNITS, units:data.data});
        dispatch({ type: SET_UNITS_LOADING, unitsLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}

export const addUnit = (body,token) => {
  return (dispatch) => {
      fetch(UNITS_LIST,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
    response.json().then((response)=>{
      //dispatch({type: ADD_USER, payload:{user:response.data}});
    })})
    .catch(function (error) {
      console.log(error);
    });

  };
};
