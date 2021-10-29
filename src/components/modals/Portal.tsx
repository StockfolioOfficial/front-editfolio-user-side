import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
  const container = document.getElementById('modal') as Element;
  return ReactDOM.createPortal(children, container);
};

export default Portal;
