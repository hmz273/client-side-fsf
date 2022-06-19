import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from './Auth/login';
import Register from './Auth/register';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
