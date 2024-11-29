import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import houseicon from '../assets/download.svg';

const Sidebar = () => {
 
  const [activeLink, setActiveLink] = useState('/index');

  return (
    <div
      className="h-screen w-64"
      style={{
        backgroundColor: '#0d2f48',
        borderRadius: '15px',
        marginTop: '-20px',   
      }}
    >
    
      <nav>
        <ul className="space-y-4 p-4" style={{ marginTop: '60px' }}>
          <li>
            <Link
              to="/index"   
              onClick={() => setActiveLink('/index')}
              className={`text-white text-sm flex items-center p-2 rounded-lg ${
                activeLink === '/index' ? 'bg-[#1c3c53]' : 'hover:bg-[#1c3c53]'
              }`}
              style={{ fontFamily: 'Dignus, sans-serif' }}
            >
              <img src={houseicon} alt="Home" className="mr-2 w-6 h-6" />
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/consultar"
              onClick={() => setActiveLink('/consultar')}
              className={`text-white text-sm flex items-center p-2 rounded-lg ${
                activeLink === '/consultar' ? 'bg-[#1c3c53]' : 'hover:bg-[#1c3c53]'
              } ml-1`}
              style={{ fontFamily: 'Dignus, sans-serif' }}
            >
              Consulta
            </Link>
          </li>
          <li>
            <Link
              to="/crearregistro"
              onClick={() => setActiveLink('/crearregistro')}
              className={`text-white text-sm flex items-center p-2 rounded-lg ${
                activeLink === '/crearregistro' ? 'bg-[#1c3c53]' : 'hover:bg-[#1c3c53]'
              } ml-1`}
              style={{ fontFamily: 'Dignus, sans-serif' }}
            >
              Crear registro
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
