import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Register = ({ register })=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  const submit = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      email,
      password
    };
    await register(credentials);
    // navigate('/account');

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
      <button>Register</button>
    </form>
  );
};

export default Register;