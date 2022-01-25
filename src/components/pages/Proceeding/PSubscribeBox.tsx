import React from 'react';
import styled from 'styled-components';
import Exhaustion from './Expiration';

interface SubscriptProps {
  start: string | undefined;
  end: string | undefined;
  orderedCnt: number;
}

const PSubscribeBox = ({ start, end, orderedCnt }: SubscriptProps) => {
  return (
    <>
      <SubscribeBox>
        <Subscribe>구독시작일</Subscribe>
        <SubscribeDate>{start || '-'}</SubscribeDate>
      </SubscribeBox>
      <SubscribeBox>
        <Subscribe>구독종료일</Subscribe>
        <SubscribeDate>{end || '-'}</SubscribeDate>
      </SubscribeBox>
      {orderedCnt > 0 ? (
        <NumberOfVideoBox>
          영상편집 의뢰가능횟수가 <span>{orderedCnt}회</span> 남았습니다.
        </NumberOfVideoBox>
      ) : (
        <Exhaustion />
      )}
    </>
  );
};

const SubscribeBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
`;

const Subscribe = styled.div`
  display: flex;
  width: 60px;
  height: 20px;
  color: #77828b;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
`;

const SubscribeDate = styled.div`
  height: 20px;
  color: #232628;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
`;

const NumberOfVideoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 12px 0;
  padding: 14px 0;
  font-size: 13px;
  font-weight: 500;
  background-color: rgb(238, 239, 249);
  border-radius: 16px;

  > span {
    color: #5d4ee8;
    font-weight: 700;
    margin: 0 0.2em;
  }
`;
export default PSubscribeBox;
