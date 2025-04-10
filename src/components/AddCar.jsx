// src/components/AddCar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'https://json-server-delta-nine.vercel.app/cars';

function AddCar() {
  const [newCar, setNewCar] = useState({ model: '', brand: '', year: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar(prevCar => ({ ...prevCar, [name]: value }));
  };

  const handleAddCar = () => {
    axios.post(apiUrl, newCar)
      .then(response => {
        navigate('/');
      })
      .catch(error => console.error('Error adding car:', error));
  };

  return (
    <div>
      <input
        type="text"
        name="model"
        value={newCar.model}
        onChange={handleInputChange}
        placeholder="Model"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="brand"
        value={newCar.brand}
        onChange={handleInputChange}
        placeholder="Brand"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="year"
        value={newCar.year}
        onChange={handleInputChange}
        placeholder="Year"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleAddCar}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
      >
        Add Car
      </button>
    </div>
  );
}

export default AddCar;
