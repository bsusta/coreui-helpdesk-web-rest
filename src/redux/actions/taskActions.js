import { SET_TASKS,SET_TASKS_LOADING, ADD_TASK, SET_TASK, SET_TASK_LOADING, EDIT_TASK, SET_FILTER_LINKS, SET_PROJECT_LINKS,SET_PROJECT_TASKS_LOADING,SET_FILTER_TASKS_LOADING } from '../types';
import { TASKS_LIST } from '../urls';

/**
 * Sets status if tasks are loaded to false
 */
 export const startTasksLoading = () => {
   return (dispatch) => {
     dispatch({ type: SET_TASKS_LOADING, tasksLoaded:false });
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
       response.json().then((data) => {
         dispatch({type: SET_TASKS, tasks:data.data});
         //filterLinks
         dispatch({type: SET_FILTER_LINKS, filterLinks:{numberOfPages:data.numberOfPages,id}});
         dispatch({ type: SET_FILTER_TASKS_LOADING, tasksLoaded:true });
       });
     }
   ).catch(function (error) {
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
       response.json().then((data) => {
         dispatch({type: SET_TASKS, tasks:data.data});
         //filterLinks
         dispatch({type: SET_PROJECT_LINKS, projectLinks:{numberOfPages:data.numberOfPages,id}});
         dispatch({ type: SET_PROJECT_TASKS_LOADING, tasksLoaded:true });
       });
     }
   ).catch(function (error) {
     console.log(error);
   });
 }
 }

/**
 * Adds new task
 * @param {object} body  All parameters in an object of the new task
 * @param {string} token universal token for API comunication
 */
export const addTask = (body,token) => {
  return (dispatch) => {
      fetch(TASKS_LIST,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
    response.json().then((response)=>{
      dispatch({type: ADD_TASK, task:response.data});
    })})
    .catch(function (error) {
      console.log(error);
    });

  };
};

/**
 * Sets status if task is loaded to false
 */
export const startTaskLoading = () => {
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
      response.json().then((data) => {
        dispatch({type: SET_TASK, task:data.data});
        dispatch({ type: SET_TASK_LOADING, taskLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}

/**
 * Edits selected task
 * @param  {object}  body     data about task except for isActive
 * @param  {Boolean} isActive is active task parameter
 * @param  {int}  id       id of the task
 * @param  {string}  token    universal token for API comunication
 */
export const editTask = (body,isActive,id,token) => {
  return (dispatch) => {

      Promise.all([
        fetch(TASKS_LIST+'/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        }),
        fetch(TASKS_LIST+'/'+id+(isActive?'/restore':'/inactivate'), {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        })]).then(([response1,response2])=>Promise.all([response1.json(),response2.json()]).then(([response1,response2])=>{
          dispatch({type: EDIT_TASK, task:{...response1.data,is_active:isActive}});
        }))
        .catch(function (error) {
          console.log(error);
      });

  };
};
