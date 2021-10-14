import React, { useState } from 'react';
import styled from 'styled-components';
import CheckedUpload from './CheckedUpload';
import RequestHeader from './RequestHeader';
import Requirement from './Requirement';
import Step from './Step';
import Upload from './Upload';

const Request = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleNextStep = () => {
    const nextStep = step === 1 ? 2 : 3;
    setStep(nextStep);
  };

  const handlePrevStep = () => {
    const prevStep = step === 3 ? 2 : 1;
    setStep(prevStep);
  };

  const CURRENT_STEP = {
    1: <Upload handleNextStep={handleNextStep} />,
    2: <Requirement handleNextStep={handleNextStep} />,
    3: <CheckedUpload />,
  };

  return (
    <Container>
      <RequestHeader handlePrevStep={handlePrevStep} />
      <Step step={step} />
      {CURRENT_STEP[step]}
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