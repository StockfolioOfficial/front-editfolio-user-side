import React from 'react';
import { modalContent } from 'stores/modal';
import styled from 'styled-components';
import useStore from '../../hooks/useStore';

interface buttonProps {
  color: 'purple' | 'white';
  hoverColor: '#EEEEEE' | '#4739C1';
}

interface modalProps {
  content: modalContent;
}

const ModalForm = ({ content }: modalProps) => {
  const { modal } = useStore();
  const { description, subDescription, actionButton, isOnlyOk } = content;
  const onClose = () => {
    modal.closeModal();
  };

  return (
    <Background>
      <Container>
        <Description>{description}</Description>
        <SubDescriptionBox>
          <SubDescription>
            {subDescription.split('\n').map((word) => (
              <>{word}</>
            ))}
          </SubDescription>
        </SubDescriptionBox>
        <ButtonBox>
          {!isOnlyOk ? (
            <>
              <Button color="white" hoverColor="#EEEEEE" onClick={onClose}>
                아니오
              </Button>
              <Button
                color="purple"
                hoverColor="#4739C1"
                onClick={actionButton}
              >
                예
              </Button>
            </>
          ) : (
            <Button color="purple" hoverColor="#4739C1" onClick={actionButton}>
              확인
            </Button>
          )}
        </ButtonBox>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  width: 100vmax;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100000;
`;

const Container = styled.div`
  width: 312px;
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 6px;
  overflow: hidden;
  transform: translate(-50%, -50%);
`;

const Description = styled.p`
  margin: 48px 12px 16px 12px;
  text-align: center;
`;

const SubDescriptionBox = styled.div`
  margin-bottom: 43px;
  padding: 0 12px;
`;

const SubDescription = styled.p`
  color: ${({ theme }) => theme.color.gray};
  font-size: 11px;
  line-height: 1.4545454545;
  text-align: center;
  word-break: break-all;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
`;

const Button = styled.button<buttonProps>`
  width: 100%;
  padding: 13px 0;
  background-color: ${({ theme, color }) => theme.color[color]};
  border-top: 1px solid ${({ theme }) => theme.color.stone};
  color: ${({ theme, color }) =>
    color === 'purple' ? theme.color.white : theme.color.black};
  font-size: 14px;
  line-height: 1.5714285714;

  :hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

export default ModalForm;
