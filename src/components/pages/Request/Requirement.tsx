import useStore from 'hooks/useStore';
import React, { useState } from 'react';
import styled from 'styled-components';

interface requireProps {
  initRequirement: string;
  handleNextStep: () => void;
  handleChange: (value: string) => void;
}

const Requirement = ({
  initRequirement,
  handleNextStep,
  handleChange,
}: requireProps) => {
  const [requirement, setRequirement] = useState(initRequirement);
  const { modal } = useStore();
  const { setContent } = modal;

  function goNext() {
    handleNextStep();
    handleChange(requirement);
  }

  return (
    <>
      <RequirementText
        placeholder="자세하게 적어주실수록 영상의 퀄리티가 올라갑니다."
        onChange={(e) => setRequirement(e.currentTarget.value)}
        value={requirement}
        name="requirement"
      />
      <Button
        onClick={() => {
          if (requirement.length === 0) {
            setContent({
              description: '요구사항 없이 편집합니다.',
              subDescription:
                '*의뢰인의 의도와 상관없이\n영상이 제작될 수 있습니다.',
              actionButton: goNext,
            });
            return;
          }
          goNext();
        }}
      >
        다음
      </Button>
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
