import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditarRegistro = () => {
  const { id } = useParams();  
  const navigate = useNavigate();  

  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    numeroTelefono: '',
    email: ''
  });

  const [phoneError, setPhoneError] = useState(false); 

  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await fetch(`https://localhost:7102/api/GovernmentEntities/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la entidad');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar la entidad', 'error');
      }
    };

    fetchEntity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'numeroTelefono') {
      const cleanedValue = value.replace(/\D/g, ''); 

      if (cleanedValue.length <= 10) {
        let formattedValue = cleanedValue.replace(
          /^(\d{3})(\d{0,3})(\d{0,4})/,
          '($1) $2-$3'
        );
        setFormData({
          ...formData,
          [name]: formattedValue
        });

        if (!phoneRegex.test(formattedValue)) {
          if (!phoneError) {
            setPhoneError(true);
            Swal.fire('Error', 'Número de teléfono no es válido. Debe seguir el formato (000) 000-0000', 'error');
          }
        } else {
          setPhoneError(false);  
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneRegex.test(formData.numeroTelefono)) {
      Swal.fire('Error', 'Número de teléfono no es válido. Debe seguir el formato (000) 000-0000', 'error');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7102/api/GovernmentEntities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la entidad');
      }

      Swal.fire('Éxito', 'Entidad actualizada con éxito', 'success');
      navigate('/index');  
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error al actualizar la entidad', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6" style={{ fontFamily: 'Dignus, sans-serif' }}>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Editar entidad gubernamental</h1>
      
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Número de Teléfono</label>
            <input
              type="text"
              name="numeroTelefono"
              value={formData.numeroTelefono}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
              placeholder="(809) 555-5555"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Actualizar entidad
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarRegistro;
