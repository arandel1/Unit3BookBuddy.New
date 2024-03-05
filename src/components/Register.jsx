import { useState, useEffect } from 'react';



const Register = ({ register }) => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState('');
  
  const submit = async(e)=> {
    e.preventDefault();
    const credentials = {
      email,
      password
    };
    await register(credentials);
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

      <button>Register</button>
    </form>
  );
};

export default Register;