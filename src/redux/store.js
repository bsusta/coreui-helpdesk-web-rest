import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import loginReducer from './reducers/loginReducer';
import unitsReducer from './reducers/unitsReducer';
import usersReducer from './reducers/usersReducer';
import companiesReducer from './reducers/companiesReducer';
import userRolesReducer from './reducers/userRolesReducer';
import SMTPsReducer from './reducers/smtpsReducer';
import imapsReducer from './reducers/imapsReducer';
import projectsReducer from './reducers/projectsReducer';
import statusesReducer from './reducers/statusesReducer';
import companyAttributesReducer from './reducers/companyAttributesReducer';
import sidebarReducer from './reducers/sidebarReducer';
import taskAttributesReducer from './reducers/taskAttributesReducer';
import tagsReducer from './reducers/tagsReducer';
import tasksReducer from './reducers/tasksReducer';

const reducers = combineReducers({
    login:loginReducer,
    unitsReducer,
    usersReducer,
    companiesReducer,
    userRolesReducer,
    SMTPsReducer,
    imapsReducer,
    projectsReducer,
    statusesReducer,
    companyAttributesReducer,
    sidebarReducer,
    taskAttributesReducer,
    tagsReducer,
    tasksReducer
  });

const enhancers = compose(
  applyMiddleware(ReduxThunk),
);

export default () => createStore(reducers, {}, enhancers);
