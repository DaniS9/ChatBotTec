import Sidebar from './SidebarCom';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (  
    <Box sx={{ display: 'flex' }} className="bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }} >
        <h1 className="text-4xl font-poppins text-blue-800 font-bold">Informacion del Bot</h1>
        <p className="text-sm text-gray-500 p-1 m-1">Actualiza la información y configuraciones de tu bot</p>

        <Paper elevation={2} className="p-4 rounded-lg shadow-md  max-w-2xl dark:bg-gray-700"> 
          <div className="flex items-center gap-4 w-full mb-4">
       
            
          
            <div className="w-full">
              <h3 className="font-medium">Nombre del ChatBot</h3>
              <TextField
                label=""
                variant="outlined"
                fullWidth
                className="[&_.MuiOutlinedInput-root]:h-9"  
              />
            </div>
          </div>

          {/* Nueva sección de logo */}
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
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            
            <p className="text-sm text-gray-500 mt-2">
              Formatos soportados: JPG, PNG (Máx. 2MB)
            </p>
          </div>
            <div className='mt-8 pt-4 border-t'>
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Guardar cambios
          </button>
          </div>
        </Paper>
      </Box>
    </Box>
  );
}

export default App;