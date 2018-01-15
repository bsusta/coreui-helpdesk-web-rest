import { SET_UNITS,SET_UNITS_LOADING } from '../types';
import { UNITS_LIST } from '../urls';
import axios from 'axios';

export const startUnitsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_UNITS_LOADING, unitsLoaded:false });
  }
};

export const getUnits= (token) => {
  return (dispatch) => {
        axios.get(
        UNITS_LIST,
        {
          headers: {
          "Authorization": `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpZCI6MjQxMCwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uc2siLCJsYW5ndWFnZSI6IkFKIiwiaXNBY3RpdmUiOnRydWUsInByb2ZpbGVJbWFnZSI6bnVsbCwiaW1hZ2UiOm51bGwsIm5hbWUiOiJBZG1pbiIsInN1cm5hbWUiOiJBZG1pbm92aWMiLCJmdW5jdGlvbiI6IkFkbWluIG9mIHByb2plY3QiLCJzaWduYXR1cmUiOiJBZG1pbiBBZG1pbm92aWMsIExhbiBTeXN0ZW1zIHMuci5vLiIsInBob25lIjpudWxsLCJmYWNlYm9vayI6ImZhY2Vib29rLnNrIiwidHdpdHRlciI6InR3aXR0ZXIuc2siLCJsaW5rZGluIjoibGlua2Rpbi5zayIsImdvb2dsZSI6Imdvb2dsZS5zayIsInVzZXJSb2xlVGl0bGUiOiJBRE1JTiIsInVzZXJSb2xlRGVzY3JpcHRpb24iOiJBZG1pbiBpcyBhIG1haW4gc3lzdGVtIHJvbGUuIEFsbCBBQ0wgYXJlIGF2YWlsYWJsZS4iLCJ1c2VyUm9sZUhvbWVwYWdlIjoiLyIsInVzZXJSb2xlQWNsIjpbImxvZ2luX3RvX3N5c3RlbSIsInNoYXJlX2ZpbHRlcnMiLCJwcm9qZWN0X3NoYXJlZF9maWx0ZXJzIiwicmVwb3J0X2ZpbHRlcnMiLCJzaGFyZV90YWdzIiwiY3JlYXRlX3Byb2plY3RzIiwic2VudF9lbWFpbHNfZnJvbV9jb21tZW50cyIsImNyZWF0ZV90YXNrcyIsImNyZWF0ZV90YXNrc19pbl9hbGxfcHJvamVjdHMiLCJ1cGRhdGVfYWxsX3Rhc2tzIiwidXNlcl9zZXR0aW5ncyIsInVzZXJfcm9sZV9zZXR0aW5ncyIsImNvbXBhbnlfYXR0cmlidXRlX3NldHRpbmdzIiwiY29tcGFueV9zZXR0aW5ncyIsInN0YXR1c19zZXR0aW5ncyIsInRhc2tfYXR0cmlidXRlX3NldHRpbmdzIiwidW5pdF9zZXR0aW5ncyIsInN5c3RlbV9zZXR0aW5ncyIsInNtdHBfc2V0dGluZ3MiLCJpbWFwX3NldHRpbmdzIl0sInVzZXJSb2xlT3JkZXIiOjEsImV4cCI6MTUxNTg5ODA0MSwiaWF0IjoxNTE1ODY5MjQxfQ.rwU6CIz8E4ojH6VlG2BUxxzNjZOfrWrQgYmhcUhwtAYXvtIQBisxeYtvtjVO1SZNiUy-LosD5ikgpZlm2PumcDj_MmimIr4QVlSzPdCVicIzCwIGc3OTBeQzYKeFYBnhfXevF7A7uhaiesWDIXgdWdmVJKl9vyXiSqa5I3wrt89b5xy4KIh7JmhCyeZQEuBfRxnrJDyEBvDTVDFoRqwuatQNtHetnxfgemxEfH7tc3Z3VTy_FCW7lIThvLlQAmPGQ7LzIuXCIl6Hf4m-sZRYIISyP_H8ARQzArVTYm9YtOMaQIwgKX0ciZkMuCmQdPUwOEPd3TXDOaiogtnT3KrH-9tFEwJlOLFtuNJSK12QqcE9V4YqyRO4tZhUnYiOdPbVn5JszdM58Kz5JAtGWaGUFDhLP996yvWN8iX5Dy2YkPuusilA39qTTdlhqxnOwQqsMfqMgFbhn7st9CpxII6-DYLCdPDUG7-tLY5iLj_6D5a6H7zXmTRcbrt6dtCxGk09spdKubFaHJ8ctjWKmX0W5l787BUTUvABfXeoXANuMW3eIObvSEtbx69h41HjVHGf2rxoLsNk-ET8BbVsvAUf2WymnJXQc8CuPU8eebjdLZ4p7B2rXBkLyM02SJjZ-G0aXdO0kKOQwFJtzrTWKaaWG886XKUpqSuJWLjBGbUrPjo`,
          "Content-Type": "application/json"
          }
        }
      )
      .then((response) => {
          console.log(response);
        },
        (error) => {
          console.log('ERROR');
          console.log(error);
        }
      );

      /*fetch(UNITS_LIST, {
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
  });*/
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
