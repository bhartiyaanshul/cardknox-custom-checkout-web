import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { CustomCheckout } from './pages/CustomCheckout/CustomCheckout';

function App() {
  return (
    <div className='custom-checkout'>
      <Routes>
        <Route path='/' element={< CustomCheckout />} />
      </Routes>
    </div>
  );
}

export default App;