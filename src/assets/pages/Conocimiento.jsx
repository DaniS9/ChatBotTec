import { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

function Conocimiento() {
  const [fuentes, setFuentes] = useState([]);
  const [nuevaNota, setNuevaNota] = useState('');
  useEffect(() => {
  const obtenerFuentes = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/fuentes");
      const data = await res.json();
      setFuentes(data);
    } catch (err) {
      console.error("Error al cargar fuentes:", err);
    }
  };

  obtenerFuentes();
}, []);
  

 const handleAgregarNota = async () => {
  if (nuevaNota.trim() === '') return;

  try {
    const res = await fetch("http://127.0.0.1:8000/api/fuentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contenido: nuevaNota })
    });

    const nuevaFuente = await res.json();
    setFuentes((prev) => [nuevaFuente, ...prev]);
    setNuevaNota('');
  } catch (err) {
    console.error("Error al guardar nota:", err);
  }
};
const handleEliminar = async (id) => {
  try {
    await fetch(`http://127.0.0.1:8000/api/fuentes/${id}`, {
      method: "DELETE"
    });

    setFuentes(fuentes.filter(f => f.id !== id));
  } catch (err) {
    console.error("Error al eliminar nota:", err);
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Conocimiento</h1>

      {/* Formulario para añadir nota */}
      <div className="flex items-center gap-2 mb-4">
        <textarea
          className="flex-1 p-2 border rounded resize-none"
          rows={3}
          placeholder="Escribe una nota de conocimiento..."
          value={nuevaNota}
          onChange={(e) => setNuevaNota(e.target.value)}
        />
        <button
          onClick={handleAgregarNota}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          <FaPlus className="inline mr-2" />
          Añadir
        </button>
      </div>

      {/* Tabla de notas */}
      <div className="mt-6 border rounded shadow bg-white">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2 text-left">Contenido</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {fuentes.map(fuente => (
              <tr key={fuente.id} className="border-t">
                <td className="p-2">{fuente.contenido}</td>
                <td className="p-2 text-green-600">{fuente.estado}</td>
                <td className="p-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleEliminar(fuente.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {fuentes.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-400">No hay notas añadidas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Conocimiento;
