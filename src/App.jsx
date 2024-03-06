import { useEffect, useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import Navigations from './components/Navigations'
import { Route, Routes, Link } from 'react-router-dom'
import Account from './components/Account'

function App() {

  const [books, setBooks] = useState([]);
  const [auth, setAuth] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect (() => {
    const attemptLoginWithToken = async() => {
      const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }  
        });

        const json = await response.json()
        if(response.ok){
          setAuth(json);
        }
    };
    const token = window.localStorage.getItem('token');
    if(token){
      attemptLoginWithToken();

    }
  }, []);

  useEffect(() => {
    console.log(auth);
    if(auth.id){
      console.log('load the reservations');
    }
    else {
      console.log('clear the reservations');
    }
  }, [auth])



const login = async(credentials)=> {
  let response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login',
  {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type' : 'application/json'
    }
  });
  let json = await response.json();
  if(response.ok){
    const token = json.token;
    window.localStorage.setItem('token', token);
    response = await fetch ('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me'), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    json = await response.json();
  if(response.ok){
      setAuth(json);
    }
  }
  else {
    console.log(json)
  }
}



const register = async(credentials)=> {
  let response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register',
  {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type' : 'application/json'
    }
  });
  let json = await response.json();
  if(response.ok){
    const token = json.token;
    window.localStorage.setItem('token', token);
    response = await fetch ('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    json = await response.json();
  if(response.ok){
      setAuth(json);
    }
  }
  else {
    console.log(json)
  }
}

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  useEffect(() => {
    const fetchBooks = async() => {
      const response = await fetch ('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
      const json = await response.json();
      setBooks(json.books);

    };
     fetchBooks();

  }, []);

  return (
    <>
      <Navigations/>
      <br/>
      <br/>
      <br/>
      <h1><img id = 'logo-image' src={bookLogo}/> Library </h1>

      {
        auth.id ? (
          <button onClick={ logout }>Welcome {auth.email } (Click to logout)</button>
          ):
          (
            <>
              <Login login={ login }/> 
              <Register register={ register }/> 
            </>
          )
      }
      <Books books = { books }/>

    </>
  )
}

export default App

