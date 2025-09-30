import Sidebar from './SidebarCom';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState , useEffect } from 'react';
import axios from "axios";

function App() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorNombre, setErrorNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [_registroActual, setRegistroActual] = useState(null);


  // Obtener el último registro y mostrarlo 
  useEffect(() => {
    const fetchUltimo = async () => {
  try {
    setNombre("Cargando...");
    setDescripcion("Cargando...");
    const res = await axios.get("http://127.0.0.1:8000/api/registros");
    const ultimo = res.data;

    setNombre(ultimo.Nombre ?? "");
    setDescripcion(ultimo.Descripcion_Bot ?? "");
    setRegistroActual(ultimo);
    setSelectedImage(ultimo.Imagen ? `http://localhost:8000${ultimo.Imagen}` : null);// 👈 imagen desde BD

  } catch (error) {
    console.error("Error trayendo el último registro:", error);
  }
};
  
    fetchUltimo();
    }, []);

  //Validacion en Tiempo Real 
  useEffect(() => {
    if (nombre.trim() === "") {
      setErrorNombre("");
      return; 
    }

    //Validacion en Tiempo REAL 
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/validar-nombre", {
          params: { nombre },
        });

        if (res.data.existe) {
          setErrorNombre("⚠️ Este nombre ya está registrado.");
        } else {
          setErrorNombre("");
        }
      } catch (error) {
        console.error("Error validando nombre:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [nombre]); // <- se ejecuta cada vez que cambia "nombre"

  

 const actualizarRegistro = async (id, file, nombre, descripcion) => {
  try {
    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('Nombre', nombre);
    formData.append('Descripcion_Bot', descripcion);

    const res = await fetch(`http://127.0.0.1:8000/api/registros/${id}/actualizar`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log("URL real:", data.data.Imagen); // 👈 debería imprimirse
    setRegistroActual(data.data);
    setSelectedImage(`http://localhost:8000${data.data.Imagen}`);
    console.log("URL final:", `http://localhost:8000${data.data.Imagen}`);

  } catch (error) {
    console.error("Error actualizando registro:", error);
  }
};






       // 👇 Guardar el bot
      const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/registros", {
      Nombre: nombre,
      Descripcion_Bot: descripcion,
    });

    const nuevoRegistro = response.data.data;
    console.log("Guardado:", nuevoRegistro);

    // 👇 Aquí actualizas con imagen si existe
    if (selectedImageFile) {
      await actualizarRegistro(nuevoRegistro.id, selectedImageFile, nombre, descripcion);
    }

    alert("✅ Bot guardado correctamente");
  } catch (err) {
    if (err.response?.status === 422) {
      const errores = err.response.data.errors;
      if (errores.Nombre) {
        setErrorNombre(errores.Nombre[0]);
      }
    } else {
      alert("❌ Error al guardar el bot");
    }
  } finally {
    setLoading(false);
  }
};

    //Esto es para cargar la Imagen (Aun no esta terminado falta en la BD)


const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log("Imagen seleccionada:", file.name);
    setSelectedImageFile(file); // solo guardas el archivo
    

  }
};


  

return (
    <form onSubmit={handleSubmit} className="w-full">
      <Box sx={{ display: "flex" }} className="bg-gray-100">
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <h1 className="text-4xl font-poppins text-blue-800 font-bold">
            Información del Bot
          </h1>
          <p className="text-sm text-gray-500 p-1 m-1">
            Actualiza la información y configuraciones de tu bot
          </p>
                
          <Paper elevation={2} className="p-4 rounded-lg shadow-md max-w-2xl dark:bg-gray-700">
            {/* Campo Nombre */}
            <div className="flex items-center gap-4 w-full mb-4">
              <div className="w-full">
                <h3 className="font-medium">Nombre del ChatBot</h3>
                <TextField
                  type="text"
                  variant="outlined"
                  value={nombre}
                  fullWidth
                  placeholder="Ejemplo: Mi ChatBot"
                  className="[&_.MuiOutlinedInput-root]:h-10"
                  onChange={(e) => {
                    setNombre(e.target.value ?? "");
                    setErrorNombre(""); // limpia error mientras escribe
                  }}
                  error={!!errorNombre}
                  helperText={errorNombre}
                />
              </div>
            </div>

            {/* Logo */}
            <div className="mt-8 pt-4 border-t">
              <h3 className="font-medium mb-3">Logo del Bot</h3>
              {selectedImage && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={selectedImage}
                    alt="Logo del bot"
                    className="max-h-28 object-contain border rounded-lg"
                  />
                </div>
              )}
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                className="normal-case bg-blue-50 hover:bg-blue-100"
              >
                Subir imagen
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Formatos soportados: JPG, PNG (Máx. 2MB)

                
              </p>
            </div>

            {/* Descripción */}
            <div className="mt-8 pt-4 border-t">
              <h3 className="font-medium mb-3">Descripción del Bot</h3>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500"
                rows={4}
                placeholder="Ejemplo: Soy un bot de atención al cliente y soy experto en tecnología."
              />
              <p className="text-sm text-gray-500 mt-2">
                Las instrucciones te permiten personalizar la personalidad y el estilo de tu bot.
              </p>
            </div>

            {/* Botón Guardar */}
            <div className="mt-8 pt-4 border-t">
              <button
                type="submit"
                disabled={!!errorNombre || loading}
                className={`mt-6 px-4 py-2 rounded text-white ${
                  errorNombre || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </Paper>



        </Box>
      </Box>
    </form>
  );
}

export default App;