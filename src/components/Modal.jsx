import React, { useState } from 'react';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';

// Componente modal para mostrar detalles de un proyecto
const ProjectCardModal = ({ title, description, link }) => {
  // Estado para controlar si el modal está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm">Detalles</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Modal: se muestra si isOpen es true */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
          onClick={() => setIsOpen(false)} // Cierra el modal al hacer clic fuera
        >
          <div
            className="relative w-full max-w-md rounded-lg bg-gray-900 p-6 text-white shadow-lg animate-slide-up sm:p-8"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
          >
            {/* Botón para cerrar el modal */}
            <button
              className="absolute top-4 right-4 rounded-md p-2 hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Eye className="h-5 w-5" />
            </button>

            {/* Título del proyecto */}
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>

            {/* Descripción del proyecto */}
            <p className="mb-6 text-gray-400">{description}</p>

            {/* Botones de acción: Demo en Vivo y Cerrar */}
            <div className="flex justify-end space-x-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Demo en Vivo <ExternalLink className="ml-2 inline-block h-5 w-5" />
              </a>
              <button
                className="rounded-md bg-gray-800 px-4 py-2 font-medium hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;