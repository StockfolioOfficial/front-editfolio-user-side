import React from 'react';
import styled from 'styled-components';

const Exhaustion = () => {
  return (
    <Container>
      <Description>이용권이 없습니다.</Description>
      <SubDescription>
        구독권이나 충전권을 구매하여
        <br />
        영상편집 의뢰를 시작해보세요!
      </SubDescription>
      <Link href="https://editfolio.ai/editmenu/?idx=4" target="_blank">
        구독권 구매하러 가기
      </Link>
      <EditLink href="https://editfolio.ai/editmenu/?idx=5" target="_blank">
        1회 편집권 구매하러 가기
      </EditLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0 32px;
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
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  background-color: ${({ theme }) => theme.color.mint};
  border-radius: 6px;
`;

const EditLink = styled(Link)`
  margin-top: 8px;
  background-color: ${({ theme }) => theme.color.purple};
`;

export default Exhaustion;
