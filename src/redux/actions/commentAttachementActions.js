import { SET_COMMENT_ATTACHEMENTS, ADD_COMMENT_ATTACHEMENT, SET_COMMENT_ATTACHEMENTS_LOADING, DELETE_COMMENT_ATTACHEMENT,DELETE_COMMENT_ATTACHEMENTS } from '../types'
import { UPLOAD_FILE } from '../urls';


export const uploadCommentFile = (file,token) => {
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
            dispatch({type: ADD_COMMENT_ATTACHEMENT, commentAttachement:{id:response.data.slug,file:{name:file.name,size:file.size}}});
        })})
        .catch(function (error) {
          console.log(error);
        });
  }
};

export const removeCommentFile = (id,token) => {
  return (dispatch) => {
    dispatch({ type: DELETE_COMMENT_ATTACHEMENT, id });
  }
};

export const removeAllCommentFiles = (token) => {
  return (dispatch) => {
    dispatch({ type: DELETE_COMMENT_ATTACHEMENTS });
  }
};
