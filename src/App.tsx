import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Home } />
      <Route path="/carrinho" Component={ ShoppingCart } />
    </Routes>
  );
}

export default App;
