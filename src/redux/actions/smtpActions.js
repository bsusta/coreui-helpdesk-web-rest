import { SET_SMTPS,SET_SMTPS_LOADING, ADD_SMTP, SET_SMTP, SET_SMTP_LOADING, EDIT_SMTP } from '../types';
import { SMTPS_LIST } from '../urls';

/**
 * Sets status if SMTPs are loaded to false
 */
export const startSMTPsLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_SMTPS_LOADING, SMTPsLoaded:false });
  }
};

/**
 * Gets all SMTPs available with no pagination
 * @param {string} token universal token for API comunication
 */
export const getSMTPs= (token) => {
  return (dispatch) => {
      fetch(SMTPS_LIST+'?limit=999', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_SMTPS, SMTPs:data.data});
        dispatch({ type: SET_SMTPS_LOADING, SMTPsLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}
/**
 * Adds new SMTP
 * @param {object} body  All parameters in an object of the new SMTP
 * @param {string} token universal token for API comunication
 */
export const addSMTP = (body,token) => {
  return (dispatch) => {
      fetch(SMTPS_LIST,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body:JSON.stringify(body),
      })
    .then((response)=>{
    response.json().then((response)=>{
      dispatch({type: ADD_SMTP, SMTP:response.data});
    })})
    .catch(function (error) {
      console.log(error);
    });

  };
};

/**
 * Sets status if SMTP is loaded to false
 */
export const startSMTPLoading = () => {
  return (dispatch) => {
    dispatch({ type: SET_SMTP_LOADING, SMTPLoaded:false });
  }
};

/**
 * Gets one SMTP that was selected
 * @param  {string} token universal token for API comunication
 * @param  {int} id    interger, that is ID of the SMTP that we want to load
 */
export const getSMTP = (token,id) => {
  return (dispatch) => {
      fetch(SMTPS_LIST+'/'+id, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
      response.json().then((data) => {
        dispatch({type: SET_SMTP, SMTP:data.data});
        dispatch({ type: SET_SMTP_LOADING, SMTPLoaded:true });
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}
}

/**
 * Edits selected SMTP
 * @param  {object}  body     data about SMTP except for isActive
 * @param  {Boolean} isActive is active SMTP parameter
 * @param  {int}  id       id of the SMTP
 * @param  {string}  token    universal token for API comunication
 */
export const editSMTP = (body,id,token) => {
  return (dispatch) => {

      Promise.all([
        fetch(SMTPS_LIST+'/'+id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body)
        })]).then(([response1])=>Promise.all([response1.json()]).then(([response1])=>{
          dispatch({type: EDIT_SMTP, SMTP:{...response1.data,is_active:isActive}});
        }))
        .catch(function (error) {
          console.log(error);
      });

  };
};
