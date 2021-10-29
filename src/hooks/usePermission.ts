import { useHistory } from 'react-router';

const usePermission = () => {
  const history = useHistory();

  const checkToken = () => {
    if (!localStorage.getItem('edit-token')) {
      alert('로그인이 필요합니다.');
      history.push('/');
    }
  };

  return { checkToken };
};

export default usePermission;
