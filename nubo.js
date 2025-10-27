// --- Menú móvil ---
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// --- Redirección botones ---
function redirigir(pagina) {
  window.location.href = pagina;
}

// --- Calendario simple ---
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
let currentDate = new Date();

function renderCalendar(date) {
  calendar.innerHTML = "";
  const month = date.getMonth();
  const year = date.getFullYear();

  monthYear.textContent = `${date.toLocaleString("es-ES", { month: "long" })} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  days.forEach(d => {
    const div = document.createElement("div");
    div.textContent = d;
    div.style.fontWeight = "600";
    calendar.appendChild(div);
  });

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= lastDate; day++) {
    const div = document.createElement("div");
    div.textContent = day;
    if (
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      div.classList.add("today");
    }
    calendar.appendChild(div);
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
