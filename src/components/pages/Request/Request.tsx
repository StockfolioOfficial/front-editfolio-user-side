import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import useInputs from 'hooks/useInputs';
import useStore from 'hooks/useStore';
import usePermission from 'hooks/usePermission';
import ModalForm from 'components/modals/ModalForm';
import Portal from 'components/modals/Portal';
import CheckedUpload from './CheckedUpload';
import Complete from './Complete';
import RequestHeader from './RequestHeader';
import Requirement from './Requirement';
import Step from './Step';
import Upload from './Upload';
import AbnomalRequest from './AbnomalRequest';

const Request = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { values, handleChange, handleSubmit, reset } = useInputs({
    requirement: '',
  });

  const { checkToken } = usePermission();

  const { modal } = useStore();

  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  const handleNextStep = () => {
    if (step === 2 && values.requirement.length === 0) {
      modal.openModal();
      return;
    }
    const nextStep = step === 1 ? 2 : 3;
    setStep(nextStep);
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
      {localStorage.getItem('edit-token') ? (
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
      ) : (
        <AbnomalRequest />
      )}
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #dee4ed;
`;

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 760px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.white};
`;

export default Request;
