import React from 'react';
import styled from 'styled-components';

interface uploadProps {
  handleNextStep: () => void;
}

const Upload = ({ handleNextStep }: uploadProps) => {
  return (
    <>
      <Button onClick={handleNextStep}>업로드(OneDrive)</Button>
      <SubText>
        # 작성하신 영상기획서가 있다면 영상과 같이 업로드 해주세요.
      </SubText>
    </>
  );
};

const Button = styled.button`
  width: 336px;
  height: 48px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.color.purple};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
`;

const SubText = styled.p`
  width: 336px;
  color: ${({ theme }) => theme.color.gray};
  font-size: 12px;
  line-height: 1.5;
`;

export default Upload;
