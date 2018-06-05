import { SET_PROJECTS,SET_PROJECTS_LOADING, ADD_PROJECT, SET_PROJECT, SET_PROJECT_LOADING, EDIT_PROJECT, SET_PERMISSIONS_SAVED, SET_ERROR_MESSAGE,ADD_ERROR_MESSAGE, LOWER_ACTIVE_REQUESTS } from '../types';
import { PROJECTS_LIST,UPDATE_PROJECT_ACL } from '../urls';

/**
 * Sets status if projects are loaded to false
 */
export const startProjectsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_PROJECTS_LOADING, projectsLoaded:false });
  }
};

/**
 * Gets all projects available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getProjects= (token) => {
  return (dispatch) => {
      fetch(PROJECTS_LIST+'?limit=999', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        dispatch({type: LOWER_ACTIVE_REQUESTS});
        if(!response.ok){
          response.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
          });
          return;
        }
      response.json().then((data) => {
        dispatch({type: SET_PROJECTS, projects:data.data});
        dispatch({ type: SET_PROJECTS_LOADING, projectsLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}
/**
 * Adds new project
 * @param {object} body  All parameters in an object of the new project
 * @param {string} token universal token for API comunication
 */
export const addProject = (body,token) => {
  return (dispatch) => {
      fetch(PROJECTS_LIST,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
      if(!response.ok){
        response.text().then((data)=>{
          dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
        });
        return;
      }
    response.json().then((response)=>{
      dispatch({type: ADD_PROJECT, project:response.data});
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};

/**
 * Sets status if project is loaded to false
 */
export const startProjectLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_PROJECT_LOADING, projectLoaded:false });
  }
};

/**
 * Gets one project that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the project that we want to load
 */
export const getProject = (id,token) => {
  return (dispatch) => {
      fetch(PROJECTS_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      dispatch({type: LOWER_ACTIVE_REQUESTS});
        if(!response.ok){
          response.text().then((data)=>{
            dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
          });
          return;
        }
      response.json().then((data) => {
        dispatch({type: SET_PROJECT, project:data.data});
        dispatch({ type: SET_PROJECT_LOADING, projectLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
  });
}
}

/**
 * Edits selected project
 * @param  {object}  body     data about project except for isActive
 * @param  {Boolean} isActive is active project parameter
 * @param  {int}  id       id of the project
 * @param  {string}  token    universal token for API comunication
 */
export const editProject = (body,isActive,id,token) => {
  return (dispatch) => {

      Promise.all([
        fetch(PROJECTS_LIST+'/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }),
        fetch(PROJECTS_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        })]).then(([response1,response2])=>{
          if(!response1.ok){
            response1.text().then((data)=>{
              dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response1.statusText+ JSON.parse(data).message });
            });
            return;
          }
          if(!response2.ok){
            response2.text().then((data)=>{
              dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response2.statusText+ JSON.parse(data).message });
            });
            return;
          }
          Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
          dispatch({type: EDIT_PROJECT, project:{...response1.data,is_archived:isActive}});
        })})
        .catch(function (error) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
      });

  };
};

export const savePermissions = (permissions,prev,projectID,token) => {
  return (dispatch) => {
      let body={};
      prev.map((item)=>{
        if(permissions.findIndex((per)=>per.user.id===item.user.id)===-1){
          body[item.user.id.toString()]='null'
        }
      })
      permissions.map((perm)=>body[perm.user.id.toString()]=perm.acl);
      fetch(UPDATE_PROJECT_ACL+projectID+'/process-more-acl',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'PUT',
        body:JSON.stringify({usersAcl:body}),
      })
    .then((response)=>{
      if(!response.ok){
        response.text().then((data)=>{
          dispatch({ type: ADD_ERROR_MESSAGE, errorMessage:response.statusText+ JSON.parse(data).message });
        });
        return;
      }
    response.json().then((response)=>{
      dispatch({type: SET_PERMISSIONS_SAVED, permissionsSaved:true});
      setTimeout(function(){ dispatch({type: SET_PERMISSIONS_SAVED, permissionsSaved:false});}, 3000);
    })})
    .catch(function (error) {
      dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
      console.log(error);
    });

  };
};
