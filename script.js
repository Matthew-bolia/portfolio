  // =========================
// TYPING TEXT EFFECT
// =========================
const typingEl = document.getElementById("typing");
if(typingEl){
  const texts = JSON.parse(typingEl.dataset.texts);
  let count = 0;
  let index = 0;
  let currentText = '';
  let letter = '';
  (function type(){
    if(count === texts.length) count=0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    typingEl.textContent = letter;
    if(letter.length === currentText.length){
      setTimeout(()=>{
        index=0;
        count++;
        type();
      },1500);
    } else {
      setTimeout(type,100);
    }
  }());
}

// =========================
// SCROLL REVEAL SECTIONS
// =========================
window.addEventListener("scroll", function(){
  let reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
});

// =========================
// HEADER SCROLL EFFECT
// =========================
const header = document.getElementById("header");
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 50){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// =========================
// MENU HAMBURGER TOGGLE
// =========================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle && navLinks){
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
    });
  });
}

// =========================
// DARK MODE
// =========================
const darkModeBtn = document.createElement('button');
darkModeBtn.classList.add('dark-mode-toggle');
darkModeBtn.innerHTML = '🌓';
darkModeBtn.title = 'Activer/Désactiver le mode sombre';

const nav = document.querySelector('nav');
nav.appendChild(darkModeBtn);

if(localStorage.getItem('dark-mode') === 'enabled'){
  document.body.classList.add('dark-mode');
  darkModeBtn.innerHTML = '🌞';
}

darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('dark-mode', 'enabled');
    darkModeBtn.innerHTML = '🌞';
  } else {
    localStorage.setItem('dark-mode', 'disabled');
    darkModeBtn.innerHTML = '🌙';
  }
});

// =========================
// TELECHARGER CV DANS HEADER
// =========================
const cvBtn = document.createElement('button');
cvBtn.id = 'download-cv';
cvBtn.classList.add('btn');
cvBtn.textContent = 'Télécharger CV';
nav.appendChild(cvBtn);

cvBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'cv.pdf';
  link.download = 'Matthew_Bolia_CV.pdf';
  link.click();
});

// =========================
// EFFET 3D INTERACTIF HERO IMAGE
// =========================
const heroImage = document.querySelector('.hero-image img');
const heroSection = document.querySelector('#hero');

if(heroImage && heroSection){
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 20; // rotation horizontale
    const rotateX = (0.5 - y / rect.height) * 20; // rotation verticale

    heroImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
  });
}

 // Générer des symboles </> flottants
const bgSymbols = document.querySelector('.bg-symbols');
const symbolCount = 50; // nombre de symboles
const symbols = [];

for (let i = 0; i < symbolCount; i++) {
    const span = document.createElement('span');
    span.className = 'symbol';
    span.innerHTML = '&lt;/&gt;';
    // position initiale aléatoire
    span.style.top = `${Math.random() * 100}%`;
    span.style.left = `${Math.random() * 100}%`;
    span.style.fontSize = `${Math.random() * 2 + 1}rem`;
    // vitesse beaucoup plus faible pour un mouvement élégant
    span.speed = Math.random() * 0.1 + 0.02; 
    span.directionX = Math.random() < 0.5 ? 1 : -1;
    span.directionY = Math.random() < 0.5 ? 1 : -1;
    bgSymbols.appendChild(span);
    symbols.push(span);
}

// Animation continue fluide
function animateSymbols() {
    symbols.forEach(sym => {
        let top = parseFloat(sym.style.top);
        let left = parseFloat(sym.style.left);

        // déplacement lent et subtil
        top += sym.speed * sym.directionY;
        left += sym.speed * sym.directionX;

        // rebond doux sur les bords
        if (top > 100 || top < 0) sym.directionY *= -1;
        if (left > 100 || left < 0) sym.directionX *= -1;

        sym.style.top = `${top}%`;
        sym.style.left = `${left}%`;
    });

    requestAnimationFrame(animateSymbols);
}

animateSymbols();

document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


