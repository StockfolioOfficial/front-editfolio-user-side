import { BASE_URL } from '../confing';

interface TokenDataType {
  token?: string;
}

export interface LoginValueType {
  [key: string]: string;
}

export interface UserData {
  userId: string;
  name: string;
  subscribeStart: string;
  subscribeEnd: string;
  remainingOrderCount: number;
  simpleNotify: string;
  onedriveLink: string;
}

export interface OrderModal {
  assigneeNickname?: string;
  dueDate?: string;
  orderId: string;
  orderState: number;
  orderStateContent: string;
  orderStateEmoji: string;
  orderedAt: string;
  remainingEditCount: number;
  linkList?: string[];
}

class FetchData {
  login = async (values: LoginValueType) => {
    try {
      const { token } = await fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: values.email,
          password: values.phone.replaceAll('-', ''),
        }),
      }).then<TokenDataType>((res) => res.json());
      return token;
    } catch {
      console.error('로그인 터짐');
      return null;
    }
  };

  checkLogin = () => {
    const token = localStorage.getItem('editfolio-token');
    if (!token) return null;
    return token;
  };

  requirement = async (requirement: string) => {
    const reqRes = await fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          'editfolio-token',
        )}` as string,
      },
      body: JSON.stringify({
        requirement,
      }),
    });
    return reqRes;
  };

  requestData = async () => {
    const token = localStorage.getItem('editfolio-token');

    if (!token) return undefined;

    try {
      const dataRes = await fetch(`${BASE_URL}/order/recent-processing`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then<OrderModal | undefined>((res) => {
        if (res.ok) return res.json();
        return undefined;
      });
      return dataRes;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  requestUser = async () => {
    const userRes = await fetch(`${BASE_URL}/customer/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          'editfolio-token',
        )}` as string,
      },
    }).then<UserData | undefined>((res) => res.json());
    return userRes;
  };

  requestEdit = async () => {
    await fetch(`${BASE_URL}/order/recent-processing/edit`, {
      method: `POST`,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          'editfolio-token',
        )}` as string,
      },
    });
  };

  // mock
  // requestUser = () => {
  //   return fetch(`/data/user-last.json`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer${localStorage.getItem('editfolio-token')}` as string,
  //     },
  //   }).then((res) => res.json());
  // };

  // mock pro
  // requestData = () => {
  //   return fetch(`/data/proceeding-last.json`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer${localStorage.getItem('editfolio-token')}` as string,
  //     },
  //   }).then((res) => res.json());
  // };

  requestComplete = () => {
    return fetch(`${BASE_URL}/order/recent-processing/done`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer${localStorage.getItem(
          'editfolio-token',
        )}` as string,
      },
    }).then((res) => res.json());
  };
}

export default FetchData;
