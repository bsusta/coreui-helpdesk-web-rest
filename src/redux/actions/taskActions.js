import { SET_TASKS,SET_TASKS_LOADING, ADD_TASK, SET_TASK, SET_TASK_LOADING,
  EDIT_TASK, SET_FILTER_LINKS, SET_PROJECT_LINKS,SET_PROJECT_TASKS_LOADING,
  SET_FILTER_TASKS_LOADING, SET_TAG_LINKS, SET_TAG_TASKS_LOADING,
  SET_TASK_PROJECTS,  SET_TASK_PROJECTS_LOADING,
  SET_TASKS_ATTRIBUTES, SET_TASKS_ATTRIBUTES_LOADING,
  DELETE_TASK_SOLVERS, SET_TASK_SOLVERS,ADD_ATTACHMENT,
  SET_ERROR_MESSAGE,CLEAR_TASK, SET_TASK_ID } from '../types';
import { TASKS_LIST, PROJECTS_LIST, TASK_ATTRIBUTES_LIST, PROJECT_LIST,GET_LOC, GET_FILE } from '../urls';
import {addFollower} from './followerActions';
import {addItem} from './itemActions';
import {addSubtask} from './subtaskActions';

/**
 * Sets status if tasks are loaded to false
 */
 export const startTasksLoading = () => {
   return (dispatch) => {
     dispatch({ type: SET_TASKS_LOADING, tasksLoaded:false });
   }
 };

 export const setTaskID = (taskID) => {
   return (dispatch) => {
     dispatch({ type: SET_TASK_ID, taskID });
   }
 };


 export const startProjectTasksLoading = () => {
   return (dispatch) => {
     dispatch({ type: SET_PROJECT_TASKS_LOADING, tasksLoaded:false });
   }
 };

 export const startFilterTasksLoading = () => {
   return (dispatch) => {
     dispatch({ type: SET_FILTER_TASKS_LOADING, tasksLoaded:false });
   }
 };

 export const clearTask = () => {
   return (dispatch) => {
     dispatch({ type: CLEAR_TASK });
   }
 };


/**
 * Gets all tasks available with no pagination
 * @param {string} token universal token for API comunication
 */
 export const getFilteredTasks= (limit,page,token,id) => {
   return (dispatch) => {
       fetch(TASKS_LIST+'/filter/'+id+'?limit='+limit+'&page='+page+'&order=title=>asc', {
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
         dispatch({type: SET_TASKS, tasks:data.data});
         //filterLinks
         dispatch({type: SET_FILTER_LINKS, filterLinks:{numberOfPages:data.numberOfPages,id}});
         dispatch({ type: SET_FILTER_TASKS_LOADING, tasksLoaded:true });
       });
     }
   ).catch(function (error) {
     dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
     console.log(error);
   });
 }
 }


 export const getProjectTasks= (limit,page,token,id) => {
   return (dispatch) => {
       fetch(TASKS_LIST+'?limit='+limit+'&page='+page+'&order=title=>asc'+'&project='+id, {
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
         dispatch({type: SET_TASKS, tasks:data.data});
         //filterLinks
         dispatch({type: SET_PROJECT_LINKS, projectLinks:{numberOfPages:data.numberOfPages,id}});
         dispatch({ type: SET_PROJECT_TASKS_LOADING, tasksLoaded:true });
       });
     }
   ).catch(function (error) {
     dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
     console.log(error);
   });
 }
 }

 export const getTagTasks= (limit,page,token,id) => {
   return (dispatch) => {
       fetch(TASKS_LIST+'?limit='+limit+'&page='+page+'&order=title=>asc'+'&tag='+id, {
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
         dispatch({type: SET_TASKS, tasks:data.data});
         dispatch({type: SET_TAG_LINKS, tagLinks:{numberOfPages:data.numberOfPages,id}});
         dispatch({ type: SET_TAG_TASKS_LOADING, tagTasksLoaded:true });
       });
     }
   ).catch(function (error) {
     dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
     console.log(error);
   });
 }
 }


/**
 * Sets status if task is loaded to false
 */
export const startTaskLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_TASK_LOADING, taskLoaded:false });
  }
};

export const startTagTasksLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_TASK_LOADING, taskLoaded:false });
  }
};

/**
 * Gets one task that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the task that we want to load
 */
export const getTask = (id,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+id, {
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
        dispatch({type: SET_TASK, task:data.data});
        dispatch({ type: SET_TASK_LOADING, taskLoaded:true });

        //zaciatok nacitavania attachmentov
        data.data.taskHasAttachments.map((attachment)=>{
          fetch(GET_LOC+attachment.slug+'/download-location', {
            method: 'get',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          }).then((response2)=>
          response2.json().then((data2)=>{
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
              dispatch({type: ADD_ATTACHMENT, attachment:{url:response3.url,id:attachment.slug,file:{name:attachment.name}}});
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
        //koniec nacitavania attachmentov
        });

      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}

/**
* Adds new task
* @param {object} body  All parameters in an object of the new task
* @param {string} token universal token for API comunication
*/

export const addTask = (body,subtasks,materials,followers,projectID,statusID,requesterID,companyID,token) => {
  return (dispatch) => {
    //getTask(10,token)(dispatch);
    fetch(TASKS_LIST+'/project/'+projectID+'/status/'+statusID+'/requester/'+requesterID+'/company/'+companyID,{
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
        dispatch({type: ADD_TASK, task:response.data});
        followers.map((follower)=>{
          addFollower(follower,response.data.id,token)(dispatch);
        });
        materials.map((material)=>{
          addItem({
            title: material.title,
            amount: material.amount,
            unit_price: material.unit_price},material.unit,response.data.id,token)(dispatch);
        });
        subtasks.map((subtask)=>{
          addSubtask({done:subtask.done, title:subtask.title},response.data.id,token)(dispatch);
        });
      })})
      .catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });

    };
  };

/**
 * Edits selected task
 * @param  {object}  body     data about task except for isActive
 * @param  {Boolean} isActive is active task parameter
 * @param  {int}  id       id of the task
 * @param  {string}  token    universal token for API comunication
 *
 * /api/v1/task-bundle/tasks/{taskId}/project/{projectId}/status/{statusId}/requester/{requesterId}/company/{companyId}
 */

export const editTask = (data,taskID,projectID,statusID,requesterID,companyID,token) => {
  return (dispatch) => {
    if(!taskID||!projectID||!statusID){
      return;
    }

    if(requesterID && companyID){
      fetch(TASKS_LIST+'/'+taskID+'/project/'+projectID+'/status/'+statusID+'/requester/'+requesterID+'/company/'+companyID, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      }).catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });

    }
    else if(requesterID && !companyID){
      fetch(TASKS_LIST+'/'+taskID+'/project/'+projectID+'/status/'+statusID+'/requester/'+requesterID, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      }).catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });

    }
    else if(!requesterID && companyID){
      fetch(TASKS_LIST+'/'+taskID+'/project/'+projectID+'/status/'+statusID+'/company/'+companyID, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      }).catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });

    }
    else{
      fetch(TASKS_LIST+'/'+taskID+'/project/'+projectID+'/status/'+statusID, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      }).catch(function (error) {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
        console.log(error);
      });
    }

  };
};

export const startTaskProjectsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_TASK_PROJECTS_LOADING, taskProjectsLoaded:false });
  }
};

export const getTaskProjects= (token) => {
  return (dispatch) => {
      fetch(PROJECTS_LIST+'/create-tasks', {
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
        dispatch({type: SET_TASK_PROJECTS, taskProjects:data.data});
        dispatch({ type: SET_TASK_PROJECTS_LOADING, taskProjectsLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}


export const startTasksAttributesLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_TASKS_ATTRIBUTES_LOADING, taskAttributesLoaded:false });
  }
};

export const getTasksAttributes = (token) => {
  return (dispatch) => {
      fetch(TASK_ATTRIBUTES_LIST+'/all', {
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
        dispatch({type: SET_TASKS_ATTRIBUTES, taskAttributes:data.data});
        dispatch({ type: SET_TASKS_ATTRIBUTES_LOADING, taskAttributesLoaded:true });
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}

export const deleteTaskSolvers = () => {
  return (dispatch) => {
    dispatch({ type: DELETE_TASK_SOLVERS });
  }
};

export const getTaskSolvers = (projectID,token) => {
  return (dispatch) => {
      fetch(PROJECT_LIST+'/'+projectID+'/assign-user', {
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
        dispatch({type: SET_TASK_SOLVERS, taskSolvers:data.data});
      });
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}


export const deleteTask = (id,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST+'/'+id, {
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
    }
  ).catch(function (error) {
    dispatch({ type: SET_ERROR_MESSAGE, errorMessage:error });
    console.log(error);
  });
}
}
