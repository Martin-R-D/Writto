import { useState } from 'react'
import './App.css'
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
