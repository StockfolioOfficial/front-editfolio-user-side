import React, { useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import styled from 'styled-components';
import useStore from 'hooks/useStore';
import ModalForm from 'components/modals/ModalForm';
import CheckedUpload from './CheckedUpload';
import RequestHeader from './RequestHeader';
import Requirement from './Requirement';
import Step from './Step';
import Upload from './Upload';

const Request = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [demand, setDemand] = useState('');

  const { modal } = useStore();

  const handleNextStep = () => {
    if (step === 2 && demand.length === 0) {
      modal.openModal();
      return;
    }
    const nextStep = step === 1 ? 2 : 3;
    setStep(nextStep);
  };

  const handlePrevStep = () => {
    const prevStep = step === 3 ? 2 : 1;
    setStep(prevStep);
  };

  const handleDemand = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDemand(event.target.value);
  };

  const CURRENT_STEP = {
    1: <Upload handleNextStep={handleNextStep} />,
    2: (
      <Requirement
        handleNextStep={handleNextStep}
        handleDemand={handleDemand}
        demand={demand}
      />
    ),
    3: <CheckedUpload demand={demand} />,
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
    <Container>
      <RequestHeader handlePrevStep={handlePrevStep} />
      <Step step={step} />
      {CURRENT_STEP[step]}
      {useObserver(
        () => modal.isShow && <ModalForm content={modal.createModal(MODAL)} />,
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 760px;
  margin: 0 auto;
  border: 1px solid black;
`;

export default Request;
