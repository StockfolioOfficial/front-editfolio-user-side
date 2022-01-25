import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as RefreshSvg } from '../../../assets/styles/refresh.svg';

interface PWorkInformationProps {
  orderedDatetime: string | undefined;
  dudate: string | undefined;
  assignee: string;
  refresh: () => void;
}

interface refresh {
  isSpin: boolean;
}

const PWorkInformationBox = ({
  orderedDatetime,
  dudate,
  assignee,
  refresh,
}: PWorkInformationProps) => {
  const [isSpin, setSpin] = useState<boolean>(false);
  const spinner = () => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 2000);
  };
  return (
    <WorkInformationBox>
      <WorkInformationTitle>
        <Title>작업정보</Title>
        <Refresh>
          <RefreshButton
            isSpin={isSpin}
            onClick={() => {
              if (isSpin) return;
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
          <OrderAssignee noData={!!assignee}>{assignee}</OrderAssignee>
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
  height: 34px;
  margin-top: 24px;
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
  cursor: pointer;
  animation: ${({ isSpin }) =>
    isSpin &&
    css`
      ${rotation} 0.7s infinite linear
    `};
`;

const WorkInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 22px 16px;
  background-color: #ffffff;
  border-radius: 6px;
`;

const OrderBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Order = styled.span`
  color: #77828b;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
`;

const OrderInfo = styled.span`
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
`;

const OrderAssignee = styled(OrderInfo)<{ noData?: boolean }>`
  color: ${({ noData }) => (!noData ? '#6ab4f7' : '#BECBD8')};
`;

export default PWorkInformationBox;
