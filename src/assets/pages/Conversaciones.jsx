// src/assets/pages/Apariencia.jsx
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";

export default function Apariencia() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const obtenerConversaciones = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/conversaciones");
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error("Error al obtener conversaciones:", err);
      }
    };
    obtenerConversaciones();
  }, []);
  const cargarMensajes = async (chat) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/conversaciones/${chat.id}/mensajes`);
    const data = await res.json();

    const mensajes = data.map((msg) => ({
      role: msg.role,
      content: msg.mensaje,
      fecha: msg.created_at
    }));

    setSelectedChat({
      id: chat.id,
      mensajes
    });
  } catch (err) {
    console.error("Error al cargar mensajes:", err);
  }
};
const descargarJSON = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/conversaciones"); // o un endpoint que incluya mensajes
    const conversaciones = await res.json();

    const blob = new Blob([JSON.stringify(conversaciones, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "historial_chatbot.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Error al descargar historial:", err);
  }
};



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
              <button
              onClick={descargarJSON}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
              Descargar historial (JSON)
              </button>


              <Divider sx={{ my: 1 }} className="bg-gray-600" />

              

              {/* Ejemplo de item */}
              <div className="h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#475569] scrollbar-track-[#1e293b]">
              {chats.map((chat) => (
                <button  className="w-full text-left mb-3"
                  onClick={() => cargarMensajes(chat)}
                  key  = {chat.id}>
                  <div className="p-3 rounded-lg bg-[#5795e7] hover:bg-[#3f85d6] cursor-pointer">
                    <p className="text-sm text-gray-200">Conversación #{chat.id}</p>
                    <p className="font-medium">Mensajes: {chat.mensajes_count}</p>
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
                <div className="h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#475569] scrollbar-track-[#1e293b]">
            {selectedChat ? (
             <div className="space-y-3">
            {selectedChat.mensajes.map((msg, i) => (
             <div key={i} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-[#334155]' : 'bg-[#475569]'}`}>
            <p className="text-sm text-gray-400">{msg.role === 'user' ? 'Usuario' : 'Bot'}</p>
            <p>{msg.content}</p>
            <p className="text-xs text-gray-400">
            {new Date(msg.fecha).toLocaleString('es-MX', {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}
            </p>
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
