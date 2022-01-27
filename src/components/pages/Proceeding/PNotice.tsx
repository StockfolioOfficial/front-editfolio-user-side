import React from 'react';
import styled from 'styled-components';

const PNotice = () => {
  return (
    <>
      <FooterTitle>작업물의 수정이 필요하세요?</FooterTitle>
      <NoticeTitle># 유의사항</NoticeTitle>
      <Notice>
        <NoticeBox>
          {NOTICELIST.map((word) => (
            <NoticeList key={word}>{word}</NoticeList>
          ))}
        </NoticeBox>
      </Notice>
    </>
  );
};

const FooterTitle = styled.div`
  width: 149px;
  height: 64px;
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;
  margin: 36px 0 44px 12px;
`;

const NoticeTitle = styled.span`
  width: 63px;
  height: 22px;
  margin: 44px 0 0 12px;
  color: #77828b;
  font-size: 14px;
  line-height: 22px;
`;

const Notice = styled.div`
  width: 336px;
  height: 120px;
  margin: 8px 12px 0px 0px;
`;

const NoticeBox = styled.ul`
  margin: 0 0 8px 43px;
`;

const NoticeList = styled.li`
  font-size: 13px;
  line-height: 20px;
  color: #77828b;
  list-style: disc;
`;

export default PNotice;

const NOTICELIST: string[] = [
  '완료 후 2일이 지나면 의뢰건이 자동적으로 종료됩니다. 결과물을 확인하시고 수정 요청을 하거나 수정사항 없음을 눌러주세요.',
  '최대 수정 가능 횟수는 2회 입니다.',
  '  기본 2회 수정 이후 추가 수정이 필요하신 경우 추가 결제를 통한 수정이 이루어 집니다.',
];
