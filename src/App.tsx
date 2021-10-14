import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/pages/Login/Login';
import Request from './components/pages/Request/Request';
import Proceeding from './components/pages/Proceeding/Proceeding';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/request" component={Request} />
        <Route exact path="/main" component={Proceeding} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
