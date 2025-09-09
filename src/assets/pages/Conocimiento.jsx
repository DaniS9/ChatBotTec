import { useState } from 'react';
import { FaTrash, FaFileUpload } from 'react-icons/fa';

function Conocimiento() {
  const [fuentes, setFuentes] = useState([]);

  const handleAddFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const nuevaFuente = {
      id: Date.now(),
      nombre: file.name,
      tipo: file.type,
      tamaño: file.size,
      estado: "Terminado",
    };

    setFuentes([...fuentes, nuevaFuente]);
  };

  const handleEliminar = (id) => {
    setFuentes(fuentes.filter(f => f.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Conocimiento</h1>

      {/* Botón para añadir */}
      <label className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded cursor-pointer hover:bg-purple-700">
        <FaFileUpload className="mr-2" />
        Añadir nueva fuente
        <input type="file" className="hidden" onChange={handleAddFile} />
      </label>

      {/* Tabla de archivos */}
      <div className="mt-6 border rounded shadow bg-white">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2 text-left">Contenido</th>
              <th className="p-2 text-left">Tamaño</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {fuentes.map(fuente => (
              <tr key={fuente.id} className="border-t">
                <td className="p-2">{fuente.tipo.split("/")[1]}</td>
                <td className="p-2">{fuente.nombre}</td>
                <td className="p-2">{(fuente.tamaño / 1024).toFixed(2)} KB</td>
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
                <td colSpan="5" className="p-4 text-center text-gray-400">No hay fuentes añadidas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Conocimiento;
