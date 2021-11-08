import { BASE_URL } from '../confing';

interface TokenDataType {
  token?: string;
}

export interface LoginValueType {
  [key: string]: string;
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
}

class FetchData {
  login = async (values: LoginValueType) => {
    try {
      const tokenData = await fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: values.email,
          password: values.phone.replaceAll('-', ''),
        }),
      }).then((res) => res.json());
      return tokenData as TokenDataType;
    } catch {
      console.error('로그인 터짐');
      return {};
    }
  };

  requirement = async (requirement: string) => {
    const reqRes = await fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('edit-token')}` as string,
      },
      body: JSON.stringify({
        requirement,
      }),
    });
    return reqRes;
  };

  requestData = async () => {
    const dataRes = await fetch(`${BASE_URL}/order/recent-processing`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('edit-token')}` as string,
      },
    }).then<Partial<OrderModal> | undefined>((res) => {
      if (res.status === 200) return res.json();
      if (res.ok) return {};
      return undefined;
    });
    return dataRes;
  };

  requestUser = async () => {
    const userRes = await fetch(`${BASE_URL}/customer/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('edit-token')}` as string,
      },
    }).then((res) => res.json());
    return userRes;
  };

  requestEdit = async () => {
    await fetch(`${BASE_URL}/order/recent-processing/edit`, {
      method: `POST`,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('edit-token')}` as string,
      },
    });
  };

  // mock
  // requestUser = () => {
  //   return fetch(`/data/user-last.json`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
  //     },
  //   }).then((res) => res.json());
  // };

  // mock pro
  // requestData = () => {
  //   return fetch(`/data/proceeding-last.json`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer${localStorage.getItem('edit-token')}` as string,
  //     },
  //   }).then((res) => res.json());
  // };

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
