import { combineReducers } from 'redux';

import { loginReducer } from './login/reducers';
import { userReducer } from './user/reducers';
import { requestErrorReducer } from './requestError/reducers';
import { paginationReducer } from './pagination/reducers';
import { entitiesReducer } from './entities/reducers';
import { popupReducer } from './popup/reducers';

export const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    requestError: requestErrorReducer,
    pagination: paginationReducer,
    entities: entitiesReducer,
    popup: popupReducer,
});
