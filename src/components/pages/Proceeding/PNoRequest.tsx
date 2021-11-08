import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

interface PNoRequestProps {
  oneDriveLink?: string;
}

const PNoRequest = ({ oneDriveLink }: PNoRequestProps) => {
  const history = useHistory();
  const goToRequest = () => {
    history.push('/request', {
      oneDriveLink,
    });
  };

  return (
    <NoRequest>
      <NoProceedingText>진행 중인 영상제작 의뢰가 없습니다.</NoProceedingText>
      <StateProceedingText>
        아래 제작 의뢰를 눌러 영상편집 의뢰를 시작하세요.
      </StateProceedingText>
      <RequestButton onClick={goToRequest}>제작 의뢰</RequestButton>
    </NoRequest>
  );
};

PNoRequest.defaultProps = {
  oneDriveLink: undefined,
};

const NoRequest = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0 32px;
`;

const NoProceedingText = styled.div`
  height: 26px;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  line-height: 26px;
`;

const StateProceedingText = styled.div`
  height: 18px;
  margin-bottom: 58px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
  color: #77828b;
`;

const RequestButton = styled.button`
  height: 48px;
  background-color: #5d4ee8;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: #ffffff;
`;

export default PNoRequest;
