import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-web';

const useLottie = () => {
  const checkIcon = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: checkIcon.current as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/data/complete160.json',
    });
  }, []);

  return <CheckIcon ref={checkIcon} />;
};

const CheckIcon = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export default useLottie;
