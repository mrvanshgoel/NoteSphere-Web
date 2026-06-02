document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the .fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Navbar scroll effect (add background blur when scrolled)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 19, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 19, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // API Status Checker
    const statusDot = document.getElementById('api-status-dot');
    const statusText = document.getElementById('api-status-text');
    
    async function checkApiStatus() {
        try {
            const response = await fetch('https://notesphere-cr9w.onrender.com/health');
            if (response.ok) {
                const data = await response.json();
                if (data.status === 'ok') {
                    statusText.textContent = 'API Online - Systems Normal';
                    // Dot remains green from CSS
                } else {
                    throw new Error('API reported non-ok status');
                }
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            statusText.textContent = 'API Offline - Investigating';
            statusDot.style.backgroundColor = 'var(--warning)';
            statusDot.style.boxShadow = '0 0 10px var(--warning)';
            statusDot.style.animation = 'none'; // stop pulsing or change pulse color
        }
    }

    checkApiStatus();
    // Re-check every 60 seconds
    setInterval(checkApiStatus, 60000);
});
