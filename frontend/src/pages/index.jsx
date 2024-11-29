import React, { useEffect, useState } from 'react';

const Index = () => {
  const [entities, setEntities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntities, setFilteredEntities] = useState([]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch('https://localhost:7102/api/GovernmentEntities');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setEntities(data);
        setFilteredEntities(data);
      } catch (error) {
        console.error('Error al obtener entidades gubernamentales:', error);
      }
    };

    fetchEntities();
  }, []);

  // Manejar el filtrado dinámico
  useEffect(() => {
    const filtered = entities.filter((entity) => {
      const query = searchQuery.toLowerCase();
      return (
        entity.nombre.toLowerCase().includes(query) ||
        entity.direccion.toLowerCase().includes(query) ||
        entity.numeroTelefono.toString().includes(query) ||
        entity.email.toLowerCase().includes(query) ||
        entity.governmentEntityId.toString().includes(query)
      );
    });
    setFilteredEntities(filtered);
  }, [searchQuery, entities]);

  return (
    <div className="min-h-screen bg-white py-10 px-6" style={{ fontFamily: 'Dignus, sans-serif' }}>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Entidades gubernamentales
      </h1>
      
      {/* Barra de búsqueda */}
      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nombre, dirección, teléfono, email o ID..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
        />
      </div>

      {/* Lista filtrada */}
      <ul
        id="scroll-container"
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg h-96 overflow-y-auto"
        style={{
         borderRadius: '12px',
            paddingBottom: '1rem',
            maxHeight: '50vh',
        }}
      >
        {filteredEntities.length > 0 ? (
          filteredEntities.map((entity) => (
            <li
              key={entity.governmentEntityId}
              className="border-b border-gray-200 p-6 hover:bg-gray-100 transition duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700">{entity.nombre}</span>
                <span className="text-sm text-gray-500">ID: {entity.governmentEntityId}</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">Dirección: {entity.direccion}</div>
              <div className="text-sm text-gray-600">Teléfono: {entity.numeroTelefono}</div>
              <div className="text-sm text-gray-600">Email: {entity.email}</div>
            </li>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">No se encontraron resultados</div>
        )}
      </ul>
    </div>
  );
};

export default Index;
