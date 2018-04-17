import { SET_COMMENTS,SET_COMMENTS_LOADING, ADD_COMMENT, ADD_COMMENT_AVATAR_URL,DELETE_COMMENT, SET_COMMENT_ATTACHEMENT, SET_ERROR_MESSAGE } from '../types';
import { TASKS_LIST, GET_LOC, GET_FILE, COMMENT_COMMENTS } from '../urls';

/**
* Sets status if comments are loaded to false
*/
export const startCommentsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_COMMENTS_LOADING, commentsLoaded:false });
  }
};

/**
* Gets all comments available with no pagination
* @param {string} token universal token for API comunication
*/
export const getComments= (taskID,token) => {
  return (dispatch) => {
    fetch(TASKS_LIST+'/'+taskID+'/comments'+'?limit=999', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((response) =>{
      if(!response.ok){
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
        return;
      }
      response.json().then((data) => {
        let comments=[];
        dispatch({ type: SET_COMMENTS_LOADING, commentsLoaded:true });
        dispatch({type: SET_COMMENTS, comments:data.data});
        data.data.map((comment)=>{
          if(comment.createdBy.avatarSlug){
            fetch(GET_LOC+comment.createdBy.avatarSlug+'/download-location', {
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
                if(!response3.ok){
                  dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response3.statusText });
                  return;
                }
                dispatch({type: ADD_COMMENT_AVATAR_URL,id:comment.id,url:response3.url});
              }).catch(function (error) {
                dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
                console.log(error);
              });
            }).catch(function (error) {
              dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
            })
          ).catch(function (error) {
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
            console.log(error);
          });
        }
        comment.commentHasAttachments.map(attachement=>{
          console.log('DATA');
          console.log(attachement);
          fetch(GET_LOC+attachement.slug+'/download-location', {
            method: 'get',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          }).then((response2)=>response2.json().then((data2)=>{
            console.log(data2.data);
            fetch(GET_FILE+data2.data.fileDir+'/'+data2.data.fileName, {
              method: 'get',
              headers: {
                'Authorization': 'Bearer ' + token,
              }
            }).then((response3) =>{
              console.log(response3);
              if(!response3.ok){
                dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response3.statusText });
                return;
              }
              dispatch({type: SET_COMMENT_ATTACHEMENT,commentID:comment.id,attachementID:attachement.id,url:response3.url,name:attachement.name});
            }).catch(function (error) {
              dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
            });
          }).catch(function (error) {
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
            console.log(error);
          })
        ).catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
          console.log(error);
        });
      })
    })
  });
}
).catch(function (error) {
  dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
  console.log(error);
});
}
}
/**
* Adds new comment
* @param {object} body  All parameters in an object of the new comment
* @param {string} token universal token for API comunication
*/

export const addComment = (body,taskID,token) => {
  return (dispatch) => {
    fetch(TASKS_LIST+'/'+taskID+'/add-comment',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      body:JSON.stringify(body),
    })
    .then((response)=>{
      if(!response.ok){
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
        return;
      }
      response.json().then((response)=>{
        if(response.data.createdBy.avatarSlug){
          let newComment=response.data;
          fetch(GET_LOC+newComment.createdBy.avatarSlug+'/download-location', {
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
              if(!response3.ok){
                dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response3.statusText });
                return;
              }
              newComment['avatar']=response3.url;
              dispatch({type: ADD_COMMENT, comment:newComment});
            }).catch(function (error) {
              dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
            });
          }).catch(function (error) {
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
            console.log(error);
          })
        ).catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
          console.log(error);
        });
      }else{
        dispatch({type: ADD_COMMENT, comment:response.data});
      }
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

export const addCommentsComment = (body,commentID,token) => {
  return (dispatch) => {
    fetch(COMMENT_COMMENTS+'/'+commentID+'/add-comment',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      body:JSON.stringify(body),
    })
    .then((response)=>{
      console.log(response);
      if(!response.ok){
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
        return;
      }
      response.json().then((response)=>{
        if(response.data.createdBy.avatarSlug){
          let newComment=response.data;
          fetch(GET_LOC+newComment.createdBy.avatarSlug+'/download-location', {
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
              if(!response3.ok){
                dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response3.statusText });
                return;
              }
              newComment['avatar']=response3.url;
              dispatch({type: ADD_COMMENT, comment:newComment});
            }).catch(function (error) {
              dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
              console.log(error);
            });
          }).catch(function (error) {
            dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
            console.log(error);
          })
        ).catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
          console.log(error);
        });
      }else{
        dispatch({type: ADD_COMMENT, comment:response.data});
      }
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};



export const editComment = (body,commentID,unitID,taskID,token) => {
  return (dispatch) => {
    fetch(TASKS_LIST+'/'+taskID+'/comments/'+commentID+'/unit/'+unitID, {
      method: 'put',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
    }).then((response)=>{
      if(!response.ok){
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
        return;
      }
      response.json().then((response)=>{
        dispatch({type: EDIT_COMMENT, comment:response.data});
      })})
      .catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });
    };
  };

  export const deleteComment = (id,taskID,token) => {
    return (dispatch) => {
      fetch(TASKS_LIST+'/'+taskID+'/comments/'+id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if(!response.ok){
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:response.statusText });
          return;
        }
        dispatch({type: DELETE_COMMENT, id});
      }
    ).catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });
  }
}
