document.addEventListener("DOMContentLoaded", () => {

    const htmlEl = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const yearEl = document.getElementById('year');

    /* ================= THEME SYSTEM ================= */

    function initTheme() {
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme) {
            htmlEl.classList.toggle('dark', storedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            htmlEl.classList.toggle('dark', prefersDark);
        }

        updateThemeIcon();
    }

    function updateThemeIcon() {
        const isDark = htmlEl.classList.contains('dark');
        if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
        if (themeToggleMobile) themeToggleMobile.textContent = isDark ? '☀️' : '🌙';
    }

    function toggleTheme() {
        const isDark = htmlEl.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // Listen to system theme change
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                htmlEl.classList.toggle('dark', e.matches);
                updateThemeIcon();
            }
        });

    initTheme();


    /* ================= MOBILE NAV ================= */

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    /* ================= SCROLL REVEAL ================= */

    const animatedSections = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-6');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    animatedSections.forEach(section => {
        section.classList.add(
            'opacity-0',
            'translate-y-6',
            'transition-all',
            'duration-700',
            'ease-out'
        );
        observer.observe(section);
    });


    /* ================= FOOTER YEAR ================= */

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});


/* ================= POPUP HANDLERS ================= */

function closePopup() {
    const popup = document.getElementById("successPopup");
    popup.classList.add("hidden");
}

function showSuccessPopup(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error();
        form.reset();
        document.getElementById("successPopup").classList.remove("hidden");
    })
    .catch(() => {
        alert("❌ Something went wrong. Please try again.");
    });
}

if (response.ok) {
    popup.classList.remove("hidden");
    form.reset();

    setTimeout(() => {
        popup.classList.add("hidden");
    }, 3000);
}
