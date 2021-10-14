import React from 'react';
import styled from 'styled-components';

interface SubscriptProps {
  start: string;
  end: string;
  orderedCnt: string;
}

const PSubscribBox = ({ start, end, orderedCnt }: SubscriptProps) => {
  return (
    <>
      <SubscribeBox>
        <Subscribe>구독시작일</Subscribe>
        <SubscribeDate>{start}</SubscribeDate>
      </SubscribeBox>
      <SubscribeBox>
        <Subscribe>구독종료일</Subscribe>
        <SubscribeDate>{end}</SubscribeDate>
      </SubscribeBox>
      <NumberOfVideoBox>
        영상편집 의뢰가능횟수가 {orderedCnt}회 남았습니다.
      </NumberOfVideoBox>
    </>
  );
};

const SubscribeBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 336px;
  height: 40px;
  margin: 0 12px 0px 12px;
`;

const Subscribe = styled.div`
  display: flex;
  width: 60px;
  height: 20px;
  margin: 10px 0 20px 16px;
  color: #77828b;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
`;

const SubscribeDate = styled.div`
  width: 73px;
  height: 20px;
  margin: 10px 16px 10px 0;
  color: #232628;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
`;

const NumberOfVideoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  width: 312px;
  height: 48px;
  border-radius: 16px;
  margin: 16px 24px 0 24px;
  background-color: rgb(238, 239, 249);
`;
export default PSubscribBox;
