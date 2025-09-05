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
