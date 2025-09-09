import { Routes, Route } from 'react-router-dom';
import Sidebar from './assets/pages/SidebarCom';
import Inicio from './assets/pages/Inicio';
import Conocimiento from './assets/pages/Conocimiento'; ///
import Conversaciones from './assets/pages/Conversaciones';
import Apariencia from './assets/pages/Apariencia';
import Notificaciones from './assets/pages/Notificaciones';/////
import Incrustacion from './assets/pages/Incrustacion';
import Info from './assets/pages/info';
import { useState , useEffect } from 'react';
import axios from "axios";

function App() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/registros");
        setRegistros(res.data);
      } catch (error) {
        console.error("Error cargando registros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex-1">
        <Routes>
          <Route path="/" element={<Inicio registros={registros} loading={loading} />} />
          <Route path="/chat" element={<Conocimiento />} />
          <Route path="/apariencia" element={<Apariencia />} />
          <Route path="/conocimiento" element={<Conocimiento />} />
          <Route path="/conversaciones" element={<Conversaciones />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/incrustacion" element={<Incrustacion />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

