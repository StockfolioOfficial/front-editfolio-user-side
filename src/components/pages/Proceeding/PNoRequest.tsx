import React from 'react';
import styled from 'styled-components';

const PNoRequest = () => {
  return (
    <NoRequest>
      <NoProceedingText>진행 중인 영상제작 의뢰가 없습니다.</NoProceedingText>
      <StateProceedingText>
        아래 제작 의뢰를 눌러 영상편집 의뢰를 시작하세요.
      </StateProceedingText>
      <RequestButton>제작 의뢰</RequestButton>
    </NoRequest>
  );
};

const NoRequest = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoProceedingText = styled.div`
  width: 270px;
  height: 26px;
  margin: 60px 45px 8px 45px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  line-height: 26px;
`;

const StateProceedingText = styled.div`
  width: 251px;
  height: 18px;
  margin: 0 54px 55px 54px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
  color: #77828b;
`;

const RequestButton = styled.button`
  width: 336px;
  height: 48px;
  background-color: #5d4ee8;
  border-radius: 6px;
  border: none;
  margin: 0px 12px 238px 12px;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: #ffffff;
`;

export default PNoRequest;
