import { combineReducers } from 'redux';

import { loginReducer } from './login/reducers';

export const rootReducer = combineReducers({
    login: loginReducer,
});
