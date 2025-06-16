import Sidebar from './SidebarCom';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';


function App() {
  return (
  
<Box sx={{ display: 'flex' }}>
  <Sidebar />
  <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
    <h1 className="text-4xl font-poppins text-blue-800 font-bold">Informacion del Bot</h1>
    <p className="text-sm text-gray-500 p-1 m-1">Actualiza la información y configuraciones de tu bot</p>


    <Paper elevation={2} className="p-4  rounded-lg shadow-md bg-white  max-w-2xl mx-flex"   > 
      <div className="flex items-center gap-4">
        <span className="bg-blue-100 p-2 rounded-full">
        </span>
        <div>

          <h3 className="font-medium">Nombre del ChatBot</h3>

         
        </div>
      </div>
       <p className="text-sm text-gray-500">Personaliza el comportamiento del bot</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Guardar cambios
      </button>
    </Paper>
  </Box>
</Box>
   
   
  );
}

export default App;
