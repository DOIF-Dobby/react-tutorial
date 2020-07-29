import React from 'react';

const User = React.memo(({ user, onToggle, onRemove }) => {
  console.log('user 리렌더링');

  const style = {
    color: user.active ? 'red' : 'black',
    cursor: 'pointer',
  };

  return (
    <>
      <li style={style} onClick={() => onToggle(user.id)}>
        이름: {user.name} 이메일: {user.email}
      </li>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </>
  );
});

function UserList({ users, onToggle, onRemove }) {
  console.log('userList 렌더링');
  return (
    <ul>
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

export default React.memo(UserList);
