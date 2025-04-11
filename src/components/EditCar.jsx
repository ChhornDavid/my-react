// src/components/EditCar.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/cars';

function EditCar() {
  const { id } = useParams();
  const [car, setCar] = useState({ model: '', brand: '', year: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => setCar(response.data))
      .catch(error => console.error('Error fetching car:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({ ...prevCar, [name]: value }));
  };

  const handleSaveChanges = () => {
    axios.put(`${apiUrl}/${id}`, car)
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error updating car:', error));
  };

  const handleCancelEdit = () => {
    navigate('/');
  };

  return (
    <div>
      <input
        type="text"
        name="model"
        value={car.model}
        onChange={handleInputChange}
        placeholder="Model"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="brand"
        value={car.brand}
        onChange={handleInputChange}
        placeholder="Brand"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="year"
        value={car.year}
        onChange={handleInputChange}
        placeholder="Year"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="flex justify-between">
        <button
          onClick={handleCancelEdit}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditCar;
