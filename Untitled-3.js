// Fondo animado
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

// Partículas
const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 2 + Math.random() * 3,
    dx: -1 + Math.random() * 2,
    dy: -1 + Math.random() * 2,
    color: `rgba(${80+Math.floor(Math.random()*120)},${120+Math.floor(Math.random()*80)},255,0.7)`
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    // rebote o wrap
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  }
  requestAnimationFrame(animate);
}
window.onresize = () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
};
animate();

// Avatares
const avatarData = [
  { url: 'https://api.dicebear.com/7.x/thumbs/svg?seed=cat', nombre: 'Gatito' },
  { url: 'https://api.dicebear.com/7.x/thumbs/svg?seed=dog', nombre: 'Perrito' },
  { url: 'https://api.dicebear.com/7.x/thumbs/svg?seed=fox', nombre: 'Zorro' },
  { url: 'https://api.dicebear.com/7.x/thumbs/svg?seed=robot', nombre: 'Robot' }
];
const avatarsDiv = document.getElementById('avatars');
let selectedAvatar = null;
avatarData.forEach((a, idx) => {
  const img = document.createElement('div');
  img.className = 'avatar';
  img.style.backgroundImage = `url('${a.url}')`;
  img.title = a.nombre;
  img.onclick = () => {
    document.querySelectorAll('.avatar').forEach(el => el.classList.remove('selected'));
    img.classList.add('selected');
    selectedAvatar = idx;
    document.getElementById('startBtn').disabled = false;
  };
  avatarsDiv.appendChild(img);
});

// Juego simple: preguntas tipo quiz
const questions = [
  {
    q: "¿Cuál es la capital de Francia?",
    answers: ["París", "Madrid", "Roma", "Berlín"],
    correct: 0
  },
  {
    q: "¿Cuánto es 9 x 7?",
    answers: ["63", "72", "56", "49"],
    correct: 0
  },
  {
    q: "¿Quién escribió 'Cien años de soledad'?",
    answers: ["Gabriel García Márquez", "Pablo Neruda", "Julio Cortázar", "Mario Vargas Llosa"],
    correct: 0
  },
  {
    q: "¿Qué planeta es conocido como el planeta rojo?",
    answers: ["Marte", "Venus", "Júpiter", "Mercurio"],
    correct: 0
  }
];
let currentQ = 0;
const startBtn = document.getElementById('startBtn');
const gameDiv = document.getElementById('game');
const questionDiv = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const resultDiv = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');

startBtn.onclick = () => {
  startBtn.classList.add('hidden');
  avatarsDiv.classList.add('hidden');
  gameDiv.classList.remove('hidden');
  currentQ = 0;
  showQuestion();
};

function showQuestion() {
  const q = questions[currentQ];
  questionDiv.textContent = q.q;
  answersDiv.innerHTML = '';
  resultDiv.textContent = '';
  nextBtn.classList.add('hidden');
  q.answers.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = ans;
    btn.onclick = () => {
      document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
      if (idx === q.correct) {
        resultDiv.textContent = "¡Correcto! 🎉";
        resultDiv.style.color = "#16a34a";
      } else {
        resultDiv.textContent = "Incorrecto. 😢";
        resultDiv.style.color = "#ef4444";
      }
      nextBtn.classList.remove('hidden');
    };
    answersDiv.appendChild(btn);
  });
}
nextBtn.onclick = () => {
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    gameDiv.innerHTML = `<h2>¡Felicidades!</h2><p>Terminaste el juego. ¿Quieres jugar de nuevo?</p>
      <button onclick="location.reload()">Volver a jugar</button>`;
  }
};