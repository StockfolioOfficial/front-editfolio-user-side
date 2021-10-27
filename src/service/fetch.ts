import { BASE_URL } from '../confing';

class FetchData {
  fetchLogin = (values: any) => {
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

  fetchRequest = (requirement: string) => {
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

  RequestData = () => {
    return fetch(`${BASE_URL}/order/recent-processing`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
      },
    }).then((res) => res.json());
  };

  RequestUser = () => {
    return fetch(`${BASE_URL}/customer/me.simply`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
      },
    }).then((res) => res.json());
  };
}

export default FetchData;
