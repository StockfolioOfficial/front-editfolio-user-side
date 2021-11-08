import React from 'react';
import styled from 'styled-components';
import FetchData from '../../../service/fetch';

interface checkedProps {
  handleSuccess: () => void;
  handleSubmit: (submitAction: () => void) => void;
  reset: () => void;
  requirement: string;
  openOneDrive: () => void;
}

interface ButtonStyle {
  backColor: 'skyblue' | 'purple';
}

const CheckedUpload = ({
  handleSubmit,
  handleSuccess,
  reset,
  requirement,
  openOneDrive,
}: checkedProps) => {
  const fetch = new FetchData();
  const newRequirement = requirement.length === 0 ? '없음' : requirement;
  return (
    <>
      <Button backColor="skyblue" onClick={() => openOneDrive()}>
        업로드 확인
      </Button>
      <RequirementTitle># 요구사항</RequirementTitle>
      <RequirementContent>
        {requirement.length === 0 ? '없음' : requirement}
      </RequirementContent>
      <Button
        backColor="purple"
        onClick={() => {
          handleSubmit(() => {
            if (requirement.length === 0) reset();
          });
          fetch.requirement(newRequirement);
          handleSuccess();
        }}
      >
        완료
      </Button>
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
