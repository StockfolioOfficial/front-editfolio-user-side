import React from 'react';
import styled from 'styled-components';
import FetchData from '../../../service/fetch';

interface checkedProps {
  requestData: {
    links: string[];
    requirement: string;
  };
  handleSuccess: () => void;
}

interface ButtonStyle {
  backColor: 'skyblue' | 'purple';
}

const CheckedUpload = ({ handleSuccess, requestData }: checkedProps) => {
  const { requirement } = new FetchData();

  async function submit() {
    const res = await requirement(requestData.requirement);
    if (res.ok) handleSuccess();
  }

  return (
    <Root>
      <LinksWrap>
        <LinksTitle># 공유파일 링크 확인</LinksTitle>
        {requestData.links.length > 0 ? (
          <LinksList>
            {requestData.links.map((link, i) => (
              <li key={`파일 #${i + 1}`}>
                <LinkIndex>파일 #{i + 1}</LinkIndex>
                <GoLink href={link} target="_blank">
                  공유 링크 확인하기
                </GoLink>
              </li>
            ))}
          </LinksList>
        ) : (
          <NoLinkMessage>
            제작 의뢰 완료 후 꼭 영상을 업로드 해주세요!
          </NoLinkMessage>
        )}
      </LinksWrap>
      <RequirementWrap>
        <RequirementTitle># 요구사항</RequirementTitle>
        <RequirementContent>
          {requestData.requirement.length > 0
            ? requestData.requirement.split('\n').map((word, i) => (
                <>
                  {i !== 0 && <br />}
                  <span key={word}>{word}</span>
                </>
              ))
            : '없음'}
        </RequirementContent>
      </RequirementWrap>
      <Button backColor="purple" onClick={() => submit()}>
        완료
      </Button>
    </Root>
  );
};

const Root = styled.div`
  padding: 0 12px;
`;

const Button = styled.button<ButtonStyle>`
  width: 100%;
  height: 48px;
  background-color: ${({ theme, backColor }) => theme.color[backColor]};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
`;

const LinksWrap = styled.div`
  margin-bottom: 40px;
`;

const LinksTitle = styled.p`
  width: 100%;
  margin-bottom: 12px;
  font-weight: 700;
  line-height: 1.5;
`;

const LinksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LinkIndex = styled.p`
  margin-bottom: 8px;
  font-size: 11px;
  line-height: 16px;
  color: ${({ theme }) => theme.color.gray};
`;

const GoLink = styled.a`
  width: 100%;
  display: block;
  padding: 13px 0;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.skyblue};
  border-radius: 6px;
`;

const NoLinkMessage = styled.p`
  display: list-item;
  margin: 12px 0 0 1.5em;
  list-style-type: disc;
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.skyblue};
`;

const RequirementWrap = styled(LinksWrap)``;

const RequirementTitle = styled(LinksTitle)``;

const RequirementContent = styled.p`
  width: 100%;
  padding: 12px;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  > span:not(:first-child) {
    margin-top: 0.24em;
  }
`;

export default CheckedUpload;
