import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';
import AdminPage from './components/pages/AdminPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  return (
    <div className="App">
      {
        !token
        ? <LoginPage setToken={setToken} />
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
