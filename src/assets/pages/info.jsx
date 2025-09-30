// src/assets/pages/Informacion.jsx
import { Card, CardContent, Typography, Divider } from "@mui/material";

export default function Informacion() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 items-center justify-center">
      <Card className="w-full max-w-3xl bg-white shadow-lg">
        <CardContent>
          <Typography variant="h5" className="mb-4 text-center text-[#1e293b] font-bold">
            Información del Sistema
          </Typography>

          <Divider className="mb-4 bg-gray-300" />

          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Este software ha sido desarrollado como parte de un proyecto académico en el Instituto Tecnológico de Tehuacán. Su propósito es ofrecer asistencia automatizada mediante un chatbot inteligente, capaz de responder preguntas, generar documentos y facilitar tareas administrativas.
            </p>

            <p>
              <strong>Versión actual:</strong> <span className="text-blue-700 font-medium">1.0.0</span>
            </p>

            <p>
              Esta es la <strong>primera versión oficial</strong> del sistema, lanzada como base funcional para futuras mejoras. Incluye integración con backend, almacenamiento de conversaciones, exportación en PDF y JSON, y generación de respuestas contextualizadas.
            </p>

            <p>
              El sistema fue desarrollado por <strong>Daniel Ballesteros</strong>, con colaboración de <strong>Sujeily Morrugarez </strong> y <strong>Luis Angel  </strong>, utilizando tecnologías como React, Laravel, MySQL y Tailwind CSS.
            </p>

            <p>
              Se planea incorporar nuevas funcionalidades en versiones futuras, incluyendo autenticación de usuarios, bloqueo por medio de ip, carga de archivos y documentos, y más.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
