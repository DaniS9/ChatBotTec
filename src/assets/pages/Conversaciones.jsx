// src/assets/pages/Apariencia.jsx
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import jsPDF from 'jspdf';

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



const generarPDF = () => {
  if (!selectedChat || !selectedChat.mensajes) {
    console.error("No hay conversación seleccionada.");
    return;
  }

  const pdf = new jsPDF();
  const margen = 10;
  let y = margen;

  // Encabezado
  pdf.setFontSize(14);
  pdf.text(`Conversación #${selectedChat.id}`, margen, y);
  y += 10;

  pdf.setFontSize(10);
  selectedChat.mensajes.forEach((msg) => {
    const rol = msg.role === 'user' ? 'Usuario' : 'Bot';
    const fecha = new Date(msg.fecha).toLocaleString('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const texto = `${rol} (${fecha}):\n${msg.content}\n`;
    const lineas = pdf.splitTextToSize(texto, 180);

    if (y + lineas.length * 5 > 280) {
      pdf.addPage();
      y = margen;
    }

    pdf.text(lineas, margen, y);
    y += lineas.length * 5 + 5;
  });

  pdf.save(`conversacion_${selectedChat.id}.pdf`);
};
const generarPDFHistorial = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/conversaciones-completas");
    const conversaciones = await res.json();

    const pdf = new jsPDF();
    const margen = 10;
    let y = margen;

    pdf.setFontSize(14);
    pdf.text("Historial completo de conversaciones", margen, y);
    y += 10;

    conversaciones.forEach((chat) => {
      pdf.setFontSize(12);
      pdf.text(`Conversación #${chat.id}`, margen, y);
      y += 8;

      chat.mensajes.forEach((msg) => {
        const rol = msg.role === 'user' ? 'Usuario' : 'Bot';
        const fecha = new Date(msg.created_at).toLocaleString('es-MX', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });

        const texto = `${rol} (${fecha}):\n${msg.mensaje}\n`;
        const lineas = pdf.splitTextToSize(texto, 180);

        if (y + lineas.length * 5 > 280) {
          pdf.addPage();
          y = margen;
        }

        pdf.setFontSize(10);
        pdf.text(lineas, margen, y);
        y += lineas.length * 5 + 5;
      });

      y += 10;
      if (y > 280) {
        pdf.addPage();
        y = margen;
      }
    });

    pdf.save("historial_completo.pdf");
  } catch (err) {
    console.error("Error generando PDF completo:", err);
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
              <div className="flex flex-col space-y-2 mb-4">
  <button
    onClick={descargarJSON}
    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  >
    Descargar historial (JSON)
  </button>


  <button
    onClick={generarPDF}
    disabled={!selectedChat}
    className={`px-4 py-2 rounded-lg mt-2 ${
    selectedChat
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
  }`}
  >
    Descargar conversación seleccionada (PDF)
  </button>

  <button
    onClick={generarPDFHistorial}
    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
  >
    Descargar historial completo (PDF)
  </button>
</div>


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
            {selectedChat ? `Conversación #${selectedChat.id}` : 'Conversación'}
            </Typography>

              <Divider  sx={{ my: 1 }} className="bg-gray-600"  />
                 {/* 👇 Aquí mostramos el ID o el mensaje de ayuda */}
   

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
    <p className="text-sm text-gray-400 mb-2 italic">
      Selecciona una conversación del historial para visualizarla aquí.
    </p>
  )}
</div>

          </CardContent>
        </Card>

        </div>
      </div>
    );
}
