import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, MessageCircle } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para los comentarios locales
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    message: "",
  });
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  // Comentarios predefinidos
  const predefinedComments = [
    {
      name: "Ana Gómez",
      message: "¡Tu portafolio es increíble, José! Me encantaron los proyectos, especialmente el de 'Guau & Miau'.",
      date: "2025-04-15",
    },
    {
      name: "Carlos Rivera",
      message: "Gran trabajo en tu portafolio web. La sección de proyectos está muy bien diseñada. ¡Sigue así!",
      date: "2025-04-16",
    },
    {
      name: "María López",
      message: "Hola José, tus diseños son muy modernos y funcionales. ¿Colaboras en proyectos freelance?",
      date: "2025-04-17",
    },
  ];

  // Cargar comentarios desde localStorage al montar el componente
  useEffect(() => {
    AOS.init({
      once: false,
    });

    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    // Si no hay comentarios en localStorage, inicializamos con los predefinidos
    if (storedComments.length === 0) {
      localStorage.setItem("comments", JSON.stringify(predefinedComments));
      setComments(predefinedComments);
    } else {
      setComments(storedComments);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Enviando Mensaje...',
      html: 'Por favor espera mientras enviamos tu mensaje',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        title: '¡Éxito!',
        text: 'Tu mensaje ha sido enviado exitosamente!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: '¡Error!',
        text: 'Algo salió mal. Por favor intenta de nuevo más tarde.',
        icon: 'error',
        confirmButtonColor: '#6366f1',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar cambios en el formulario de comentarios
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar el envío de un nuevo comentario
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsCommentSubmitting(true);

    // Simular un pequeño retraso para que se vea más realista
    setTimeout(() => {
      const newCommentData = {
        name: newComment.name.trim() || "Anónimo",
        message: newComment.message.trim(),
        date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
      };

      // Agregar el nuevo comentario a la lista
      const updatedComments = [newCommentData, ...comments];
      setComments(updatedComments);
      localStorage.setItem("comments", JSON.stringify(updatedComments));

      // Limpiar el formulario
      setNewComment({
        name: "",
        message: "",
      });

      // Mostrar notificación de éxito
      Swal.fire({
        title: '¡Comentario Agregado!',
        text: 'Tu comentario ha sido publicado.',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 1500,
        timerProgressBar: true,
      });

      setIsCommentSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contáctame
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          ¿Tienes una pregunta o quieres discutir un proyecto? Envíame un mensaje o deja un comentario rápido abajo.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          {/* Formulario de Contacto */}
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Ponte en Contacto
                </h2>
                <p className="text-gray-400">
                  Envíame un mensaje detallado y te responderé pronto.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

            <form 
              action="https://formsubmit.co/joseortegahac@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Tu Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Tu Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Tu Mensaje"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          {/* Sección de Comentarios */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-300 hover:shadow-[#6366f1]/10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Deja un Comentario
                </h2>
                <p className="text-gray-400">
                  Comparte tus pensamientos o comentarios rápidos aquí.
                </p>
              </div>
              <MessageCircle className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

            {/* Formulario para agregar un nuevo comentario */}
            <form onSubmit={handleCommentSubmit} className="space-y-6 mb-8">
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Tu Nombre (opcional)"
                  value={newComment.name}
                  onChange={handleCommentChange}
                  disabled={isCommentSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Tu Comentario"
                  value={newComment.message}
                  onChange={handleCommentChange}
                  disabled={isCommentSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[5rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="300"
                type="submit"
                disabled={isCommentSubmitting || !newComment.message.trim()}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isCommentSubmitting ? 'Publicando...' : 'Publicar Comentario'}
              </button>
            </form>

            {/* Lista de Comentarios */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-400 text-center">Aún no hay comentarios. ¡Sé el primero en comentar!</p>
              ) : (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 transition-all duration-300 hover:border-[#6366f1]/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-[#6366f1]" />
                        <span className="text-white font-semibold">{comment.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{comment.date}</span>
                    </div>
                    <p className="text-gray-300">{comment.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;