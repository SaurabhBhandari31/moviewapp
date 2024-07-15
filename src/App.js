import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Signup from './Component/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Component/Signin';
import Home from './Component/Home';
import Mywatchlist from './Component/Mywatchlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mylist" element={<Mywatchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
