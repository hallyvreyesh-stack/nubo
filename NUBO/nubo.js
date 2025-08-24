// Frases motivacionales por emoción
const frases = {
  "😊": "Comparte tu alegría con alguien hoy 🌟",
  "😐": "Un día tranquilo también es valioso ☁️",
  "😔": "Piensa en algo bueno que te haya pasado 💙",
  "😡": "Respira profundo y suelta lo que no suma 🍃",
  "😴": "El descanso también es progreso 😌"
};

// Frases aleatorias
const frasesExtra = [
  "Eres más fuerte de lo que piensas 💪",
  "Hoy es un buen día para sonreír 😀",
  "Pequeños pasos también son progreso 🚶",
  "Lo mejor está por venir 🌈",
  "Cree en ti, siempre 🌟"
];

// Guardar emoción
function registrar(emoji) {
  const hoy = new Date().toLocaleDateString();
  const frase = frases[emoji];

  document.getElementById("frase").textContent = frase;

  // Guardar en localStorage
  let historial = JSON.parse(localStorage.getItem("nubo")) || [];
  historial.push({ fecha: hoy, emocion: emoji });
  localStorage.setItem("nubo", JSON.stringify(historial));

  mostrarHistorial();
  dibujarGrafico();
}

// Mostrar historial
function mostrarHistorial() {
  let historial = JSON.parse(localStorage.getItem("nubo")) || [];
  const ul = document.getElementById("listaHistorial");
  ul.innerHTML = "";
  historial.slice(-7).reverse().forEach(reg => {
    let li = document.createElement("li");
    li.textContent = ${reg.fecha}: ${reg.emocion};
    ul.appendChild(li);
  });
}

// Frase aleatoria
function fraseRandom() {
  const random = frasesExtra[Math.floor(Math.random() * frasesExtra.length)];
  document.getElementById("fraseAleatoria").textContent = random;
}

// Contacto
document.getElementById("formContacto").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("msgConfirm").textContent = "✅ Mensaje enviado con éxito";
});

// Gráfico simple con canvas
function dibujarGrafico() {
  let historial = JSON.parse(localStorage.getItem("nubo")) || [];
  const ctx = document.getElementById("grafico").getContext("2d");

  const conteo = { "😊": 0, "😐": 0, "😔": 0, "😡": 0, "😴": 0 };
  historial.forEach(r => conteo[r.emocion]++);

  ctx.clearRect(0,0,400,200);
  const emojis = Object.keys(conteo);
  emojis.forEach((emo, i) => {
    ctx.fillStyle = "#3a5fff";
    ctx.fillRect(i*70+20, 200-conteo[emo]*20, 40, conteo[emo]*20);
    ctx.fillStyle = "#000";
    ctx.fillText(emo, i*70+30, 190);
  });
}

// Modo oscuro
document.getElementById("modoBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Cargar historial y gráfico al inicio
mostrarHistorial();
dibujarGrafico();