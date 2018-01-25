import { SET_PROJECTS,SET_PROJECTS_LOADING, ADD_PROJECT, SET_PROJECT, SET_PROJECT_LOADING, EDIT_PROJECT } from '../types';
import { PROJECTS_LIST } from '../urls';

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
      response.json().then((data) => {
        dispatch({type: SET_PROJECTS, projects:data.data});
        dispatch({ type: SET_PROJECTS_LOADING, projectsLoaded:true });
      });
    }
  ).catch(function (error) {
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
    response.json().then((response)=>{
      dispatch({type: ADD_PROJECT, project:response.data});
    })})
    .catch(function (error) {
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
export const getProject = (token,id) => {
  return (dispatch) => {
      fetch(PROJECTS_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_PROJECT, project:data.data});
        dispatch({ type: SET_PROJECT_LOADING, projectLoaded:true });
      });
    }
  ).catch(function (error) {
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
        })]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
          dispatch({type: EDIT_PROJECT, project:response1.data});
        }))
        .catch(function (error) {
          console.log(error);
      });

  };
};
