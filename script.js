document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Implementation
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows strictly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline has a slight delay effect via CSS transition, but here we set position
        // Using animate for smoother pursuit effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Cursor hover effects on clickable elements
    const clickables = document.querySelectorAll('a, button, .achievement-card, .gallery-item');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // 2. Intersection Observer for Scroll Animations (Fade Up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Showcase Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleries = document.querySelectorAll('.showcase-gallery');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');

            // Hide all galleries
            galleries.forEach(gallery => {
                gallery.classList.add('hidden');
                // Remove visible class from inner items to re-animate if desired
                 const items = gallery.querySelectorAll('.fade-up');
                 items.forEach(item => item.classList.remove('visible'));
            });

            // Show target gallery
            const targetGallery = document.getElementById(`${targetId}-gallery`);
            targetGallery.classList.remove('hidden');
            
            // Re-trigger animations for the newly shown items
            setTimeout(() => {
                const items = targetGallery.querySelectorAll('.fade-up');
                items.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.classList.add('visible');
                });
            }, 50);
        });
    });
});
