import React from 'react';
import styled from 'styled-components';

const Exhaustion = () => {
  return (
    <Container>
      <Description>구독권이 만료되었습니다.</Description>
      <SubDescription>
        구독권을 구매하여 영상편집 의뢰를 시작해보세요!
      </SubDescription>
      <Link href="https://editfolio.ai/editmenu/?idx=4" target="_self">
        구독권 구매하러 가기
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
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

const Link = styled.a`
  width: 336px;
  margin-bottom: 388px;
  padding: 13px;
  background-color: ${({ theme }) => theme.color.mint};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;

export default Exhaustion;
