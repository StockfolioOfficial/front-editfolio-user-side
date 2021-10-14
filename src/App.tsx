import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/pages/Login/Login';
import Main from './components/pages/Main/Main';
import Request from './components/pages/Request/Request';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/request" component={Request} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
