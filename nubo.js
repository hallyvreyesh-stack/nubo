document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("monthYear");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  let date = new Date();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  function renderCalendar(month, year) {
    calendar.innerHTML = "";

    const firstDay = new Date(year, month).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Nombres de los días
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    daysOfWeek.forEach(day => {
      const dayName = document.createElement("div");
      dayName.classList.add("day-name");
      dayName.textContent = day;
      calendar.appendChild(dayName);
    });

    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      empty.classList.add("day", "empty");
      calendar.appendChild(empty);
    }

    // Días del mes
    for (let i = 1; i <= lastDate; i++) {
      const day = document.createElement("div");
      day.classList.add("day");
      day.textContent = i;

      // Día actual
      const today = new Date();
      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        day.classList.add("today");
      }

      calendar.appendChild(day);
    }
  }

  prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  renderCalendar(currentMonth, currentYear);
});

function redirigir(pagina) {
  window.location.href = pagina;
}

