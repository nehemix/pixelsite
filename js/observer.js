document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Ampliamos los selectores para animar hijos individualmente
    const targetSelectors = [
        '.fade-up', '.fade-in', 
        '.card', '.process-step', 
        '.project-card', '.gallery-item', 
        '.faq-item', '#contacto'
    ];
    
    const targets = document.querySelectorAll(targetSelectors.join(', '));

    if (prefersReducedMotion) {
        targets.forEach(el => el.classList.add('visible'));
        // Eliminamos ocultamiento en contenedores padre
        document.querySelectorAll('.fade-up').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        let staggerIndex = 0;

        intersectingEntries.forEach((entry) => {
            const target = entry.target;
            const isStaggerable = target.matches('.card, .gallery-item, .project-card, .process-step, .faq-item');
            
            // Efecto masonry/secuencial automático solo si entran múltiples a la vez
            if (isStaggerable && intersectingEntries.length > 1) {
                target.style.setProperty('--stagger-delay', `${staggerIndex * 0.15}s`);
                staggerIndex++;
            }

            target.classList.add('visible');
            // Las animaciones se ejecutan una sola vez
            observer.unobserve(target);
        });
    }, observerOptions);

    targets.forEach(el => scrollObserver.observe(el));
});