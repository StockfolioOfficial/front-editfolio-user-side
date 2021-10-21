import { observable } from 'mobx';

const login = observable({
  token: '',

  getToken(token: string) {
    this.token = token;
  },
});

export { login };

// 토큰 저장하기
