import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Streaming from './pages/Streaming';

const App = () => {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Streaming />
            </ProtectedRoute>
          }
        />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
