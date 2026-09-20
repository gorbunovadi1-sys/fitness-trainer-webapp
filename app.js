// Telegram WebApp init (no-op safely outside Telegram)
let CLIENT_NAME = "Спортсмен";
try {
  if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
    const tgUser = Telegram.WebApp.initDataUnsafe?.user;
    if (tgUser?.first_name) CLIENT_NAME = tgUser.first_name;
  }
} catch (e) {}

document.getElementById("home-greeting").textContent = `ПРИВЕТ, ${CLIENT_NAME.toUpperCase()}!`;
document.getElementById("profile-name").textContent = CLIENT_NAME;
document.getElementById("profile-avatar").textContent = CLIENT_NAME.charAt(0).toUpperCase();

const EXERCISES = [
  { icon: "💪", name: "Жим гантелей лёжа", sets: "3 × 12", weighted: true, weight: null },
  { icon: "🏋", name: "Тяга гантели в наклоне", sets: "3 × 12", weighted: true, weight: null },
  { icon: "🤸", name: "Разведение гантелей", sets: "3 × 15", weighted: true, weight: null },
  { icon: "🧱", name: "Планка", sets: "3 × 40 сек", weighted: false },
];

function renderExercises() {
  const list = document.getElementById("exercise-list");
  list.innerHTML = EXERCISES.map((ex, i) => `
    <div class="exercise-item">
      <div class="exercise-thumb">${ex.icon}</div>
      <div class="exercise-info">
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-sets">${ex.sets}</div>
        ${ex.weighted ? `
          <div class="weight-field">
            <input type="number" inputmode="decimal" step="0.5" min="0"
                   class="weight-input" data-weight="${i}"
                   placeholder="вес" value="${ex.weight ?? ""}" />
            <span class="weight-unit">кг</span>
          </div>` : ""}
      </div>
      <div class="exercise-check" data-check="${i}"></div>
    </div>
  `).join("");

  list.querySelectorAll("[data-check]").forEach(el => {
    el.addEventListener("click", () => el.classList.toggle("done"));
  });

  list.querySelectorAll("[data-weight]").forEach(input => {
    input.addEventListener("input", () => {
      EXERCISES[Number(input.dataset.weight)].weight = input.value ? Number(input.value) : null;
    });
    input.addEventListener("click", e => e.stopPropagation());
  });
}

function showScreen(name) {
  document.querySelectorAll("[data-screen]").forEach(s => {
    s.hidden = s.id !== `screen-${name}`;
  });
  document.querySelectorAll("[data-tab]").forEach(t => {
    t.classList.toggle("active", t.dataset.nav === name);
  });
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-nav]").forEach(el => {
  el.addEventListener("click", () => showScreen(el.dataset.nav));
});

document.querySelectorAll(".segmented").forEach(seg => {
  seg.querySelectorAll("span").forEach(opt => {
    opt.addEventListener("click", () => {
      seg.querySelectorAll("span").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");

      // if this segmented control drives named content blocks (currently: nutrition day/week)
      if (opt.dataset.view) {
        const screen = seg.closest("[data-screen]");
        screen.querySelectorAll("[data-view-content]").forEach(block => {
          block.hidden = block.dataset.viewContent !== opt.dataset.view;
        });
        if (opt.dataset.view === "week") renderWeekNutrition();
      }
    });
  });
});

// ---------- Weekly nutrition analysis ----------
// Норма (из профиля/программы клиента). На MVP — заглушка, дальше берётся из Profile.target.
const NUTRITION_TARGET = { kcal: 1800, p: 130, f: 60, c: 180 };

// Дневные записи за неделю: заполняются вручную (текст+скрин) или, в фазе 2, синхронизацией с FatSecret.
// null = клиент не внёс данные в этот день — такой день не участвует в среднем.
const WEEK_NUTRITION = [
  { day: "Пн", kcal: 1750, p: 125, f: 55, c: 170 },
  { day: "Вт", kcal: 2100, p: 110, f: 80, c: 220 },
  { day: "Ср", kcal: 1450, p: 120, f: 45, c: 160 },
  { day: "Чт", kcal: null },
  { day: "Пт", kcal: 1900, p: 130, f: 60, c: 190 },
  { day: "Сб", kcal: 2200, p: 100, f: 90, c: 240 },
  { day: "Вс", kcal: 1600, p: 140, f: 50, c: 150 },
];

function average(values) {
  const present = values.filter(v => v !== null && v !== undefined);
  if (!present.length) return null;
  return present.reduce((a, b) => a + b, 0) / present.length;
}

function fmtDelta(avg, target, unit) {
  const delta = Math.round(avg - target);
  const sign = delta > 0 ? "+" : "";
  const cls = Math.abs(delta) <= target * 0.05 ? "delta-ok" : (delta > 0 ? "delta-over" : "delta-under");
  return `<span class="${cls}">${sign}${delta} ${unit}</span>`;
}

function renderWeekNutrition() {
  const daysWithData = WEEK_NUTRITION.filter(d => d.kcal !== null);
  const maxKcal = Math.max(NUTRITION_TARGET.kcal * 1.3, ...daysWithData.map(d => d.kcal));

  // per-day bars
  document.getElementById("week-day-list").innerHTML = WEEK_NUTRITION.map(d => {
    if (d.kcal === null) {
      return `
        <div class="week-day-row">
          <div class="week-day-name">${d.day}</div>
          <div class="week-day-bar-wrap"></div>
          <div class="week-day-kcal missing">нет данных</div>
        </div>`;
    }
    const pct = Math.min(100, (d.kcal / maxKcal) * 100);
    const over = d.kcal > NUTRITION_TARGET.kcal * 1.1;
    return `
      <div class="week-day-row">
        <div class="week-day-name">${d.day}</div>
        <div class="week-day-bar-wrap"><div class="week-day-bar ${over ? "over" : "ok"}" style="width:${pct}%"></div></div>
        <div class="week-day-kcal">${d.kcal} ккал</div>
      </div>`;
  }).join("");

  // averages
  const avgKcal = average(WEEK_NUTRITION.map(d => d.kcal));
  const avgP = average(WEEK_NUTRITION.map(d => d.p));
  const avgF = average(WEEK_NUTRITION.map(d => d.f));
  const avgC = average(WEEK_NUTRITION.map(d => d.c));
  const daysCounted = daysWithData.length;

  document.getElementById("week-summary").innerHTML = `
    <div class="week-summary-row"><span>Калории (среднее/день)</span><span>${Math.round(avgKcal)} ккал ${fmtDelta(avgKcal, NUTRITION_TARGET.kcal, "ккал")}</span></div>
    <div class="week-summary-row"><span>Белки</span><span>${Math.round(avgP)} г ${fmtDelta(avgP, NUTRITION_TARGET.p, "г")}</span></div>
    <div class="week-summary-row"><span>Жиры</span><span>${Math.round(avgF)} г ${fmtDelta(avgF, NUTRITION_TARGET.f, "г")}</span></div>
    <div class="week-summary-row"><span>Углеводы</span><span>${Math.round(avgC)} г ${fmtDelta(avgC, NUTRITION_TARGET.c, "г")}</span></div>
    <div class="week-summary-row"><span>Дней учтено</span><span>${daysCounted} из 7</span></div>
  `;

  // verdict text — это и есть ответ на "почему застой", если он есть
  const kcalDelta = Math.round(avgKcal - NUTRITION_TARGET.kcal);
  let verdict;
  if (Math.abs(kcalDelta) <= NUTRITION_TARGET.kcal * 0.05) {
    verdict = `✅ В среднем за неделю норма калорий соблюдена (${Math.round(avgKcal)} из ${NUTRITION_TARGET.kcal} ккал). Если прогресс стоит — причина, скорее всего, не в питании.`;
  } else if (kcalDelta > 0) {
    verdict = `⚠️ В среднем за неделю перебор на ${kcalDelta} ккал/день, в основном за счёт Вт и Сб. Это может объяснять застой в прогрессе, даже если в будни всё по плану.`;
  } else {
    verdict = `⚠️ В среднем за неделю недобор на ${Math.abs(kcalDelta)} ккал/день. При дефиците это не проблема, но при цели набора/поддержания — стоит обратить внимание.`;
  }
  document.getElementById("week-verdict").textContent = verdict;
}

document.querySelectorAll("[data-scale]").forEach(scale => {
  for (let i = 1; i <= 10; i++) {
    const cell = document.createElement("span");
    cell.dataset.value = i;
    scale.appendChild(cell);
  }
  scale.querySelectorAll("span").forEach(cell => {
    cell.addEventListener("click", () => {
      scale.querySelectorAll("span").forEach(c => {
        c.classList.toggle("selected", Number(c.dataset.value) <= Number(cell.dataset.value));
      });
    });
  });
});

document.getElementById("submit-checkin").addEventListener("click", () => {
  try {
    if (window.Telegram && window.Telegram.WebApp) {
      Telegram.WebApp.sendData(JSON.stringify({ type: "checkin_submit" }));
    }
  } catch (e) {}
  showScreen("home");
});

document.getElementById("add-meal-btn").addEventListener("click", () => {
  try {
    if (window.Telegram && window.Telegram.WebApp) {
      Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
  } catch (e) {}
  alert("MVP: пришли скрин/итог КБЖУ прямо в чат с ботом — тренер увидит это в твоей карточке.");
});

renderExercises();

const KNOWN_SCREENS = ["home", "workouts", "nutrition", "progress", "checkin", "profile"];
const requestedScreen = new URLSearchParams(window.location.search).get("screen");
showScreen(KNOWN_SCREENS.includes(requestedScreen) ? requestedScreen : "home");
