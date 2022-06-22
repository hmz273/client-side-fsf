import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from './Auth/login';
import Register from './Auth/register';
import Home from './home';
import Tasks from './compoments/Tasks';
import NewTask from './compoments/addTask';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/new" element={<NewTask />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
