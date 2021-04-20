import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [response, setResponse] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      const res = await window.fetch('http://localhost:4000/auth/register', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        credentials: 'include',

        body: JSON.stringify({ username: name, email, password: pass }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await window.fetch('http://localhost:4000/auth/login', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        credentials: 'include',

        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async (e: any) => {
    try {
      const res = await window.fetch('http://localhost:4000/dashboard', {
        method: 'GET',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        credentials: 'include',
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => handleRegister(e)} style={{ display: 'flex', flexDirection: 'column' }}>
          Register Form
          <input onChange={(e) => setName(e.target.value as any)} value={name} type="text" placeholder="name" />
          <input onChange={(e) => setEmail(e.target.value as any)} value={email} type="text" placeholder="email" />
          <input onChange={(e) => setPass(e.target.value as any)} value={pass} type="text" placeholder="password" />
          <button type="submit">Register</button>
        </form>
        <form onSubmit={(e) => handleLogin(e)} style={{ display: 'flex', flexDirection: 'column' }}>
          Login Form
          <input onChange={(e) => setEmail(e.target.value as any)} value={email} type="text" placeholder="email" />
          <input onChange={(e) => setPass(e.target.value as any)} value={pass} type="text" placeholder="password" />
          <button type="submit">Login</button>
        </form>
        <button style={{ marginTop: '1rem' }} onClick={(e) => getUser(e)}>
          Get User
        </button>
        <div>{response && JSON.stringify(response, null, 2)}</div>
      </header>
    </div>
  );
}

export default App;
