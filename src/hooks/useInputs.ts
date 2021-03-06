import { useState, useCallback } from 'react';

interface ValuesObjType {
  [key: string]: string;
}

const useInput = (initialValues: ValuesObjType) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    },
    [values],
  );

  const handleSubmit = useCallback(
    (submitAction) => {
      submitAction();
    },
    [values],
  );

  const reset = useCallback(() => setValues(initialValues), [initialValues]);

  return { values, handleChange, handleSubmit, reset };
};

export default useInput;
