import ModalForm from 'components/modals/ModalForm';
import Portal from 'components/modals/Portal';
import useStore from 'hooks/useStore';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/pages/Login';
import Proceeding from './components/pages/Proceeding';
import Request from './components/pages/Request';
import UploadLink from './components/pages/UploadLink';

const Modal = () => {
  const { modal } = useStore();

  return useObserver(() =>
    modal.isShow ? (
      <Portal>
        <ModalForm content={modal.modalContent} />
      </Portal>
    ) : (
      <></>
    ),
  );
};

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Proceeding} />
        <Route exact path="/request" component={Request} />
        <Route exact path="/upload-link" component={UploadLink} />
      </Switch>
      <Modal />
    </BrowserRouter>
  );
}

export default App;
