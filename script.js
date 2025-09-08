  // =========================
// TON CODE EXISTANT
// =========================

// Typing text effect
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

// Scroll reveal sections
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

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 50){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Menu hamburger toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle && navLinks){
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // Fermer le menu quand on clique sur un lien
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

// Création bouton Dark Mode
const darkModeBtn = document.createElement('button');
darkModeBtn.classList.add('dark-mode-toggle');
darkModeBtn.innerHTML = '🌓';
darkModeBtn.title = 'Activer/Désactiver le mode sombre';

// Ajout dans le header
const nav = document.querySelector('nav');
nav.appendChild(darkModeBtn);

// Vérifier si l'utilisateur a déjà choisi un mode
if(localStorage.getItem('dark-mode') === 'enabled'){
  document.body.classList.add('dark-mode');
  darkModeBtn.innerHTML = '🌞'; // Icon pour mode sombre actif
}

// Toggle Dark Mode
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('dark-mode', 'enabled');
    darkModeBtn.innerHTML = '🌞'; // Icon mode sombre actif
  } else {
    localStorage.setItem('dark-mode', 'disabled');
    darkModeBtn.innerHTML = ' 🌙'; // Icon mode clair
  }
});

// =========================
// TELECHARGER CV DANS HEADER
// =========================

// Création du bouton
const cvBtn = document.createElement('button');
cvBtn.id = 'download-cv';
cvBtn.classList.add('btn');
cvBtn.textContent = 'Télécharger CV';

// Ajout dans le header à côté du Dark Mode
nav.appendChild(cvBtn);

// Fonction de téléchargement
cvBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'cv.pdf'; // Chemin réel de ton CV
  link.download = 'Matthew_Bolia_CV.pdf';
  link.click();
});
