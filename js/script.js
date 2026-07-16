// ---- Typing animation: types and deletes what Billy builds ----
const words = ["software.","websites.","apps.","plugins.","WordPress themes.","extensions.","APIs."];
const typedEl = document.getElementById('typed');
let wi = 0, ci = 0, deleting = false;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLoop(){
  const word = words[wi];
  if(!deleting){
    ci++;
    typedEl.textContent = word.slice(0,ci);
    if(ci === word.length){
      deleting = true;
      setTimeout(typeLoop, 1600); // pause on full word
      return;
    }
    setTimeout(typeLoop, 85);
  } else {
    ci--;
    typedEl.textContent = word.slice(0,ci);
    if(ci === 0){
      deleting = false;
      wi = (wi + 1) % words.length;
      setTimeout(typeLoop, 350);
      return;
    }
    setTimeout(typeLoop, 45);
  }
}
if(reduceMotion){
  typedEl.textContent = words[0]; // static for reduced motion users
} else {
  typeLoop();
}

// ---- Live Nairobi clock (EAT, UTC+3) ----
function tick(){
  const now = new Date();
  const opts = {timeZone:'Africa/Nairobi',hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'};
  const t = new Intl.DateTimeFormat('en-GB',opts).format(now);
  const set = (id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
  set('footClock',t.slice(0,5));
}
tick();
setInterval(tick,1000);

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Mobile menu ----
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click',()=>{
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));

// ---- Scroll reveal + skill bar animation ----
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      e.target.querySelectorAll('.bar i').forEach(b=>{
        b.style.width = b.dataset.w + '%';
      });
      io.unobserve(e.target);
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ---- Toast notifications ----
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toastIcon');
const toastTitle = document.getElementById('toastTitle');
const toastMsg = document.getElementById('toastMsg');
let toastTimer;

function showToast(type, title, msg) {
  clearTimeout(toastTimer);
  toast.className = 'toast ' + type;
  toastIcon.textContent = type === 'success' ? '✓' : '!';
  toastTitle.textContent = title;
  toastMsg.textContent = msg;
  requestAnimationFrame(() => toast.classList.add('show'));
  toastTimer = setTimeout(() => toast.classList.remove('show'), 5000);
}

// ---- Contact form -> Web3Forms ----
const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
const sendBtnText = document.getElementById('sendBtnText');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  sendBtn.disabled = true;
  sendBtnText.textContent = 'Sending…';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
    });
    const data = await res.json();

    if (data.success) {
      contactForm.reset();
      showToast('success', 'Message sent', 'Thanks — I\'ll get back to you within 24 hours.');
    } else {
      throw new Error(data.message || 'Something went wrong');
    }
  } catch (err) {
    showToast('error', 'Could not send', 'Please try again or email hello@remotech.dev directly.');
  } finally {
    sendBtn.disabled = false;
    sendBtnText.textContent = 'Send message';
  }
});
