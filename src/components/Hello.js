import React, { useState } from 'react';

function Hello({ isValid }) {
  const [text, setText] = useState('ddd');

  console.log(isValid);

  const onClickButton = () => {
    setText('123');
  };

  const style = {
    color: 'red',
  };

  return (
    <>
      {isValid && <div>헬로</div>}
      <span style={style}>{text}</span>
      <button onClick={onClickButton}>버튼</button>
    </>
  );
}

export default Hello;
