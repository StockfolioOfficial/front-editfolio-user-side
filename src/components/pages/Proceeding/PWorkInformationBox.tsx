import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as RefreshSvg } from '../../../assets/styles/refresh.svg';

interface PWorkInformationProps {
  orderedDatetime: string | undefined;
  dudate: string | undefined;
  assignee: string;
  isSpin: boolean;
  refresh: () => void;
  spinner: () => void;
}

interface refresh {
  isSpin: boolean;
}

const PWorkInformationBox = ({
  orderedDatetime,
  dudate,
  assignee,
  refresh,
  isSpin,
  spinner,
}: PWorkInformationProps) => {
  return (
    <WorkInformationBox>
      <WorkInformationTitle>
        <Title>작업정보</Title>
        <Refresh>
          <RefreshButton
            isSpin={isSpin}
            onClick={() => {
              if (isSpin) {
                return;
              }
              refresh();
              spinner();
            }}
          />
        </Refresh>
      </WorkInformationTitle>
      <WorkInformation>
        <OrderBox>
          <Order>주문일시</Order>
          <OrderInfo>{orderedDatetime}</OrderInfo>
        </OrderBox>
        <OrderBox>
          <Order>납품 예정일</Order>
          <OrderInfo>{dudate}</OrderInfo>
        </OrderBox>
        <OrderBox>
          <Order>담당 편집자</Order>
          <OrderInfo>{assignee}</OrderInfo>
        </OrderBox>
      </WorkInformation>
    </WorkInformationBox>
  );
};

const WorkInformationBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const WorkInformationTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 312px;
  height: 34px;
  margin: 24px 24px 0 24px;
`;

const Title = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

const Refresh = styled.div``;

const RefreshButton = styled(RefreshSvg)<refresh>`
  animation: ${({ isSpin }) =>
    isSpin &&
    css`
      ${rotation} 0.7s infinite linear
    `};
`;

const WorkInformation = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 336px;
  height: 144px;
  margin: 0 12px 0 12px;
  border-radius: 6px;
`;

const OrderBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Order = styled.span`
  color: #77828b;
  margin: 22px 0 0 16px;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
`;

const OrderInfo = styled.span`
  margin: 22px 16px 0 0;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
`;

export default PWorkInformationBox;
