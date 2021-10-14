import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../../assets/images/prevbtn.svg';

interface headerProps {
  handlePrevStep: () => void;
}

const RequestHeader = ({ handlePrevStep }: headerProps) => {
  return (
    <Container>
      <PrevBtn onClick={handlePrevStep}>
        <PrevIcon />
      </PrevBtn>
      <Title>주문서</Title>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  padding: 24px 16px;
  color: ${({ theme }) => theme.color.black};
`;

const PrevBtn = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
`;

const Title = styled.h1`
  font-size: 18px;
  line-height: 1.4444;
`;

export default RequestHeader;
