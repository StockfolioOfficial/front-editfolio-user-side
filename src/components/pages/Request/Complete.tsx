import React from 'react';
import styled from 'styled-components';

const Complete = () => {
  return (
    <Container>
      <Lottie src="/images/check.png" />
      <Description>제작 의뢰가 완료되었습니다</Description>
      <SubDescription>주문서 확인 후 연락드리겠습니다.</SubDescription>
      <Button>확인</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Lottie = styled.img`
  width: 160px;
  height: 160px;
  margin-top: 87px;
`;

const Description = styled.p`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color.black};
  font-size: 18px;
  line-height: 1.4444444444;
  font-weight: 700;
`;

const SubDescription = styled.p`
  color: ${({ theme }) => theme.color.gray};
  font-size: 12px;
  line-height: 1.5;
`;

const Button = styled.button`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 336px;
  height: 48px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.color.purple};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
  transform: translateX(-50%);
`;

export default Complete;