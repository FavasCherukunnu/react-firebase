import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import {Signup} from './pages/signup';
import Home from './pages/Home/home';
import { Login } from './pages/login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useEffect, useState } from 'react';
import { Root } from './pages/Root';

function App() {

  const navigate = useNavigate()
  const [loadedUser,setLoadedUser] = useState(false)

  useEffect(
    ()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          setLoadedUser(true)
          // ...
        } else {
          navigate('/',{replace:true})
          // User is signed out
          // ...
        }
      });
    },[]
  )

  return (
    <div className=' h-screen w-screen'>
        <Routes>
          {loadedUser&&<Route path='/user/*' element={<Root/>}/>}
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
    </div>
  );
}

export default App;
