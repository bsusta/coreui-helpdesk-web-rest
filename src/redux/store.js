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
import attachmentsReducer from './reducers/attachmentsReducer';
import subtasksReducer from './reducers/subtasksReducer';
import itemsReducer from './reducers/itemsReducer';
import commentsReducer from './reducers/commentsReducer';
import commentAttachmentsReducer from './reducers/commentAttachmentsReducer';
import followersReducer from './reducers/followersReducer';
import loadingReducer from './reducers/loadingReducer';
import filtersReducer from './reducers/filtersReducer';
import errorsReducer from './reducers/errorsReducer';
import messagesReducer from './reducers/messagesReducer';

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
    attachmentsReducer,
    subtasksReducer,
    itemsReducer,
    commentsReducer,
    commentAttachmentsReducer,
    followersReducer,
    loadingReducer,
    filtersReducer,
    errorsReducer,
    messagesReducer
  });

const enhancers = compose(
  applyMiddleware(ReduxThunk)
);


export default () => createStore(reducers, {}, enhancers);
