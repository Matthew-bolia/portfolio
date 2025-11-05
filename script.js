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
      setTimeout(()=>{ index=0; count++; type(); },1500);
    } else {
      setTimeout(type,100);
    }
  }());
}

// =========================
// SCROLL REVEAL & SKILLS BAR
// =========================
function revealOnScroll() {
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

  // Animation skills bar
  const skills = document.querySelectorAll(".skill-level");
  skills.forEach(skill => {
    const skillTop = skill.getBoundingClientRect().top;
    if(skillTop < window.innerHeight - 100){
      skill.style.width = skill.dataset.percent;
      const span = skill.previousElementSibling.querySelector('span:last-child');
      let width = 0;
      const target = parseInt(skill.dataset.percent);
      const interval = setInterval(()=>{
        if(width >= target) clearInterval(interval);
        else { width++; span.textContent = width + '%'; }
      },15);
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

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
    const rotateY = (x / rect.width - 0.5) * 20;
    const rotateX = (0.5 - y / rect.height) * 20;
    heroImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
  });
}

// =========================
// OUVRIR UN PROJET AU CLIC SUR LA CARTE
// =========================
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach(card => {
  const link = card.dataset.link;
  if(link){
    card.addEventListener('click', (e)=>{
      if(!e.target.closest('.project-link')){
        window.open(link, "_blank");
      }
    });
  }
});

// =========================
// 3D SYMBOLS BACKGROUND (Three.js)
// =========================
const hero3DBg = document.getElementById('hero-3d-bg');
if(hero3DBg){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, hero3DBg.clientWidth / hero3DBg.clientHeight, 0.1, 1000);
  camera.position.z = 50;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(hero3DBg.clientWidth, hero3DBg.clientHeight);
  hero3DBg.appendChild(renderer.domElement);

  const symbols = [];
  const loader = new THREE.FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font){
    for(let i=0; i<50; i++){
      const geometry = new THREE.TextGeometry('</>', {
        font: font,
        size: 3,
        height: 0.5,
        curveSegments: 12
      });
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random()-0.5)*100, (Math.random()-0.5)*60, (Math.random()-0.5)*50);
      mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
      scene.add(mesh);
      symbols.push(mesh);
    }
  });

  function animate(){
    requestAnimationFrame(animate);
    symbols.forEach(sym => {
      sym.rotation.x += 0.005;
      sym.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = hero3DBg.clientWidth / hero3DBg.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(hero3DBg.clientWidth, hero3DBg.clientHeight);
  });
}
