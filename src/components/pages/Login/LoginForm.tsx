import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import useInput from 'hooks/useInputs';
import useValidate from 'hooks/useValidate';
import FetchData from '../../../service/fetch';

const LoginForm = () => {
  const { values, handleChange, handleSubmit, reset } = useInput({
    email: '',
    phone: '',
  });

  const { isValid, error, handleError, handleFailed } = useValidate(values);

  const fetch = new FetchData();

  const history = useHistory();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    handleError();
    if (!isValid) {
      e.preventDefault();
      reset();
      return;
    }
    e.preventDefault();
    handleSubmit(() => {
      fetch.fetchLogin(values).then((res) => {
        if (res.status > 400) {
          handleFailed();
          return;
        }

        if (res.token) {
          localStorage.setItem('edit-token', res);
          alert('환영합니다.');
          history.push('/main');
        }
      });
    });
  };

  return (
    <Form onSubmit={handleLogin}>
      {INPUTS.map((item) => (
        <Fragment key={item.id}>
          <Label htmlFor={item.id}>{item.label}</Label>
          <Input
            placeholder={item.placeholder}
            id={item.id}
            name={item.id}
            onChange={handleChange}
            value={values[item.id]}
          />
        </Fragment>
      ))}
      <ErrorMesage>{error}</ErrorMesage>
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

const ErrorMesage = styled.p`
  width: 100%;
  margin-top: -4px;
  padding-left: 12px;
  color: ${({ theme }) => theme.color.purple};
  font-size: 13px;
  line-height: 1.5384615385;
`;

export default LoginForm;

const INPUTS = [
  {
    id: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해주세요.',
  },
  {
    id: 'phone',
    label: '전화번호',
    placeholder: '전화번호를 입력해주세요.',
  },
];
