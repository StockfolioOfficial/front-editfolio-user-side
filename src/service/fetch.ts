import { BASE_URL } from '../confing';

export interface LoginValueType {
  [key: string]: string;
}

class FetchData {
  login = (values: LoginValueType) => {
    return fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: values.email,
        password: values.phone.replaceAll('-', ''),
      }),
    }).then((res) => {
      if (res.status > 400) return res;
      return res.json();
    });
  };

  requirement = (requirement: string) => {
    return fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
      },
      body: JSON.stringify({
        requirement,
      }),
    });
  };

  // requestData = () => {
  //   return fetch(`${BASE_URL}/order/recent-processing`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
  //     },
  //   }).then((res) => res.json());
  // };

  // requestUser = () => {
  //   return fetch(`${BASE_URL}/customer/me.simply`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
  //     },
  //   }).then((res) => res.json());
  // };

  // mock
  requestUser = () => {
    return fetch(`/data/user-last.json`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
      },
    }).then((res) => res.json());
  };

  // mock pro
  requestData = () => {
    return fetch(`/data/proceeding-last.json`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
      },
    }).then((res) => res.json());
  };

  requestComplete = () => {
    return fetch(`${BASE_URL}/order/recent-processing/done`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
      },
    }).then((res) => res.json());
  };
}

export default FetchData;
