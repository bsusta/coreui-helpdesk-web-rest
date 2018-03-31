import { SET_ATTACHEMENTS, ADD_ATTACHEMENT, SET_ATTACHEMENTS_LOADING, DELETE_ATTACHEMENT } from '../types'
import { UPLOAD_FILE } from '../urls';


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
            dispatch({type: ADD_ATTACHEMENT, attachement:{id:response.data.slug,file:{name:file.name,size:file.size}}});
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
