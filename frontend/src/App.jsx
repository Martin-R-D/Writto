import { useState } from 'react'
import './App.css'
import Register from './pages/register.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
