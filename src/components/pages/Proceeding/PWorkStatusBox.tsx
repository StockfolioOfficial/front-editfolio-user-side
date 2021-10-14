import React from 'react';
import styled from 'styled-components';

interface WorkStatusBoxProps {
  stateEmogi: string;
  stateText: string;
}

const PWorkStatusBox = ({ stateEmogi, stateText }: WorkStatusBoxProps) => {
  return (
    <>
      <WorkInformationTitle>
        <Title>작업상태</Title>
      </WorkInformationTitle>
      <WorkStatusBox>
        <Emogi>{stateEmogi}</Emogi>
        <WorkStatus>{stateText}</WorkStatus>
      </WorkStatusBox>
    </>
  );
};

const WorkInformationTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 312px;
  height: 34px;
  margin: 24px 24px 0 24px;
`;

const Title = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;

const WorkStatusBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 336px;
  height: 204px;
  margin: 0 12px 24px 12px;
  border-radius: 16px;
  background-color: #ffffff;
`;

const Emogi = styled.span`
  margin-top: 32px;
  font-size: 100px;
`;

const WorkStatus = styled.span`
  width: 141px;
  height: 44px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin: 0 97.5px 0 97.5px;
  color: #5d4ee8;
  text-align: center;
`;

export default PWorkStatusBox;
