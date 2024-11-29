import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Consultar = () => {
  const [entidades, setEntidades] = useState([]);
  const [filteredEntidades, setFilteredEntidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntities, setSelectedEntities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch('https://localhost:7102/api/GovernmentEntities');
        const data = await response.json();
        setEntidades(data);
        setFilteredEntidades(data);
      } catch (error) {
        console.error('Error al obtener las entidades', error);
        Swal.fire('Error', 'No se pudieron cargar las entidades', 'error');
      }
    };

    fetchEntities();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredEntidades(
      entidades.filter((entidad) =>
        Object.values(entidad).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      )
    );
  };

  const handleEdit = (entidad) => {
   navigate(`/edit/${entidad.governmentEntityId}`);
};

  const handleDelete = async (governmentEntityId) => {
    try {
      const response = await fetch(`https://localhost:7102/api/GovernmentEntities/${governmentEntityId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la entidad');
      }

      setEntidades(entidades.filter((entidad) => entidad.governmentEntityId !== governmentEntityId));
      setFilteredEntidades(filteredEntidades.filter((entidad) => entidad.governmentEntityId !== governmentEntityId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBulkDelete = async () => {
    Swal.fire({
      title: '¿Seguro que quieres borrar estas entidades?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          for (const id of selectedEntities) {
            await handleDelete(id);
          }
          setSelectedEntities([]);
          Swal.fire('Éxito', 'Entidades eliminadas con éxito', 'success');
        } catch (error) {
          Swal.fire('Error', 'Error al eliminar las entidades', 'error');
        }
      }
    });
  };

  const toggleSelection = (id) => {
    setSelectedEntities((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const isSelected = (id) => selectedEntities.includes(id);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6" style={{ fontFamily: 'Dignus, sans-serif' }}>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Consultar entidades gubernamentales</h1>
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar..."
            className="mb-4 md:mb-0 w-full md:w-1/2 p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleBulkDelete}
            disabled={selectedEntities.length === 0}
            className={`px-4 py-2 rounded-lg text-white mt-2 md:mt-0 md:ml-4 ${
              selectedEntities.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 transition'
            }`}
          >
            Borrar Seleccionados
          </button>
        </div>
        <div
          id="scroll-container"
          className="max-w-full bg-white shadow-lg rounded-lg overflow-y-auto"
          style={{
            scrollBehavior: 'smooth',
            borderRadius: '12px',
            paddingBottom: '15rem',
            maxHeight: '80vh',
          }}
        >
          <table className="min-w-full table-auto text-gray-700">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-3 px-6 text-center font-semibold text-gray-600">Seleccionar</th>
                <th className="py-3 px-6 text-center font-semibold text-gray-600">Nombre</th>
                <th className="py-3 px-6 text-center font-semibold text-gray-600">Dirección</th>
                <th className="py-3 px-6 text-center font-semibold text-gray-600">Teléfono</th>
                <th className="py-3 px-6 text-center font-semibold text-gray-600">Email</th>
                <th className="py-3 px-6 text-center font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntidades.map((entidad) => (
                <tr
                  key={entidad.governmentEntityId}
                  className="border-b hover:bg-blue-100 transition-colors duration-300"
                >
                  <td className="py-3 px-6 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected(entidad.governmentEntityId)}
                      onChange={() => toggleSelection(entidad.governmentEntityId)}
                    />
                  </td>
                  <td className="py-3 px-6 text-center">{entidad.nombre}</td>
                  <td className="py-3 px-6 text-center">{entidad.direccion}</td>
                  <td className="py-3 px-6 text-center">{entidad.numeroTelefono}</td>
                  <td className="py-3 px-6 text-center">{entidad.email}</td>
                  <td className="py-3 px-6 flex justify-center items-center space-x-4">
                    <button
                      onClick={() => handleDelete(entidad.governmentEntityId)}
                      className="text-red-600 hover:text-red-800 transition duration-200 transform hover:scale-110"
                      title="Eliminar"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  <button
  onClick={() => handleEdit(entidad)}  
  className="text-blue-600 hover:text-blue-800 transition duration-200 transform hover:scale-110"
  title="Editar"
>
  <FaEdit size={20} />
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Consultar;
