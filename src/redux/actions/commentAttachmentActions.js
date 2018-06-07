import { SET_COMMENT_ATTACHMENTS, ADD_COMMENT_ATTACHMENT, SET_COMMENT_ATTACHMENTS_LOADING, DELETE_COMMENT_ATTACHMENT,DELETE_COMMENT_ATTACHMENTS, LOWER_ACTIVE_REQUESTS } from '../types'
import { UPLOAD_FILE } from '../urls';
import {processError} from '../../helperFunctions';

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
      if(!response.ok){
        processError(response,dispatch);
      }
      response.json().then((response)=>{
            dispatch({type: ADD_COMMENT_ATTACHMENT, commentAttachment:{id:response.data.slug,file:{name:file.name,size:file.size}}});
        })})
        .catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
          console.log(error);
        });
  }
};

export const removeCommentFile = (id,token) => {
  return (dispatch) => {
    dispatch({ type: DELETE_COMMENT_ATTACHMENT, id });
  }
};

export const removeAllCommentFiles = (token) => {
  return (dispatch) => {
    dispatch({ type: DELETE_COMMENT_ATTACHMENTS });
  }
};
