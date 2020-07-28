import React, { useRef, useState, useMemo, useCallback } from 'react';
import './App.css';
import Input from './components/Input';
import UserList from './components/UserList';

function getActiveUser(users) {
  console.log('카운팅 중...');
  return users.filter((user) => user.active).length;
}

function App() {
  const nextId = useRef(5);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
  });

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'mj',
      email: 'kjpmj@tnctec.co.kr',
      active: true,
    },
    {
      id: '2',
      name: 'ty',
      email: 'ty@tnctec.co.kr',
      active: false,
    },
    {
      id: '3',
      name: 'hs',
      email: 'hs@tnctec.co.kr',
      active: false,
    },
    {
      id: '4',
      name: 'js',
      email: 'js@tnctec.co.kr',
      active: false,
    },
  ]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onAdd = (e) => {
    e.preventDefault();

    const { name, email } = inputs;

    setUsers(
      users.concat({
        id: nextId.current,
        name,
        email,
      }),
    );

    setInputs({
      name: '',
      email: '',
    });

    nextId.current += 1;
  };

  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  }, []);

  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const count = useMemo(() => getActiveUser(users), [users]);

  return (
    <>
      <Input inputs={inputs} onInputChange={onInputChange} onAdd={onAdd} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성화된 유저수: {count}</div>
    </>
  );
}

export default App;
