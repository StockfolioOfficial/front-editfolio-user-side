import React from 'react';
import styled from 'styled-components';

interface stepProps {
  step: number;
}

interface activeProps {
  isActive: boolean;
}

const Step = ({ step }: stepProps) => {
  return (
    <Container>
      <Cover />
      <StepList step={step}>
        {STEP.map((item) => (
          <StepItem key={item.id}>
            <Number isActive={item.number === step}>{item.number}</Number>
            <DescriptionBox>
              {item.description.split('\n').map((word) => (
                <Description key={word} isActive={item.number === step}>
                  {word}
                </Description>
              ))}
            </DescriptionBox>
          </StepItem>
        ))}
      </StepList>
      <ReverseCover />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 188px;
  margin-bottom: 24px;
  padding: 0 16px;
  overflow: hidden;
`;

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 360px;
  height: 60px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  transform: rotate(-180deg);
  z-index: 1;
`;

const StepList = styled.ul<stepProps>`
  margin-top: 56px;
  transform: ${({ step }) => `translateY(-${(step - 1) * 80}px)`};
  transition: transform 600ms cubic-bezier(0, 0, 0.67, 0.28);
`;

const StepItem = styled.li`
  display: flex;
  margin-bottom: 24px;
`;

const ReverseCover = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 360px;
  height: 100px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  z-index: 1;
`;

const Number = styled.p<activeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 12px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.color.purple : theme.color.stone};
  border-radius: 50%;
  color: ${({ theme, isActive }) =>
    isActive ? theme.color.white : theme.color.gray};
  font-size: 18px;
  line-height: 1.4444;
  font-weight: 700;
  text-align: ceneter;
  transition: all 700ms ease-out;
`;

const DescriptionBox = styled.div`
  margin-top: 8px;
`;

const Description = styled.p<activeProps>`
  width: 268px;
  color: ${({ theme }) => theme.color.darkGray};
  line-height: 1.5;
  font-weight: 400;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.3')};
  transition: all 200ms ease-out;
`;

export default Step;

const STEP = [
  {
    id: 1,
    number: 1,
    description: '????????? ?????????????????????.',
  },
  {
    id: 2,
    number: 2,
    description:
      '??????????????? ????????? ??????????????????\n ??????????????? ????????? ???????????????. ',
  },
  {
    id: 3,
    number: 3,
    description: `???????????? ????????? ??? ???????????? ????????????,\n ????????? ??????????????? ????????? ????????????\n ??? ??? ??? ??????????????????!`,
  },
];
