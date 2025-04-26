import { useState } from 'react'
import './App.css'
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='*' element={<Register />} />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
