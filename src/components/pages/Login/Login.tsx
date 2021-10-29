import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <Background>
      <Container>
        <Logo src="/images/login-logo.png" />
        <Img src="/images/login-main.png" />
        <SubTitle>영상편집 월 구독서비스</SubTitle>
        <Title>에딧폴리오</Title>
        <LoginForm />
      </Container>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  background-color: #dee4ed;
  overflow-y: scroll;
`;

const Container = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 360px;
  margin: 0 auto;
  padding-bottom: 74px;
  background-color: ${({ theme }) => theme.color.white};
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
