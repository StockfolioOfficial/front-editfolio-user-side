import React from 'react';

const useTypo = () => {
  const handleLineChange = (longWord: string) => {
    return (
      <>
        {longWord.split('\n').map((word: string) => (
          <p key={word}>{word}</p>
        ))}
      </>
    );
  };

  return { handleLineChange };
};

export default useTypo;
