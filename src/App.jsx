import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';
import AdminPage from './components/pages/AdminPage';

function App() {
  return (
    <div className="App">
      <Router basename="need_for_drive-admin">
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth"/>
          </Route>
          <Route path="/auth" component={LoginPage}/>
          <Route path="/admin" component={AdminPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
