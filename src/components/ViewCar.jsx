// src/components/ViewCar.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/cars';

function ViewCar() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/${id}`)
      .then(response => setCar(response.data))
      .catch(error => console.error('Error fetching car:', error));
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><strong>Model:</strong> {car.model}</p>
      <p><strong>Brand:</strong> {car.brand}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition duration-300"
      >
        Back to List
      </button>
    </div>
  );
}

export default ViewCar;
