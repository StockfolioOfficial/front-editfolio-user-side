import React from 'react';
import styled from 'styled-components';
import useStore from 'hooks/useStore';

interface PDtnBoxProps {
  remainingEditCount?: number;
  requestEdit: () => void;
  isEditing?: boolean;
}

const PBtnBox = ({
  remainingEditCount,
  requestEdit,
  isEditing,
}: PDtnBoxProps) => {
  const { modal } = useStore();

  return (
    <>
      <BtnBox>
        <FixRequestBtn
          onClick={() => requestEdit()}
          disabled={
            !remainingEditCount
              ? true
              : remainingEditCount < 0 || isEditing || false
          }
        >
          수정 요청({remainingEditCount || 0})
        </FixRequestBtn>
        <FixNoneBtn
          onClick={() => {
            modal.openModal();
          }}
        >
          수정사항 없음
        </FixNoneBtn>
      </BtnBox>
      <Additional href="https://editfolio.ai/shop_view/?idx=21" target="_blank">
        추가 수정 결제
      </Additional>
    </>
  );
};

PBtnBox.defaultProps = {
  remainingEditCount: 0,
  isEditing: false,
};

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const FixRequestBtn = styled.button`
  width: 164px;
  height: 48px;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  background-color: #6ab4f7;

  &:disabled {
    background: ${({ theme }) => theme.color.graySkyblue};
    color: ${({ theme }) => theme.color.stone};
    cursor: default;
  }
`;

const FixNoneBtn = styled.button`
  width: 164px;
  height: 48px;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  background-color: #5d4ee8;
`;

const Additional = styled.a`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  background-color: #ffffff;
`;

export default PBtnBox;
