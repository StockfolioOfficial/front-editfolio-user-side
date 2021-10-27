import { useCallback } from 'react';

const useDate = () => {
  const handleDate = useCallback((date: string) => {
    const index = date.indexOf('T');
    const newDate = date.slice(0, index);
    return newDate.replaceAll('-', '/');
  }, []);

  const handleTime = useCallback((date: string) => {
    const tIndex = date.indexOf('T');
    const plusIndex = date.indexOf('.');
    const newDate = date.slice(0, tIndex);
    const newTime = date.slice(tIndex + 1, plusIndex);
    return `${newDate.replaceAll('-', '/')} ${newTime}`;
  }, []);

  return { handleDate, handleTime };
};

export default useDate;
