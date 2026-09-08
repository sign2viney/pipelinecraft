// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Hero terminal — one orchestrated typing sequence on load
// =========================================================
const terminalBody = document.getElementById('terminalBody');

const script = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'rohan-verma — aspiring devops engineer' },
  { type: 'cmd', text: 'cat status.txt' },
  { type: 'out', text: 'linux ......... <span class="ok">comfortable</span>\ngit ........... <span class="ok">comfortable</span>\ngithub ........ <span class="ok">comfortable</span>\ndocker ........ <span class="warn">practicing</span>\nci/cd ......... learning\naws ........... learning' },
  { type: 'cmd', text: 'echo $NEXT_STEP' },
  { type: 'out', text: 'ship a real pipeline to production' }
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderStatic() {
  terminalBody.innerHTML = script.map(item => {
    if (item.type === 'cmd') {
      return `<p class="line"><span class="prompt">$</span> ${item.text}</p>`;
    }
    return `<span class="out">${item.text}</span>`;
  }).join('');
}

function typeSequence() {
  let stepIndex = 0;

  function nextStep() {
    if (stepIndex >= script.length) return;
    const item = script[stepIndex];

    if (item.type === 'out') {
      const outEl = document.createElement('span');
      outEl.className = 'out';
      outEl.innerHTML = item.text;
      terminalBody.appendChild(outEl);
      stepIndex++;
      setTimeout(nextStep, 350);
      return;
    }

    // typing a command line
    const line = document.createElement('p');
    line.className = 'line';
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = '$ ';
    const typed = document.createElement('span');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '▌';

    line.appendChild(prompt);
    line.appendChild(typed);
    line.appendChild(cursor);
    terminalBody.appendChild(line);

    let charIndex = 0;
    const text = item.text;

    const typeChar = setInterval(() => {
      typed.textContent += text[charIndex];
      charIndex++;
      if (charIndex >= text.length) {
        clearInterval(typeChar);
        cursor.remove();
        stepIndex++;
        setTimeout(nextStep, 250);
      }
    }, 38);
  }

  nextStep();
}

if (reduceMotion) {
  renderStatic();
} else {
  typeSequence();
}

// =========================================================
// Timeline — fill the connecting line once it scrolls into view
// =========================================================
const timeline = document.getElementById('timeline');

if (timeline && 'IntersectionObserver' in window) {
  // fill proportional to how far through the six stages the
  // learner has progressed (comfortable + practicing weighted)
  timeline.style.setProperty('--fill', '62%');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeline.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(timeline);
} else if (timeline) {
  timeline.style.setProperty('--fill', '62%');
  timeline.classList.add('in-view');
}