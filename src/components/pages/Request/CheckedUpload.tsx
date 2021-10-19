import React from 'react';
import styled from 'styled-components';

interface ButtonStyle {
  backColor: 'skyblue' | 'purple';
}

interface checkProps {
  demand: string;
}

const CheckedUpload = ({ demand }: checkProps) => {
  return (
    <>
      <Button backColor="skyblue">업로드 확인</Button>
      <RequirementTitle># 요구사항</RequirementTitle>
      <RequirementContent>
        {demand.length === 0 ? '없음' : demand}
      </RequirementContent>
      <Button backColor="purple">완료</Button>
    </>
  );
};

const Button = styled.button<ButtonStyle>`
  width: 336px;
  height: 48px;
  margin-bottom: 40px;
  background-color: ${({ theme, backColor }) => theme.color[backColor]};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
`;

const RequirementTitle = styled.p`
  width: 100%;
  padding: 12px;
  font-weight: 700;
  line-height: 1.5;
`;

const RequirementContent = styled.p`
  display: flex;
  align-items: center;
  width: 336px;
  height: 46px;
  margin-bottom: 40px;
  padding: 12px;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
`;

export default CheckedUpload;
