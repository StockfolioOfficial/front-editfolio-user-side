import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as RefreshSvg } from '../../../assets/styles/refresh.svg';

interface PWorkInformationProps {
  orderedDatetime: string | undefined;
  dudate: string | undefined;
  assignee: string;
  refresh: () => void;
}

interface RefreshButtonProps {
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
  };
  return (
    <WorkInformationBox>
      <WorkInformationTitle>
        <Title>작업정보</Title>
        <Refresh
          isSpin={isSpin}
          onClick={() => {
            if (isSpin) return;
            refresh();
            spinner();
          }}
        >
          <RefreshSvg />
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
  margin-top: 24px;
`;

const WorkInformationTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  margin-left: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

const Refresh = styled.button<RefreshButtonProps>`
  display: flex;
  margin-right: 12px;
  padding: 4px;
  cursor: pointer;

  > svg {
    animation: ${({ isSpin }) =>
      isSpin &&
      css`
        ${rotation} 0.7s infinite linear
      `};
  }
`;

const WorkInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 12px;
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
