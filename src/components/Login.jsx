import { useState, useEffect } from 'react';



const Login = ({ login }) => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState('');
  
  const submit = async(e)=> {
    e.preventDefault();
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
        value = { email }
        onChange={ e => setEmail(e.target.value)}
      />

      <input 
        placeholder='password'
        value = { password }
        onChange={ e => setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  );
};

export default Login;