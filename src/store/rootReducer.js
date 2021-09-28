import { combineReducers } from 'redux';

import { loginReducer } from './login/reducers';
import { userReducer } from './user/reducers';

export const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
});
