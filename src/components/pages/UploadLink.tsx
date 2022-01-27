import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useStore from 'hooks/useStore';
import { ReactComponent as AddIcon } from '../../assets/images/ic_add_line_24.svg';
import { ReactComponent as CloseIcon } from '../../assets/images/ic_cancel_line_24.svg';

const UploadLink = () => {
  const { state } = useLocation();
  const { links } = state as { links: undefined | string };
  const history = useHistory();
  const { modal } = useStore();
  const [uploadLinks, setUploadLinks] = useState<string[]>(
    links ? JSON.parse(links) : [],
  );

  async function addFileLinks() {
    let clip: undefined | string = '';
    try {
      clip = await navigator.clipboard.readText();
    } catch (err) {
      clip = undefined;
    }
    const urlReg =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    if (!clip || (clip && !urlReg.test(clip)))
      modal.setContent({
        description: '알 수 없는 링크에요.',
        subDescription: '복사한 주소를 확인 후\n다시 시도해보세요.',
        actionButton: () => modal.closeModal(),
        isOnlyOk: true,
      });
    else
      modal.setContent({
        description: '붙여넣기 할까요?',
        subDescription: clip || '',
        actionButton: () => {
          if (clip) setUploadLinks([...uploadLinks, clip]);
          modal.closeModal();
        },
      });
    modal.openModal();
  }

  function setLinks() {
    // !api: 링크 설정
    console.log(uploadLinks.filter((link) => link !== ''));
    history.push('/main');
  }

  return (
    <Container>
      <Header>
        <img src="./images/Logo.png" alt="editfolio" />
      </Header>
      <Main>
        <HowToUpload>
          <HowToUploadTitle># 업로드하는 방법</HowToUploadTitle>
          <HowToUploadStepList>
            {HowRoUploadStep.map((howTo) => (
              <li key={howTo}>{howTo}</li>
            ))}
          </HowToUploadStepList>
        </HowToUpload>
        <GoCloudLink href="https://cloud.stockfolio.ai/" target="_blank">
          업로드(Cloud로 이동)
        </GoCloudLink>
        <FileLinkListWrap>
          <FileLinkListTitle>편집 파일 링크</FileLinkListTitle>
          <FileLinkList>
            {uploadLinks.map((link, i) => (
              <li key={`편집 파일 링크 - ${i + 1}`}>
                <FileLinkLabel htmlFor={`파일 #${i + 1}`}>
                  파일 #{i + 1}
                </FileLinkLabel>
                <FileLinkAnchor href={link} target="_blank">
                  <span>{link}</span>
                </FileLinkAnchor>
                <FileLinkRemoveButton
                  type="button"
                  title="파일 링크 삭제 버튼"
                  onClick={() => {
                    modal.setContent({
                      description: '파일 링크를 삭제할까요',
                      subDescription:
                        '파일의 수정은 삭제 후\n링크를 추가해주세요.',
                      actionButton: () => {
                        setUploadLinks(uploadLinks.filter((_, ui) => ui !== i));
                        modal.closeModal();
                      },
                    });
                    modal.openModal();
                  }}
                >
                  <CloseIcon />
                </FileLinkRemoveButton>
              </li>
            ))}
          </FileLinkList>
          <AddLinkInputButton type="button" onClick={() => addFileLinks()}>
            <AddIcon />
            <br />
            링크 추가하기
          </AddLinkInputButton>
        </FileLinkListWrap>
        <LineButton onClick={() => setLinks()}>완료</LineButton>
      </Main>
    </Container>
  );
};

const LineButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.color.white};
    color: ${theme.color.darkGray};
    border: 1px solid ${theme.color.stone};
  `};

  width: 100%;
  margin-bottom: 0;
  padding: 13px 0;
  font-weight: 500;
  border-radius: 6px;
`;

const Container = styled.div`
  display: flex;
  max-width: 360px;
  min-height: 100vh;
  flex-direction: column;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.white};
`;

const Header = styled.header`
  height: 60px;
  padding: 15px 0 0 18px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Main = styled.main`
  margin-bottom: 60px;
  padding: 16px 12px 0;
`;

const HowToUpload = styled.div`
  margin-bottom: 44px;
`;

const HowToUploadTitle = styled.h3`
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.color.gray};
`;

const HowToUploadStepList = styled.ol`
  padding-left: 2em;
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.gray};

  > li {
    list-style-type: number;
  }
`;

const GoCloudLink = styled.a`
  width: 100%;
  display: block;
  margin-bottom: 32px;
  padding: 13px 0;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.purple};
  border-radius: 6px;
`;

const FileLinkListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const FileLinkListTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: ${({ theme }) => theme.color.black};
`;

const FileLinkList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > li {
    position: relative;
  }
`;

const FileLinkLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.gray};
`;

const FileLinkAnchor = styled.a`
  ${({ theme }) => css`
    background: ${theme.color.white};
    color: ${theme.color.black};
    border: 1px solid ${theme.color.stone};
  `};

  display: block;
  width: 100%;
  margin-bottom: 0;
  padding: 14px 48px 14px 12px;
  font-weight: 500;
  border-radius: 6px;

  > span {
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const FileLinkRemoveButton = styled.button`
  display: flex;
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

const AddLinkInputButton = styled.button`
  display: inline-block;
  margin-top: 24px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.color.purple};
`;

const HowRoUploadStep = [
  '아래 업로드 버튼을 눌러 클라우드로 이동해주세요.',
  '편집하실 파일을 업로드해주세요.',
  '각 파일의 상세페이지에서 "공유"을 눌러 복사된 주소를 아래에 입력해주세요.',
];

export default UploadLink;
