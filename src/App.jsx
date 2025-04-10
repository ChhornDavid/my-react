// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';
import ViewCar from './components/ViewCar';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Car Management</h1>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/add" element={<AddCar />} />
        <Route path="/edit/:id" element={<EditCar />} />
        <Route path="/view/:id" element={<ViewCar />} />
      </Routes>
    </div>
  );
}

export default App;
