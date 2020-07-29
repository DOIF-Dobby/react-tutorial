import React, { useReducer, useCallback, useRef } from 'react';
import './App.css';
import Input from './components/Input';
import UserList from './components/UserList';
import useInputs from './hooks/useInputs';

const initialState = {
  users: [
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
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user,
        ),
      };

    case 'REMOVE':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };

    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };

    case 'ADD':
      return {
        ...state,
        users: state.users.concat({
          id: action.id,
          name: action.name,
          email: action.email,
        }),
      };

    case 'RESET':
      return {
        ...state,
        inputs: {
          name: '',
          email: '',
        },
      };
    default:
      return state;
  }
}

function App2() {
  const [{ name, email }, onInputChange, reset] = useInputs({
    name: '',
    email: '',
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(5);

  const onAdd = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: 'ADD',
        id: nextId.current,
        name,
        email,
      });

      nextId.current += 1;
      reset();
    },
    [name, email, reset],
  );

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE',
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  }, []);

  return (
    <>
      <Input
        name={name}
        email={email}
        onInputChange={onInputChange}
        onAdd={onAdd}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
    </>
  );
}

export default App2;
