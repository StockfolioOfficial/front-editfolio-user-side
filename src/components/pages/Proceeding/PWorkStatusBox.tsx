import React from 'react';
import styled from 'styled-components';
import useStatus from 'hooks/useStatus';
import useTypo from 'hooks/useTypo';

interface WorkStatusBoxProps {
  status: number;
}

const PWorkStatusBox = ({ status }: WorkStatusBoxProps) => {
  const { handleStatus } = useStatus();

  const { handleLineChange } = useTypo();

  return (
    <>
      <WorkInformationTitle>
        <Title>작업상태</Title>
      </WorkInformationTitle>
      <WorkStatusBox>
        <Emogi>{handleStatus(status)[0]}</Emogi>
        <WorkStatus>{handleLineChange(handleStatus(status)[1])}</WorkStatus>
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

const WorkStatus = styled.div`
  height: 44px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin: 0 auto;
  color: #5d4ee8;
  text-align: center;
`;

export default PWorkStatusBox;
