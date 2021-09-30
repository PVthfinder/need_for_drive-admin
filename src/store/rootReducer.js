import { combineReducers } from 'redux';

import { loginReducer } from './login/reducers';
import { userReducer } from './user/reducers';
import { requestErrorReducer } from './requestError/reducers';

export const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    requestError: requestErrorReducer,
});
