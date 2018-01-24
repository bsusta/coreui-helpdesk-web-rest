import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import loginReducer from './reducers/loginReducer';
import unitsReducer from './reducers/unitsReducer';
import usersReducer from './reducers/usersReducer';
import companiesReducer from './reducers/companiesReducer';
import userRolesReducer from './reducers/userRolesReducer';
import SMTPsReducer from './reducers/smtpsReducer';

const reducers = combineReducers({
    login:loginReducer,
    unitsReducer,
    usersReducer,
    companiesReducer,
    userRolesReducer,
    SMTPsReducer,
  });

const enhancers = compose(
  applyMiddleware(ReduxThunk),
);

export default () => createStore(reducers, {}, enhancers);
