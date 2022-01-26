import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../../../assets/images/prevbtn.svg';

interface headerProps {
  handlePrevStep: () => void;
}

const RequestHeader = ({ handlePrevStep }: headerProps) => {
  return (
    <Container>
      <Title>주문서</Title>
      <PrevBtn onClick={handlePrevStep}>
        <PrevIcon />
      </PrevBtn>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  padding: 24px 16px;
  color: ${({ theme }) => theme.color.black};
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const PrevBtn = styled.button`
  width: 24px;
  display: flex;
  position: absolute;
  left: 12px;
  padding: 0;
  order: -1;
`;

export default RequestHeader;
