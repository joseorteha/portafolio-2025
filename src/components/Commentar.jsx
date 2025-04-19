import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

// Datos estáticos iniciales para los comentarios
const initialComments = [
  {
    id: "1",
    userName: "Ana García",
    content: "¡Gran trabajo en tu portafolio, José! Me encanta el diseño.",
    createdAt: new Date("2025-04-18T10:00:00"),
  },
  {
    id: "2",
    userName: "Carlos Pérez",
    content: "Tus proyectos son muy interesantes. ¿Planeas agregar más?",
    createdAt: new Date("2025-04-19T09:30:00"),
  },
];

const Comment = memo(({ comment, formatDate, index }) => (
    <div 
        className="px-4 pt-4 pb-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5"
    >
        <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
                <UserCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <h4 className="font-medium text-white truncate">{comment.userName}</h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(comment.createdAt)}
                    </span>
                </div>
                <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">{comment.content}</p>
            </div>
        </div>
    </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const textareaRef = useRef(null);

    const handleTextareaChange = useCallback((e) => {
        setNewComment(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
                <label className="block text-sm font-medium text-white">
                    Nombre <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    required
                />
            </div>

            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1200">
                <label className="block text-sm font-medium text-white">
                    Comentario <span className="text-red-400">*</span>
                </label>
                <textarea
                    ref={textareaRef}
                    name="message"
                    value={newComment}
                    onChange={handleTextareaChange}
                    placeholder="Escribe tu comentario aquí..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                data-aos="fade-up"
                data-aos-duration="1000"
                className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Enviar Comentario</span>
                        </>
                    )}
                </div>
            </button>
        </form>
    );
});

const Commentar = () => {
    const [comments, setComments] = useState(() => {
        const savedComments = localStorage.getItem('portfolio-comments');
        return savedComments ? JSON.parse(savedComments) : initialComments;
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        AOS.init({
            once: false,
            duration: 1000,
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('portfolio-comments', JSON.stringify(comments));
    }, [comments]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        Swal.fire({
            title: 'Enviando Comentario...',
            html: 'Por favor espera mientras enviamos tu comentario',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Agregar el comentario a la lista
            const formData = new FormData(e.target);
            const userName = formData.get('name');
            const content = formData.get('message');
            const newCommentData = {
                id: Date.now().toString(),
                userName,
                content,
                createdAt: new Date(),
            };
            setComments((prev) => [newCommentData, ...prev]);

            Swal.fire({
                title: '¡Éxito!',
                text: 'Tu comentario ha sido enviado exitosamente!',
                icon: 'success',
                confirmButtonColor: '#6366f1',
                timer: 2000,
                timerProgressBar: true,
            });

            // Resetear el formulario
            e.target.reset();
        } catch (err) {
            setError('No se pudo enviar el comentario. Por favor intenta de nuevo.');
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

    const formatDate = useCallback((timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'Ahora mismo';
        if (diffMinutes < 60) return `hace ${diffMinutes}m`;
        if (diffHours < 24) return `hace ${diffHours}h`;
        if (diffDays < 7) return `hace ${diffDays}d`;

        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }, []);

    return (
        <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl" data-aos="fade-up" data-aos-duration="1000">
            <div className="p-6 border-b border-white/10" data-aos="fade-down" data-aos-duration="800">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20">
                        <MessageCircle className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Comentarios Rápidos <span className="text-indigo-400">({comments.length})</span>
                    </h3>
                </div>
            </div>
            <div className="p-6 space-y-6">
                {error && (
                    <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl" data-aos="fade-in">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                
                <div>
                    <CommentForm 
                        onSubmit={handleCommentSubmit} 
                        isSubmitting={isSubmitting} 
                        error={error} 
                    />
                </div>

                <div className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar" data-aos="fade-up" data-aos-delay="200">
                    {comments.length === 0 ? (
                        <div className="text-center py-8" data-aos="fade-in">
                            <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
                            <p className="text-gray-400">Aún no hay comentarios. ¡Sé el primero en comentar!</p>
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <Comment 
                                key={comment.id} 
                                comment={comment} 
                                formatDate={formatDate}
                                index={index}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Commentar;