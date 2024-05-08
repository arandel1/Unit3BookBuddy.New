import { useEffect, useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import Navigations from './components/Navigations'
import { Route, Routes, Link } from 'react-router-dom'
import SingleBook from './components/SingleBook'
import Account from './components/Account'

function App() {

  const [books, setBooks] = useState([]);
  const [auth, setAuth] = useState({});
  const [reservations, setReservations] = useState([]);

// Log in with Token
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

// auth
  useEffect(() => {
    // console.log(auth);
    if(auth.id){
      getReservations;
    }
    else {
      setReservations([])
    }
  }, [auth])


// LOGIN
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


// REGISTER
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

// LOGOUT
  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  // Get Books
  useEffect(() => {
    const fetchBooks = async() => {
      const response = await fetch ('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
      const json = await response.json();
      setBooks(json.books);

    };
     fetchBooks();

  }, []);

// Get Reservations
  const getReservations = async () => {
   try { let response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations',
    {
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    );
    const json = await response.json();
      console.log(json)
    } catch (error) {
      console.error("Could not fetch reservations:", error);
    }
  } 
  getReservations();


  return (
    <>
    <br/>
    <br/>
    <br/>
    
    <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
    <nav>
      <Link to='/books'>Books</Link>
      {
        auth.id ? (
          <Link to='/account'>Account</Link>
        ) : (null)
      }
    </nav>
    {
      auth.id ? (
        <button onClick={ logout }>Logout</button>
        ):
        (
          <>
            <Login login={ login }/> 
            <Register register={ register }/> 
          </>
        )
    }
    <Routes>

      <Route path='/books/:id' element={ <SingleBook books={ books }/> } />
      
      <Route path='/books' element={ <Books books={ books } /> }/>
      
      {/* <Route path='/books/search/:term' element={  <Books books={ books } />}/> */}

      {
        auth.id ? (
          <Route path='/account' element={<Account auth={ auth } />
            }
          />
        ): (null)
      }
    </Routes>

    </>
  )
}

export default App

