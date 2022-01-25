import { useHistory } from 'react-router';

const usePermission = () => {
  const history = useHistory();

  const checkToken = () => {
    const token = localStorage.getItem('editfolio-token');
    if (token) return true;
    alert('로그인이 필요합니다.');
    history.push('/');
    return false;
  };

  return { checkToken };
};

export default usePermission;
