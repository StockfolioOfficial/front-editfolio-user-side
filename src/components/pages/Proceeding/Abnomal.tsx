import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const NotFound = () => {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/');
  };

  return (
    <Container>
      <Description>비정상적인 접근입니다.</Description>
      <SubDescription>로그인을 해주세요.</SubDescription>
      <Button onClick={handleLogout}>로그인하기</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 700px;
  background-color: ${({ theme }) => theme.color.white};
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

export default NotFound;
