const translations = {
    hu: {
        home: "Home",
        gallery: "Galéria",
        about: "Rólam",
        etsyShop: "Etsy Shop",
        heroTitle: "Juliart",
        heroText: "Egyedi festmények, és alkotások.",
        discover: "Fedezd fel",
        purchase: "Vásárlás",
        aboutTitle: "Rólam",
        aboutText1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.ut dolore labore incididunt incididunt eiusmod.adipiscing consectetur eiusmod dolore ut adipiscing.",
        aboutText2: "Sed ipsum amet tempor sed sit.amet ut labore do tempor tempor.sed amet magna ut tempor adipiscing.",
        contactTitle: "Kapcsolat",
        contactText: "Keress bátran, ha kérdésed van!",
        email: "Email: testjuliart@outlook.com",
        phone: "Tel: Hamarosan...",
        name: "Neved",
        emailInput: "Email címed",
        message: "Üzeneted...",
        send: "Küldés",
        sending: "Küldés...",
        sent: "Elküldve!",
        error: "Hiba történt!",
        copyright: "Minden jog fenntartva"
    },
    en: {
        home: "Home",
        gallery: "Gallery",
        about: "About",
        etsyShop: "Etsy Shop",
        heroTitle: "Juliart",
        heroText: "Unique paintings and creations.",
        discover: "Discover",
        purchase: "Purchase",
        aboutTitle: "About Me",
        aboutText1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.ut dolore labore incididunt incididunt eiusmod.adipiscing consectetur eiusmod dolore ut adipiscing.",
        aboutText2: "Sed ipsum amet tempor sed sit.amet ut labore do tempor tempor.sed amet magna ut tempor adipiscing.",
        contactTitle: "Contact",
        contactText: "Feel free to contact me if you have any questions!",
        email: "Email: testjuliart@outlook.com",
        phone: "Phone: Coming soon...",
        name: "Your Name",
        emailInput: "Your Email",
        message: "Your Message...",
        send: "Send",
        sending: "Sending...",
        sent: "Sent!",
        error: "Error occurred!",
        copyright: "All rights reserved"
    }
};

// Nyelvi váltás kezelése
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        
        // Aktív gomb stílus váltása
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // HTML lang attribútum frissítése
        document.documentElement.lang = lang;
        
        // Szövegek cseréje
        const t = translations[lang];
        
        // Navigáció
        document.querySelectorAll('.nav-links a').forEach((link, index) => {
            if (index === 0) link.textContent = t.home;
            if (index === 1) link.textContent = t.gallery;
            if (index === 2) link.textContent = t.about;
            if (index === 3) link.textContent = t.etsyShop;
        });

        // Hero section
        document.querySelector('.hero-content p').textContent = t.heroText;
        document.querySelector('.cta-btn').textContent = t.discover;

        // Gallery section
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.textContent = t.purchase;
        });

        // About section
        document.querySelector('.about-content h2').textContent = t.aboutTitle;
        document.querySelector('.about-content p:first-of-type').textContent = t.aboutText1;
        document.querySelector('.about-content p:last-of-type').textContent = t.aboutText2;

        // Contact section
        document.querySelector('.contact-info h2').textContent = t.contactTitle;
        document.querySelector('.contact-info > p').textContent = t.contactText;
        document.querySelector('.contact-details p:first-of-type').textContent = t.email;
        document.querySelector('.contact-details p:last-of-type').textContent = t.phone;

        // Contact form
        const form = document.getElementById('contactForm');
        form.querySelector('input[name="user_name"]').placeholder = t.name;
        form.querySelector('input[name="user_email"]').placeholder = t.emailInput;
        form.querySelector('textarea').placeholder = t.message;
        form.querySelector('.submit-btn').textContent = t.send;

        // Footer
        document.querySelector('.footer p').textContent = `© 2024 Juliart - ${t.copyright}`;
    });
});

// Email küldés állapotainak fordítása
const originalSubmitHandler = document.getElementById('contactForm').onsubmit;
document.getElementById('contactForm').onsubmit = function(event) {
    const lang = document.documentElement.lang;
    const t = translations[lang];
    const btn = this.querySelector('.submit-btn');
    
    event.preventDefault();
    btn.disabled = true;
    btn.textContent = t.sending;

    emailjs.send('service_ja88qym', 'template_16o1qo6', {
        from_name: this.user_name.value,
        from_email: this.user_email.value,
        message: this.message.value
    })
    .then(() => {
        btn.textContent = t.sent;
        this.reset();
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = t.send;
        }, 3000);
    })
    .catch((error) => {
        btn.textContent = t.error;
        console.log('Error:', error);
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = t.send;
        }, 3000);
    });
}; 