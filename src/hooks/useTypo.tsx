import React from 'react';

const useTypo = () => {
  const handleLineChange = (longWord: string) => {
    return (
      <p>
        {longWord.split('\n').map((word: string, i) => (
          <>
            {i !== 0 && <br />}
            <span key={`line ${i + 1} - ${word}`}>{word}</span>
          </>
        ))}
      </p>
    );
  };

  return { handleLineChange };
};

export default useTypo;
