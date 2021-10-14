import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <Container>
      <Logo src="/images/login-logo.png" />
      <Img src="/images/login-main.png" />
      <SubTitle>영상편집 월 구독서비스</SubTitle>
      <Title>에딧폴리오</Title>
      <LoginForm />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 760px;
  margin: 0 auto;
  border: 1px solid black;
`;

const Logo = styled.img`
  width: 120px;
  height: 32px;
  margin: 14px 0 32px;
`;

const Img = styled.img`
  width: 256px;
  height: 208px;
  margin-bottom: 40px;
`;

const SubTitle = styled.p`
  margin-bottom: 2px;
  color: ${({ theme }) => theme.color.gray};
  font-size: 14px;
  line-height: 1.5714285714;
  letter-spacing: 0.2px;
`;

const Title = styled.p`
  margin-bottom: 60px;
  font-size: 24px;
  line-height: 1.4166666667;
  letter-spacing: 0.2px;
`;

export default Login;
