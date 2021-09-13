import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Router basename="need_for_drive-admin">
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth"/>
          </Route>
          <Route path="/auth" component={LoginPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
