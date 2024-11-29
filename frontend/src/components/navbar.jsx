import React from 'react';
import foto from '../assets/1.PNG';

const Navbar = () => {
  return (
    <div 
      className="p-4 ml-0 flex items-center" 
      style={{
        backgroundColor: '#0d2f48',
        height: '60px',
        borderBottomRightRadius: '7px',  
      }}
    >
     
      <div className="mr-4" style={{ position: 'relative', zIndex: 10 }}>
        <img 
          src={foto} 
          alt="Logo" 
          style={{ width: '280px', height: 'auto', marginTop: '30px', marginLeft: '-2rem' }} 
        />
      </div>

     
      <h1 className="text-white text-xl" style={{ fontFamily: 'Dignus, sans-serif' }}>
        Entidades gubernamentales
      </h1>
    </div>
  );
};

export default Navbar;
