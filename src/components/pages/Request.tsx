import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import usePermission from 'hooks/usePermission';
import CheckedUpload from './Request/CheckedUpload';
import Complete from './Request/Complete';
import RequestHeader from './Request/RequestHeader';
import Requirement from './Request/Requirement';
import Step from './Request/Step';
import Upload from './Request/Upload';

interface RequestDataType {
  links: string[];
  requirement: string;
}

const initRequestData: RequestDataType = {
  links: [],
  requirement: '',
};

const Request = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [requestData, setRequestData] =
    useState<RequestDataType>(initRequestData);

  const { checkToken } = usePermission();

  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  const handleNextStep = (next: 2 | 3) => {
    setStep(next);
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

  const StepContent = ({ step }: { step: 1 | 2 | 3 }) => {
    switch (step) {
      case 1:
        return (
          <Upload
            handleNextStep={() => handleNextStep(2)}
            links={requestData.links}
            setLinks={(links) =>
              setRequestData({
                ...requestData,
                links,
              })
            }
          />
        );
      case 2:
        return (
          <Requirement
            initRequirement={requestData.requirement}
            handleNextStep={() => handleNextStep(3)}
            handleChange={(value: string) =>
              setRequestData({
                ...requestData,
                requirement: value,
              })
            }
          />
        );
      case 3:
        return (
          <CheckedUpload
            requestData={requestData}
            handleSuccess={handleSuccess}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <RequestHeader handlePrevStep={handlePrevStep} />
      {!isSuccess ? (
        <>
          <Step step={step} />
          <StepContent step={step} />
        </>
      ) : (
        <Complete />
      )}
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  max-width: 360px;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.white};
`;

export default Request;
