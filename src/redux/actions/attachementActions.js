import { SET_ATTACHEMENTS, ADD_ATTACHEMENT, SET_ATTACHEMENTS_LOADING, DELETE_ATTACHEMENT, EDIT_ATTACHEMENT } from '../types'
import { UPLOAD_FILE,GET_LOC, GET_FILE } from '../urls';


export const uploadFile = (file,token) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append("file", file);
    fetch(UPLOAD_FILE,{
      headers: {
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      body:formData,
    })
    .then((response)=>{
      response.json().then((response)=>{
            let attachement = {id:response.data.slug,file:{name:file.name,size:file.size}};
            dispatch({type: ADD_ATTACHEMENT, attachement});
            //zaciatok nacitavania attachementov
              fetch(GET_LOC+attachement.id+'/download-location', {
                method: 'get',
                headers: {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
                }
              }).then((response2)=>response2.json().then((data2)=>{
                fetch(GET_FILE+data2.data.fileDir+'/'+data2.data.fileName, {
                  method: 'get',
                  headers: {
                    'Authorization': 'Bearer ' + token,
                  }
                }).then((response3) =>{
                  attachement.url=response3.url;
                  dispatch({type: EDIT_ATTACHEMENT, attachement});
                }).catch(function (error) {
                  console.log(error);
                });
              }).catch(function (error) {
                console.log(error);
              })
            ).catch(function (error) {
              console.log(error);
            });
            //koniec nacitavania attachementov
        })})
        .catch(function (error) {
          console.log(error);
        });
  }
};


export const removeFile = (id,token) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ATTACHEMENT, id });
  }
};
