document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            faqButtons.forEach(btn => {
                if (btn !== button) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
            button.setAttribute('aria-expanded', !isExpanded);
        });
    });
});