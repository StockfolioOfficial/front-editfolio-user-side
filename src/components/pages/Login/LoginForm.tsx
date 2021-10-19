import React from 'react';
import styled from 'styled-components';

const LoginForm = () => {
  return (
    <Form>
      {INPUTS.map((item) => (
        <>
          <Label>{item.label}</Label>
          <Input placeholder={item.placeholder} />
        </>
      ))}
      <Button>로그인</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  width: 100%;
  margin-bottom: 8px;
  padding-left: 12px;
  color: ${({ theme }) => theme.color.gray};
  font-size: 11px;
  line-height: 1.4545454545;
`;

const Input = styled.input`
  width: 336px;
  margin-bottom: 12px;
  padding: 14px 12px;
  border: 1px solid ${({ theme }) => theme.color.stone};
  border-radius: 6px;

  &::placeholder {
    color: ${({ theme }) => theme.color.paleBlue};
    font-size: 13px;
    line-height: 1.5384615385;
  }
`;

const Button = styled.button`
  width: 336px;
  height: 48px;
  margin-top: 24px;
  background-color: ${({ theme }) => theme.color.purple};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.white};
`;

export default LoginForm;

const INPUTS = [
  {
    label: '이메일',
    placeholder: '이메일을 입력해주세요.',
  },
  {
    label: '전화번호',
    placeholder: '전화번호를 입력해주세요.',
  },
];
