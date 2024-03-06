import { useState } from 'react';
const Login = ({ login })=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      email,
      password
    };
    await login(credentials);
  }

  return (
    <form onSubmit={ submit }>
      <input
        placeholder='email'
        value={ email }
        onChange={ ev => setEmail(ev.target.value )}
      />
      <input
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value )}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;