import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const NotFoundRequest = () => {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/');
  };

  return (
    <Background>
      <Container>
        <Header>
          <img src="./images/Logo.png" alt="editfolio" />
        </Header>
        <Box>
          <Description>잘못된 접근입니다.</Description>
          <SubDescription>로그인을 진행해주세요,</SubDescription>
          <Button onClick={handleLogout}>로그인 하기</Button>
        </Box>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #dee4ed;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 700px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const Header = styled.header`
  height: 60px;
  padding: 15px 0 0 18px;
  background-color: ${({ theme }) => theme.color.white};

  & img {
    cursor: pointer;
  }
`;

const Description = styled.p`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.color.darkGray};
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4444444444;
  text-align: center;
`;

const SubDescription = styled.p`
  margin-bottom: 60px;
  color: ${({ theme }) => theme.color.gray};
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
`;

const Button = styled.button`
  width: 336px;
  margin-bottom: 344px;
  padding: 13px;
  background-color: ${({ theme }) => theme.color.purple};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
  font-size: 14px;
  font-weight: 700;
`;

export default NotFoundRequest;
