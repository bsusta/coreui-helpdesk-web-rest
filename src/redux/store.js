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
import attachementsReducer from './reducers/attachementsReducer';
import subtasksReducer from './reducers/subtasksReducer';
import itemsReducer from './reducers/itemsReducer';
import commentsReducer from './reducers/commentsReducer';
import commentAttachementsReducer from './reducers/commentAttachementsReducer';
import followersReducer from './reducers/followersReducer';
import loadingReducer from './reducers/loadingReducer';

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
    tasksReducer,
    attachementsReducer,
    subtasksReducer,
    itemsReducer,
    commentsReducer,
    commentAttachementsReducer,
    followersReducer,
    loadingReducer
  });

const enhancers = compose(
  applyMiddleware(ReduxThunk),
);

export default () => createStore(reducers, {}, enhancers);
