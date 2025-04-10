// src/components/CarList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const apiUrl = 'https://json-server-delta-nine.vercel.app/cars';

function CarList() {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const handleDeleteClick = (car) => {
    setCarToDelete(car);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (carToDelete) {
      axios.delete(`${apiUrl}/${carToDelete.id}`)
        .then(() => {
          setCars(cars.filter(car => car.id !== carToDelete.id));
          setIsModalOpen(false);
          setCarToDelete(null);
        })
        .catch(error => {
          console.error('Error deleting car:', error);
          setIsModalOpen(false);
          setCarToDelete(null);
        });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCarToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/add" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
        Add Car
      </Link>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Model</th>
              <th className="px-4 py-2 border-b">Brand</th>
              <th className="px-4 py-2 border-b">Year</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{car.model}</td>
                <td className="px-4 py-2 border-b">{car.brand}</td>
                <td className="px-4 py-2 border-b">{car.year}</td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <Link to={`/view/${car.id}`} className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300">
                    View
                  </Link>
                  <Link to={`/edit/${car.id}`} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(car)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        itemName={carToDelete ? carToDelete.model : ''}
      />
    </div>
  );
}

export default CarList;
