import React from 'react';
import styled from 'styled-components';
import useTypo from 'hooks/useTypo';
import { useHistory } from 'react-router-dom';

interface WorkStatusBoxProps {
  links?: string[];
  content: string;
  emoji: string;
}

const PWorkStatusBox = ({ links, content, emoji }: WorkStatusBoxProps) => {
  const history = useHistory();
  const { handleLineChange } = useTypo();
  const isNoLink = !(links && links.length > 0);

  function goUploadLink() {
    history.push('/upload-link', {
      links,
    });
  }

  return (
    <Root>
      <Title>작업상태</Title>
      <WorkStatusBox>
        <Emogi>{!isNoLink ? emoji : '😊'}</Emogi>
        <WorkStatus>
          {!isNoLink
            ? handleLineChange(content)
            : '고객님의 영상을 기다리는 중이에요.'}
        </WorkStatus>
      </WorkStatusBox>
      <ButtonWrap>
        {isNoLink ? (
          <LinkUploadButton type="button" onClick={() => goUploadLink()}>
            영상 업로드
          </LinkUploadButton>
        ) : (
          <MoreLinkButton type="button" onClick={() => goUploadLink()}>
            편집자에게 더 보내줄 영상이 있으신가요?
          </MoreLinkButton>
        )}
      </ButtonWrap>
    </Root>
  );
};

PWorkStatusBox.defaultProps = {
  links: undefined,
};

const Root = styled.div`
  margin-top: 32px;
`;

const Title = styled.div`
  margin: 0 0 12px 12px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;

const WorkStatusBox = styled.div`
  padding: 32px 0;
  border-radius: 16px;
  background-color: #ffffff;
  text-align: center;
`;

const Emogi = styled.p`
  margin-bottom: 16px;
  font-size: 100px;
`;

const WorkStatus = styled.p`
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: #5d4ee8;
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const LinkUploadButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 13px 0;
  background-color: #5d4ee8;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: #ffffff;
`;

const MoreLinkButton = styled.button`
  margin-top: 24px;
  margin-left: auto;
  padding: 6px 0;
  font-size: 13px;
  line-height: 20px;
  color: #2ec7a2;
  text-decoration: underline;
`;

export default PWorkStatusBox;
