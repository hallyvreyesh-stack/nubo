document.addEventListener("DOMContentLoaded", () => {
  const registros = JSON.parse(localStorage.getItem("emociones")) || [];

  // Actualizar estadísticas
  document.getElementById("total-registros").textContent = registros.length;
  const positivos = registros.filter(r => r.emocion === "feliz" || r.emocion === "tranquilo");
  document.getElementById("dias-positivos").textContent = positivos.length;

  const promedio = Math.round((positivos.length / (registros.length || 1)) * 100);
  document.getElementById("promedio-calificacion").textContent = promedio + "%";

  const emocionesContadas = {};
  registros.forEach(r => emocionesContadas[r.emocion] = (emocionesContadas[r.emocion] || 0) + 1);
  const dominante = Object.entries(emocionesContadas).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  document.getElementById("emocion-dominante").textContent = dominante;

  // 📈 Gráfica 1: Distribución de emociones
  new Chart(document.getElementById("emotionChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(emocionesContadas),
      datasets: [{
        data: Object.values(emocionesContadas),
        backgroundColor: ["#a78bfa", "#c084fc", "#ddd6fe", "#8b5cf6", "#f5d0fe"]
      }]
    },
    options: { plugins: { legend: { position: "bottom" } } }
  });

  // 📉 Gráfica 2: Tendencia semanal
  new Chart(document.getElementById("trendChart"), {
    type: "line",
    data: {
      labels: registros.map(r => r.fecha),
      datasets: [{
        label: "Estado emocional",
        data: registros.map(r => r.nivel || 0),
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: { scales: { y: { beginAtZero: true, max: 10 } } }
  });

  // 💜 Gráfica 3: Energía emocional
  new Chart(document.getElementById("energyChart"), {
    type: "bar",
    data: {
      labels: ["Alta", "Media", "Baja"],
      datasets: [{
        data: [5, 8, 2],
        backgroundColor: ["#d8b4fe", "#a78bfa", "#7e22ce"]
      }]
    },
    options: { plugins: { legend: { display: false } } }
  });

  // 🧠 Gráfica 4: Estado mental
  new Chart(document.getElementById("mindChart"), {
    type: "radar",
    data: {
      labels: ["Concentración", "Relajación", "Ánimo", "Motivación", "Sueño"],
      datasets: [{
        data: [6, 9, 7, 8, 6],
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        borderColor: "#8b5cf6"
      }]
    },
    options: { scales: { r: { beginAtZero: true, max: 10 } } }
  });
});

function exportToCSV() {
  const registros = JSON.parse(localStorage.getItem("emociones")) || [];
  if (registros.length === 0) return alert("No hay datos para exportar.");

  let csv = "Fecha,Emoción,Nivel\n";
  registros.forEach(r => csv += `${r.fecha},${r.emocion},${r.nivel}\n`);

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "resumen_emociones.csv";
  link.click();
}

