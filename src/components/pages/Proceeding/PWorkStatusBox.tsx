import React from 'react';
import styled from 'styled-components';
import useTypo from 'hooks/useTypo';

interface WorkStatusBoxProps {
  content: string;
  emoji: string;
}

const PWorkStatusBox = ({ content, emoji }: WorkStatusBoxProps) => {
  const { handleLineChange } = useTypo();

  return (
    <Root>
      <Title>작업상태</Title>
      <WorkStatusBox>
        <Emogi>{emoji}</Emogi>
        <WorkStatus>{handleLineChange(content)}</WorkStatus>
      </WorkStatusBox>
    </Root>
  );
};

const Root = styled.div`
  margin-top: 32px;
`;

const Title = styled.div`
  margin: 0 0 12px 12px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;

const WorkStatusBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 0;
  border-radius: 16px;
  background-color: #ffffff;
  text-align: center;
`;

const Emogi = styled.p`
  margin-bottom: 16px;
  font-size: 100px;
`;

const WorkStatus = styled.p`
  height: 44px;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: #5d4ee8;
`;

export default PWorkStatusBox;
