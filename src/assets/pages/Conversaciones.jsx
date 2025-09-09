// src/assets/pages/Apariencia.jsx
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useState } from "react";

const chats = [
  { id: 1, origen: "Android - Chrome", mensaje: "¿Cuántas ingenierías tiene el Tec?", respuestas: ["El Tec de Tehuacán tiene X ingenierías...", "Puedes ver la lista en el sitio oficial."] },
  { id: 2, origen: "iOS - Safari", mensaje: "¿Cómo funciona la movilidad estudiantil?", respuestas: ["La movilidad permite ir a otros campus...", "Consulta requisitos en control escolar."] },
];


export default function Apariencia() {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <div className="flex h-screen bg-gray-100 text-gray-200">
      {/* Contenedor principal después del sidebar */}
      <div className="flex-1 p-6 grid grid-cols-3 gap-6">
        
        {/* Historial */}
        <Card className="col-span-1 bg-[#1e293b] text-white shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Historial
            </Typography>

            <Divider sx={{ my: 1 }} className="bg-gray-600" />

            {/* Ejemplo de item */}
            <div className="h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#475569] scrollbar-track-[#1e293b]">
            {chats.map((chat) => (
              <button  className="w-full text-left mb-3"
                onClick={() => setSelectedChat(chat)}
                key  = {chat.id}>
                <div className="p-3 rounded-lg bg-[#5795e7] hover:bg-[#3f85d6] cursor-pointer">
                  <p className="text-sm text-gray-200">{chat.origen}</p>
                  <p className="font-medium">{chat.mensaje}</p>
                </div>
              </button>
              ))}
              </div>
              
          </CardContent>
          </Card>

        {/* Conversación */}
        <Card className="col-span-2 text-white shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Conversación
            </Typography>
            <Divider  sx={{ my: 1 }} className="bg-gray-600"  />

            {/* Chat messages */}
            <div className="h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#475569] scrollbar-track-[#1e293b]">
           {selectedChat ? (
            <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#334155]">
            <p className="text-sm text-gray-400">{selectedChat.origen}</p>
            <p>{selectedChat.mensaje}</p>
            </div>

            {selectedChat.respuestas.map((resp, i) => (
            <div key={i} className="p-3 rounded-lg bg-[#475569]">
            <p className="text-sm text-gray-400">Bot</p>
            <p>{resp}</p>
            </div>
            ))}
             </div>
            ) : (
            <p className="text-gray-400">Selecciona un chat del historial</p>
            )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
