import React, { useEffect, useRef } from 'react';
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

  return <div ref={checkIcon} />;
};

export default useLottie;
