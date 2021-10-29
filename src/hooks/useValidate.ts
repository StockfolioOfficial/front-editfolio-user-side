import { useState, useCallback } from 'react';

interface ValuesObjType {
  [key: string]: string;
}

const useValidate = (values: ValuesObjType) => {
  const [error, setError] = useState('');

  const emailValid =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const phoneValid = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const isValid =
    emailValid.test(values.email) && phoneValid.test(values.phone);
  const message = isValid ? '' : '전화번호와 이메일을 다시 확인해주세요.';

  const handleError = useCallback(() => {
    setError(message);
  }, [values.email, values.phone]);

  const handleFailed = useCallback(() => {
    const message = '전화번호와 이메일을 다시 확인해주세요.';
    setError(message);
  }, []);

  return { isValid, error, handleError, handleFailed };
};

export default useValidate;
