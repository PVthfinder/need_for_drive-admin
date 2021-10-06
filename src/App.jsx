import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import { userCheck } from './store/user/actionCreators';

import LoginPage from './components/pages/LoginPage';
import AdminPage from './components/pages/AdminPage';

import { checkUser } from './utils/apiUtils';

function App() {
  const {isLogged} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogged) {
      checkUser()
        .then((res) => dispatch(userCheck(res.username)));
    }
  }, []);

  return (
    <div className="App">
      {
        !isLogged
        ? <LoginPage />
        : (
          <Router basename="need_for_drive-admin">
            <Switch>
              <Route exact path="/">
                <Redirect to="/admin"/>
              </Route>
              <Route path="/admin" component={AdminPage}/>
            </Switch>
          </Router>
          )
      }
    </div>
  );
}

export default App;
