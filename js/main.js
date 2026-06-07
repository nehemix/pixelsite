document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            const hamburger = menuToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.textContent = !isExpanded ? '✕' : '☰';
                hamburger.style.transform = !isExpanded ? 'rotate(90deg)' : 'rotate(0deg)';
            }
        });
    }

    // Lógica del Navbar Sticky
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Scroll suave para los enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Cerrar el menú móvil si está abierto al hacer clic
                if (navLinks && navLinks.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                    
                    const hamburger = menuToggle.querySelector('.hamburger');
                    if (hamburger) {
                        hamburger.textContent = '☰';
                        hamburger.style.transform = 'rotate(0deg)';
                    }
                }

                // Realizar el scroll suave, compensando la altura del menú fijo
                const headerOffset = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});