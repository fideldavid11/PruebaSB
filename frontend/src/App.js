import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/index.jsx';
import Navbar from './components/navbar.jsx';
import Sidebar from './components/sidebar.jsx';
import Consultar from './pages/consultar.jsx';
import Crearregistro from './pages/crearregistro.jsx';
import Editorg from './pages/editorg.jsx';

function App() {
  return (
    <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Router>
        {/* Navbar */}
        <Navbar />
        {/* Contenedor principal */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar />
          {/* Contenedor blanco central */}
          <main className="main-container">
            <Routes>
              {/* Ruta por defecto */}
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Index />} />
              <Route path="/consultar" element={<Consultar />} />
              <Route path="/crearregistro" element={<Crearregistro />} />
              <Route path="/edit/:id" element={<Editorg />} />

              {/* Ruta para manejar cualquier otra */}
              <Route path="*" element={<Index />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
