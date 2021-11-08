import React from 'react';
import styled from 'styled-components';

const PNotice = () => {
  return (
    <>
      <FooterTitle>
        작업물의 수정이
        <br />
        필요하세요?
      </FooterTitle>
      <NoticeTitle># 유의사항</NoticeTitle>
      <NoticeBox>
        {NOTICELIST.map((word) => (
          <NoticeList key={word}>{word}</NoticeList>
        ))}
      </NoticeBox>
    </>
  );
};

const FooterTitle = styled.div`
  padding-top: 36px;
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;
  color: ${({ theme }) => theme.color.darkGray};
  border-top: 1px solid ${({ theme }) => theme.color.paleBlue};
`;

const NoticeTitle = styled.p`
  margin-top: 44px;
  font-size: 14px;
  line-height: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.gray};
`;

const NoticeBox = styled.ul`
  margin-top: 8px;
  padding-left: 1em;
`;

const NoticeList = styled.li`
  font-size: 13px;
  line-height: 20px;
  color: #77828b;
  list-style: disc;
`;

export default PNotice;

const NOTICELIST: string[] = [
  `완료 후 2일이 지나면 의뢰건이 자동적으로 종료됩니다.
결과물을 확인하시고 수정 요청을 하거나 수정사항 없음을 눌러주세요.`,
  `최대 수정 가능 횟수는 2회 입니다.`,
  `기본 2회 수정 이후 추가 수정이 필요하신 경우 추가 결제를 통한 수정이 이루어집니다.`,
];
