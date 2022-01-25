import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

interface Login {
  name: string;
}

const PLoginBox = ({ name }: Login) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('editfolio-token');
    history.push('/');
  };

  return (
    <LoginBox>
      <LoginText>
        {name}님
        <br />
        환영합니다 :)
      </LoginText>
      <LoginBtn onClick={handleLogout}>로그아웃</LoginBtn>
    </LoginBox>
  );
};

const LoginBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 360px;
  height: 88px;
  margin-bottom: 16px;
  background-color: ${(props) => props.theme.color.purple};
`;

const LoginText = styled.div`
  display: flex;
  font-size: 14px;
  color: #ffffff;
  line-height: 22px;
  margin: 22px 0 44px 28px;
`;

const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  width: 64px;
  height: 26px;
  margin: 31px 24px 0 31px;
  align-items: center;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 13px;
  background-color: #a29dfc;
`;

export default PLoginBox;
