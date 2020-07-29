import React from 'react';

function Input({ name, email, onInputChange, onAdd }) {
  return (
    <form onSubmit={onAdd}>
      <input
        value={name}
        placeholder="이름"
        name="name"
        onChange={onInputChange}
      />
      <input
        value={email}
        placeholder="이메일"
        name="email"
        onChange={onInputChange}
      />
      <button>저장</button>
    </form>
  );
}

export default Input;
