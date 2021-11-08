import React from 'react';
import styled from 'styled-components';

const Exhaustion = () => {
  return (
    <Container>
      <Description>
        영상제작 의뢰횟수를 <br />
        모두 소진하였어요.
      </Description>
      <SubDescription>
        추가적인 의뢰는 1회 편집권을 구매하여
        <br /> 영상편집 의뢰가 가능합니다.
      </SubDescription>
      <Link href="https://editfolio.ai/editmenu/?idx=5" target="_blank">
        1회 편집권 구매하러 가기
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
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.mint};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;

export default Exhaustion;
