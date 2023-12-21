import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import {Signup} from './pages/signup';
import Home from './pages/Home/home';

function App() {
  return (
    <div className=' h-screen w-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/user' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
