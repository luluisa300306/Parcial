// ============================================================
// MENÚ HAMBURGUESA - MOBILE NAVIGATION
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    
    // Verificar que los elementos existan en la página
    if (hamburger && navMobile) {
        
        // Función para abrir/cerrar menú
        function toggleMenu() {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' ? false : true;
            hamburger.setAttribute('aria-expanded', expanded);
            navMobile.classList.toggle('active');
            navMobile.classList.toggle('abierto');
            document.body.classList.toggle('menu-open');
            
            // Prevenir scroll cuando el menú está abierto
            if (document.body.classList.contains('menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        // Evento click en el botón hamburguesa
        hamburger.addEventListener('click', toggleMenu);
        
        // Cerrar menú al hacer click en un enlace
        const mobileLinks = navMobile.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMobile.classList.contains('active') || navMobile.classList.contains('abierto')) {
                    toggleMenu();
                }
            });
        });
        
        // Cerrar menú al redimensionar la ventana a tamaño desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 680) {
                if (navMobile.classList.contains('active') || navMobile.classList.contains('abierto')) {
                    toggleMenu();
                }
            }
        });
    }
    
    // ============================================================
    // ANIMACIÓN DE SCROLL SUAVE PARA ENLACES INTERNOS
    // ============================================================
    
    const smoothLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================================
    // DESTACAR ENLACE ACTIVO EN EL MENÚ SEGÚN LA PÁGINA ACTUAL
    // ============================================================
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('activo');
        } else if (currentPage === 'index.html' && linkHref === 'index.html') {
            link.classList.add('activo');
        } else if (linkHref && linkHref.includes(currentPage.replace('.html', ''))) {
            // Para manejar casos especiales
        }
    });
    
    // ============================================================
    // FORMULARIO DE CONTACTO (si existe en la página)
    // ============================================================
    
    const contactForm = document.querySelector('.formulario');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío de formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-regular fa-check-circle"></i> ¡Mensaje enviado!';
                submitBtn.style.background = '#3E7C59';
                
                // Resetear formulario
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
                // Mostrar notificación
                showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
            }, 1500);
        });
    }
    
    // ============================================================
    // FORMULARIO DE NEWSLETTER (footer)
    // ============================================================
    
    const newsletterForm = document.querySelector('.footer-newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                const submitBtn = this.querySelector('button');
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fa-regular fa-check"></i>';
                    emailInput.value = '';
                    showNotification('¡Gracias por suscribirte!', 'success');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = '<i class="fa-regular fa-paper-plane"></i>';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 800);
            }
        });
    }
    
    // ============================================================
    // FUNCIÓN PARA MOSTRAR NOTIFICACIONES
    // ============================================================
    
    function showNotification(message, type = 'success') {
        // Verificar si ya existe una notificación
        let notification = document.querySelector('.notification-toast');
        
        if (notification) {
            notification.remove();
        }
        
        // Crear elemento de notificación
        notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ============================================================
    // AGREGAR ESTILOS DINÁMICOS PARA NOTIFICACIONES
    // ============================================================
    
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--color-texto);
            color: var(--color-blanco);
            padding: 1rem 1.5rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-family: var(--font-texto);
            font-size: 0.9rem;
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            box-shadow: var(--sombra-card);
            border-left: 4px solid var(--color-secundario);
        }
        
        .notification-toast.show {
            transform: translateX(0);
        }
        
        .notification-toast.success {
            border-left-color: #3E7C59;
        }
        
        .notification-toast.error {
            border-left-color: #A62E2E;
        }
        
        .notification-toast i {
            font-size: 1.2rem;
        }
        
        @media (max-width: 680px) {
            .notification-toast {
                bottom: 20px;
                right: 20px;
                left: 20px;
                transform: translateY(120%);
            }
            
            .notification-toast.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(notificationStyles);
    
});