import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Inicio from './assets/pages/Inicio';
import Conocimiento from './assets/pages/Conocimiento'; // Asegúrate del nombre exacto
import Conversaciones from './assets/pages/Conversaciones';
import Apariencia from './assets/pages/Apariencia';
import Notificaciones from './assets/pages/Notificaciones';
import Incrustacion from './assets/pages/Incrustacion';
import Info from './assets/pages/info';



function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex-1">
        <Routes>
          <Route path='/' element={<Inicio />}  />
          <Route path='/chat' element={<Conocimiento />}  />
          <Route path='/conversacion' element={<Apariencia />}  />
          <Route path='/conocimiento' element={<Notificaciones />}  />
          <Route path='/historial' element={<Conversaciones />}  />
          <Route path='/notificaciones' element={<Notificaciones />}  />
          <Route path='/incrustacion' element={<Incrustacion />}  />
          <Route path='/ajustes' element={<Info />}  />

 
        </Routes>
      </div>
    </div>
  );
}

export default App;
