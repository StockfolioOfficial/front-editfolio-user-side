const useStatus = () => {
  const handleStatus = (status: number | undefined) => {
    if (!status) {
      return ['', ''];
    }

    switch (status) {
      case 1:
        return ['🤔', '영상에 알맞는 편집자를\n 배정 중입니다.'];
        break;

      case 2:
        return ['😍️', '영상을 이쁘게 자르고 붙이는 중...'];
        break;

      case 3:
        return ['🎇️', '아주 환상적인 이펙트를 입히는 중입니다.'];
        break;

      case 4:
        return ['🛠️', '요청하신 수정사항을 작업중입니다.'];
        break;

      case 5:
        return ['😘️', '영상편집이 완료되었습니다'];
        break;

      case 6:
        return ['👀', '배정된 편집자가 영상을\n 열심히 확인하고 있어요'];
        break;

      default:
        return ['', ''];
        break;
    }
  };

  return { handleStatus };
};

export default useStatus;
