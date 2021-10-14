import React from 'react';
import styled from 'styled-components';

const PBtnBox = () => {
  return (
    <>
      <BtnBox>
        <FixRequestBtn>수정 요청</FixRequestBtn>
        <FixNoneBtn>수정사항 없음</FixNoneBtn>
      </BtnBox>
      <Additional>추가 수정 결제</Additional>
    </>
  );
};

const BtnBox = styled.div`
  display: flex;
  justify-content: space-around;
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

const Additional = styled.button`
  display: flex;
  text-align: center;
  justify-content: center;
  border: none;
  width: 336px;
  height: 48px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  background-color: #ffffff;
  margin: 16px 12px 60px 12px;
  padding-top: 16px;
`;

export default PBtnBox;
