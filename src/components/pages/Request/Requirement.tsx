import React from 'react';
import styled from 'styled-components';

interface requireProps {
  demand: string;
  handleNextStep: () => void;
  handleDemand: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Requirement = ({
  handleNextStep,
  handleDemand,
  demand,
}: requireProps) => {
  return (
    <>
      <RequirementText
        placeholder="자세하게 적어주실수록 영상의 퀄리티가 올라갑니다."
        onChange={handleDemand}
        value={demand}
      />
      <Button onClick={handleNextStep}>다음</Button>
    </>
  );
};

const RequirementText = styled.textarea`
  width: 336px;
  height: 228px;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.color.paleBlue};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.darkGray};
  font-size: 14px;
  line-height: 1.5714285714;
  letter-spacing: 0.0125rem;
  &::placeholder {
    color: ${({ theme }) => theme.color.paleBlue};
  }
`;

const Button = styled.button`
  width: 336px;
  height: 48px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.color.purple};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
`;

export default Requirement;
