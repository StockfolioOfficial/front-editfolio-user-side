import useStore from 'hooks/useStore';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as AddIcon } from '../../../assets/images/ic_add_line_24.svg';
import { ReactComponent as CloseIcon } from '../../../assets/images/ic_cancel_line_24.svg';

interface uploadProps {
  handleNextStep: () => void;
  links: string[];
  setLinks: (links: string[]) => void;
}

const Upload = ({ handleNextStep, links, setLinks }: uploadProps) => {
  const { modal } = useStore();
  const [readyUpload, setReady] = useState<boolean>(false);
  const [uploadLinks, setUploadLinks] = useState<string[]>(
    links.length > 0 ? links : [''],
  );

  return (
    <>
      <Root>
        {!readyUpload ? (
          <div>
            <NoticeNoReady>
              <NoticeNoReadyTitle>
                아직 영상이 준비되지 않았다면?
              </NoticeNoReadyTitle>
              <NoticeNoReadyContent>
                먼저 제작 의뢰 후 영상은 나중에 업로드해도 되요!
                <br />
                나중에 업로드 하실때는 메인화면의 업로드버튼을 눌러 영상을
                업로드해주세요.
              </NoticeNoReadyContent>
            </NoticeNoReady>
            <Button onClick={() => setReady(true)}>
              네, 영상이 준비 되었어요.
            </Button>
            <LineButton onClick={handleNextStep}>
              아직이요. 나중에 올릴께요!
            </LineButton>
          </div>
        ) : (
          <div>
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
                    <FileLinkInput
                      type="text"
                      id={`파일 #${i + 1}`}
                      value={link}
                      onChange={(e) =>
                        setUploadLinks(
                          uploadLinks.map((upload, ui) =>
                            ui === i ? e.currentTarget.value : upload,
                          ),
                        )
                      }
                      placeholder="파일의 링크를 입려해주세요."
                    />
                    <FileLinkRemoveButton
                      type="button"
                      title="파일 링크 삭제 버튼"
                      onClick={() => {
                        modal.setContent({
                          description: '파일 링크를 삭제할까요',
                          subDescription:
                            '파일의 수정은 삭제 후\n링크를 추가해주세요.',
                          actionButton: () =>
                            setUploadLinks(
                              uploadLinks.filter((_, ui) => ui !== i),
                            ),
                        });
                        modal.openModal();
                      }}
                    >
                      <CloseIcon />
                    </FileLinkRemoveButton>
                  </li>
                ))}
              </FileLinkList>
              <AddLinkInputButton
                type="button"
                onClick={() => setUploadLinks([...uploadLinks, ''])}
              >
                <AddIcon />
                <br />
                링크 추가하기
              </AddLinkInputButton>
            </FileLinkListWrap>
            <LineButton
              onClick={() => {
                handleNextStep();
                setLinks(uploadLinks.filter((link) => link !== ''));
              }}
            >
              다음
            </LineButton>
          </div>
        )}
      </Root>
    </>
  );
};

const Root = styled.div`
  width: 100%;
  padding: 0 16px 60px;
`;

const Button = styled.button`
  width: 100%;
  margin-bottom: 12px;
  padding: 13px 0;
  font-weight: 500;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.purple};
  border-radius: 6px;
`;

const LineButton = styled(Button)`
  ${({ theme }) => css`
    background: ${theme.color.white};
    color: ${theme.color.darkGray};
    border: 1px solid ${theme.color.stone};
  `};

  margin-bottom: 0;
`;

const NoticeNoReady = styled.div`
  margin-bottom: 24px;
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.gray};
`;

const NoticeNoReadyTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  color: ${({ theme }) => theme.color.gray};
`;

const NoticeNoReadyContent = styled.p`
  display: list-item;
  margin-left: 2em;
  list-style-type: disc;
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

const FileLinkInput = styled.input`
  ${({ theme }) => css`
    color: ${theme.color.black};
    background: ${theme.color.white};
    border: 1px solid ${theme.color.stone};

    &::placeholder {
      color: ${theme.color.paleBlue};
    }
  `}

  width: 100%;
  padding: 13px 48px 13px 12px;
  font-size: 13px;
  line-height: 20px;
  border-radius: 6px;
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

export default Upload;
