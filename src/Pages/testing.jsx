import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TestAOS = () => {
    useEffect(() => {
        // Inicializa AOS (Animate On Scroll)
        AOS.init();

        // Función para verificar la propiedad will-change
        const checkWillChange = () => {
            // Selecciona todos los elementos que tienen el atributo data-aos
            const aosElements = document.querySelectorAll('[data-aos]');
            
            console.log(`Ditemos ${aosElements.length} elementos con data-aos`);
            
            aosElements.forEach((element, index) => {
                // Agrega un borde rojo punteado a los elementos para visualizarlos
                element.style.border = '2px dashed red';
                
                // Obtiene los estilos computados del elemento
                const computedStyle = window.getComputedStyle(element);
                const willChange = computedStyle.getPropertyValue('will-change');
                
                // Imprime información sobre cada elemento
                console.log(`Elemento ${index + 1}:`, {
                    'data-aos': element.getAttribute('data-aos'),
                    'will-change': willChange,
                    'element': element.tagName,
                    'classes': element.className
                });
            });
        };

        // Ejecuta la verificación después de inicializar AOS
        setTimeout(checkWillChange, 100);
    }, []);

    return (
        <>
            <style>
                {`
                    /* Estilo para los elementos con data-aos */
                    [data-aos] {
                        will-change: transform, opacity !important;
                    }
                `}
            </style>

            {/* Aquí puedes agregar contenido con data-aos para probar */}
        </>
    );
};

export default TestAOS;
