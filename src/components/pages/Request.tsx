import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router';
import useInputs from 'hooks/useInputs';
import useStore from 'hooks/useStore';
import usePermission from 'hooks/usePermission';
import ModalForm from 'components/modals/ModalForm';
import Portal from 'components/modals/Portal';
import CheckedUpload from './Request/CheckedUpload';
import Complete from './Request/Complete';
import RequestHeader from './Request/RequestHeader';
import Requirement from './Request/Requirement';
import Step from './Request/Step';
import Upload from './Request/Upload';

interface ParamsType {
  oneDriveLink: string | undefined;
}

const Request = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { values, handleChange, handleSubmit, reset } = useInputs({
    requirement: '',
  });

  const { checkToken } = usePermission();

  const { modal } = useStore();

  const history = useHistory();
  const { state } = useLocation<ParamsType>();

  useEffect(() => {
    checkToken();
  }, []);

  function openOneDrive() {
    if (!state.oneDriveLink) {
      window.alert(
        '아직 업로드 공간이 준비되지 않았습니다.\n고객센터에 연락해주세요.',
      );
      window.open('https://pf.kakao.com/_JAKbs/chat');
      history.push('/main');
      return false;
    }
    const isHttps = /^https:/.test(state.oneDriveLink as string);
    window.open(isHttps ? state.oneDriveLink : `https://${state.oneDriveLink}`);
    return true;
  }

  const handleNextStep = () => {
    if (step === 2 && values.requirement.length === 0) {
      modal.openModal();
      return;
    }
    let isStop = false;
    if (step === 1) {
      isStop = !openOneDrive();
    }
    if (isStop) return;
    setStep(step === 1 ? 2 : 3);
  };

  const handlePrevStep = () => {
    if (isSuccess) {
      setStep(3);
      setIsSuccess(false);
      return;
    }

    if (step === 1) {
      history.push('/main');
      return;
    }

    const prevStep = step === 3 ? 2 : 1;
    setStep(prevStep);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const CURRENT_STEP = {
    1: <Upload handleNextStep={handleNextStep} />,
    2: (
      <Requirement
        handleNextStep={handleNextStep}
        handleChange={handleChange}
        requirement={values.requirement}
      />
    ),
    3: (
      <CheckedUpload
        handleSubmit={handleSubmit}
        handleSuccess={handleSuccess}
        reset={reset}
        requirement={values.requirement}
        openOneDrive={() => openOneDrive()}
      />
    ),
  };

  const MODAL = {
    description: '요구사항 없이 편집합니다.',
    subDescription: '*의뢰인의 의도와 상관없이\n 영상이 제작될 수 있습니다',
    actionButton: () => {
      const nextStep = step === 1 ? 2 : 3;
      setStep(nextStep);
      modal.closeModal();
    },
  };

  return (
    <Background>
      <Container>
        <RequestHeader handlePrevStep={handlePrevStep} />
        {!isSuccess ? (
          <>
            <Step step={step} />
            {CURRENT_STEP[step]}
          </>
        ) : (
          <Complete />
        )}
        {useObserver(
          () =>
            modal.isShow && (
              <Portal>
                <ModalForm content={MODAL} />
              </Portal>
            ),
        )}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #dee4ed;
`;

const Container = styled.section`
  display: flex;
  max-width: 360px;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.white};
`;

export default Request;
