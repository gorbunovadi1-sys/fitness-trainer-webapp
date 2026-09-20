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

// ---------- Backend API ----------
const API_BASE = "https://fitness-trainer-bot-production-b12c.up.railway.app";

function getInitData() {
  try {
    return (window.Telegram && Telegram.WebApp && Telegram.WebApp.initData) || "";
  } catch (e) {
    return "";
  }
}

async function postJSON(path, body) {
  try {
    await fetch(API_BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: getInitData(), ...body }),
    });
  } catch (e) {
    console.warn("API call failed:", path, e);
  }
}

// ---------- Program ----------
// Реальные данные приходят из /api/bootstrap (тренер вносит их в /admin).
// DEMO_* — то, что видно, пока бэкенд недоступен (например, открыли вне Telegram без сети).
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const DEMO_PROGRAM = {
  "Пн": {
    title: "НИЗ ТЕЛА", duration: "45 мин",
    exercises: [
      { icon: "🏋", name: "Приседания с гантелями", sets: "4 × 10", weighted: true, weight: null, done: false },
      { icon: "🦵", name: "Выпады", sets: "3 × 12", weighted: true, weight: null, done: false },
      { icon: "🧱", name: "Ягодичный мостик", sets: "3 × 15", weighted: true, weight: null, done: false },
    ],
  },
  "Вт": { title: "ОТДЫХ", duration: "", exercises: [] },
  "Ср": {
    title: "ВЕРХ ТЕЛА", duration: "40 мин",
    exercises: [
      { icon: "💪", name: "Жим гантелей лёжа", sets: "3 × 12", weighted: true, weight: null, done: false },
      { icon: "🏋", name: "Тяга гантели в наклоне", sets: "3 × 12", weighted: true, weight: null, done: false },
      { icon: "🤸", name: "Разведение гантелей", sets: "3 × 15", weighted: true, weight: null, done: false },
      { icon: "🧱", name: "Планка", sets: "3 × 40 сек", weighted: false, done: false },
    ],
  },
  "Чт": {
    title: "КАРДИО", duration: "30 мин",
    exercises: [
      { icon: "🏃", name: "Бег / эллипс", sets: "30 мин", weighted: false, done: false },
    ],
  },
  "Пт": {
    title: "ВЕРХ ТЕЛА 2", duration: "45 мин",
    exercises: [
      { icon: "💪", name: "Жим штанги лёжа", sets: "4 × 8", weighted: true, weight: null, done: false },
      { icon: "🏋", name: "Тяга верхнего блока", sets: "3 × 12", weighted: true, weight: null, done: false },
    ],
  },
  "Сб": {
    title: "НИЗ ТЕЛА 2", duration: "40 мин",
    exercises: [
      { icon: "🦵", name: "Румынская тяга", sets: "3 × 10", weighted: true, weight: null, done: false },
    ],
  },
  "Вс": { title: "ОТДЫХ", duration: "", exercises: [] },
};

const DEMO_EXERCISE_HISTORY = {
  "Жим гантелей лёжа": [
    { date: "2026-08-24", weight: 17.5 },
    { date: "2026-08-31", weight: 20 },
    { date: "2026-09-07", weight: 20 },
    { date: "2026-09-14", weight: 22.5 },
  ],
  "Тяга гантели в наклоне": [
    { date: "2026-08-24", weight: 14 },
    { date: "2026-09-07", weight: 16 },
    { date: "2026-09-14", weight: 18 },
  ],
  "Приседания с гантелями": [
    { date: "2026-08-24", weight: 12 },
    { date: "2026-09-14", weight: 16 },
  ],
};

const DEMO_NUTRITION_TARGET = { kcal: 1800, protein: 130, fat: 60, carbs: 180 };

let PROGRAM = DEMO_PROGRAM;
let EXERCISE_HISTORY = DEMO_EXERCISE_HISTORY;
let NUTRITION_TARGET = DEMO_NUTRITION_TARGET;

function lastWeightFor(name) {
  const hist = EXERCISE_HISTORY[name];
  if (!hist || !hist.length) return null;
  return hist[hist.length - 1].weight;
}

function normalizeProgram(rawProgram) {
  const program = {};
  DAYS.forEach(day => {
    const info = rawProgram[day] || { title: "ОТДЫХ", duration: "", exercises: [] };
    program[day] = {
      title: info.title,
      duration: info.duration,
      exercises: (info.exercises || []).map(e => ({
        name: e.name,
        sets: e.sets,
        weighted: !!e.weighted,
        weight: null,
        done: false,
        icon: e.weighted ? "💪" : "⏱",
      })),
    };
  });
  return program;
}

let MEASUREMENTS = [];

async function loadRealData() {
  try {
    const res = await fetch(API_BASE + "/api/bootstrap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: getInitData() }),
    });
    if (!res.ok) return;
    const data = await res.json();
    PROGRAM = normalizeProgram(data.program);
    NUTRITION_TARGET = data.nutrition_target;
    if (Object.keys(data.exercise_history).length) EXERCISE_HISTORY = data.exercise_history;
    MEASUREMENTS = data.measurements || [];
  } catch (e) {
    console.warn("Не удалось загрузить данные с бэкенда, показываю демо:", e);
  }
}

const RU_DAY_BY_JS_INDEX = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
let currentWorkoutDay = RU_DAY_BY_JS_INDEX[new Date().getDay()];
if (!PROGRAM[currentWorkoutDay]) currentWorkoutDay = "Пн";

function saveWorkoutLog() {
  const exercises = PROGRAM[currentWorkoutDay].exercises.filter(e => e.weighted);
  if (!exercises.length) return;
  postJSON("/api/workout-log", {
    exercises: exercises.map(e => ({ name: e.name, weight: e.weight, done: !!e.done })),
  });
}

function renderExercises(exercises) {
  const list = document.getElementById("exercise-list");

  if (!exercises.length) {
    list.innerHTML = `<div class="hint-text" style="margin: 24px 0;">Сегодня день отдыха 😴</div>`;
    return;
  }

  list.innerHTML = exercises.map((ex, i) => {
    const prev = lastWeightFor(ex.name);
    return `
    <div class="exercise-item">
      <div class="exercise-thumb">${ex.icon}</div>
      <div class="exercise-info">
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-sets">${ex.sets}</div>
        ${ex.weighted ? `
          <div class="weight-field">
            <input type="number" inputmode="decimal" step="0.5" min="0"
                   class="weight-input" data-weight="${i}"
                   placeholder="${prev !== null ? prev : "вес"}" value="${ex.weight ?? ""}" />
            <span class="weight-unit">кг</span>
          </div>
          ${prev !== null ? `<div class="prev-weight-hint">Прошлый раз: ${prev} кг</div>` : ""}` : ""}
      </div>
      <div class="exercise-check ${ex.done ? "done" : ""}" data-check="${i}"></div>
    </div>
  `;
  }).join("");

  list.querySelectorAll("[data-check]").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.toggle("done");
      exercises[Number(el.dataset.check)].done = el.classList.contains("done");
      saveWorkoutLog();
    });
  });

  list.querySelectorAll("[data-weight]").forEach(input => {
    input.addEventListener("input", () => {
      exercises[Number(input.dataset.weight)].weight = input.value ? Number(input.value) : null;
    });
    input.addEventListener("change", saveWorkoutLog);
    input.addEventListener("click", e => e.stopPropagation());
  });
}

function renderWorkoutDayPills() {
  const wrap = document.getElementById("workout-day-pills");
  wrap.innerHTML = DAYS.map(d => `<span data-day="${d}" class="${d === currentWorkoutDay ? "active" : ""}">${d}</span>`).join("");
  wrap.querySelectorAll("[data-day]").forEach(el => {
    el.addEventListener("click", () => selectWorkoutDay(el.dataset.day));
  });
}

function selectWorkoutDay(day) {
  currentWorkoutDay = day;
  const info = PROGRAM[day];
  document.getElementById("workout-day-title").textContent = info.title;
  document.getElementById("workout-day-meta").textContent = info.exercises.length
    ? `⏱ ${info.duration} · 🔥 ${info.exercises.length} упражнений`
    : "😴 День отдыха";
  renderWorkoutDayPills();
  renderExercises(info.exercises);
}

function renderWeekProgram() {
  const wrap = document.getElementById("week-program-list");
  wrap.innerHTML = DAYS.map(d => {
    const info = PROGRAM[d];
    const isRest = info.exercises.length === 0;
    return `
      <div class="week-program-day">
        <div class="week-program-day-head">
          <span class="week-program-day-name${d === currentWorkoutDay ? " is-today" : ""}">${d}</span>
          <span class="week-program-day-title">${info.title}</span>
        </div>
        ${isRest ? "" : `<div class="week-program-exercises">${info.exercises.map(e => `
          <div class="week-program-ex-row"><span>${e.name}</span><span>${e.sets}</span></div>
        `).join("")}</div>`}
      </div>`;
  }).join("");
}

// ---------- Силовой прогресс ----------
function buildSparklinePoints(values, width = 320, height = 120, pad = 14) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = values.length > 1 ? width / (values.length - 1) : 0;
  return values.map((v, i) => {
    const x = i * stepX;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
}

function renderStrengthChart(name) {
  const hist = EXERCISE_HISTORY[name] || [];
  const values = hist.map(h => h.weight);
  const svg = document.getElementById("strength-chart");

  if (!values.length) {
    svg.innerHTML = "";
    ["strength-first", "strength-last", "strength-delta"].forEach(id => {
      document.getElementById(id).textContent = "—";
    });
    return;
  }

  const points = buildSparklinePoints(values);
  const last = points[points.length - 1].split(",");
  svg.innerHTML = `
    <polyline fill="none" stroke="var(--accent)" stroke-width="3" points="${points.join(" ")}" />
    <circle cx="${last[0]}" cy="${last[1]}" r="5" fill="var(--accent)" />
  `;

  document.getElementById("strength-first").textContent = `${values[0]} кг`;
  document.getElementById("strength-last").textContent = `${values[values.length - 1]} кг`;
  const delta = Math.round((values[values.length - 1] - values[0]) * 10) / 10;
  document.getElementById("strength-delta").textContent = `${delta >= 0 ? "+" : ""}${delta} кг`;
}

// ---------- Вес и замеры ----------
function renderWeightTab() {
  const weights = MEASUREMENTS.filter(m => m.weight != null).map(m => m.weight);
  const svg = document.getElementById("weight-chart");

  if (weights.length < 2) {
    svg.innerHTML = "";
  } else {
    const points = buildSparklinePoints(weights);
    const last = points[points.length - 1].split(",");
    svg.innerHTML = `
      <polyline fill="none" stroke="var(--accent)" stroke-width="3" points="${points.join(" ")}" />
      <circle cx="${last[0]}" cy="${last[1]}" r="5" fill="var(--accent)" />
    `;
  }

  document.getElementById("weight-start").textContent = weights.length ? `${weights[0]} кг` : "—";
  document.getElementById("weight-current").textContent = weights.length ? `${weights[weights.length - 1]} кг` : "—";

  const banner = document.getElementById("weight-banner");
  if (weights.length >= 2) {
    const delta = Math.round((weights[weights.length - 1] - weights[0]) * 10) / 10;
    banner.textContent = delta <= 0 ? `− ${Math.abs(delta)} кг с начала` : `+ ${delta} кг с начала`;
  } else {
    banner.textContent = "Внеси ещё один замер, чтобы видеть динамику";
  }
}

function renderMeasurementsHistory() {
  const wrap = document.getElementById("measurements-history");
  if (!MEASUREMENTS.length) {
    wrap.textContent = "Записей пока нет.";
    return;
  }
  const fields = [
    ["weight", "Вес", "кг"], ["waist", "Талия", "см"], ["hips", "Бёдра", "см"],
    ["chest", "Грудь", "см"], ["arms", "Руки", "см"], ["thighs", "Бедро", "см"],
  ];
  wrap.innerHTML = MEASUREMENTS.slice().reverse().map(m => {
    const date = new Date(m.ts).toLocaleDateString("ru-RU");
    const values = fields
      .filter(([key]) => m[key] != null)
      .map(([key, label, unit]) => `${label}: <b>${m[key]} ${unit}</b>`)
      .join(" · ");
    return `<div class="measurement-row"><span>${date}</span><span>${values}</span></div>`;
  }).join("");
}

document.querySelectorAll("[data-goto-tab]").forEach(btn => {
  btn.addEventListener("click", () => {
    const seg = document.getElementById("progress-segmented");
    const target = seg.querySelector(`[data-view="${btn.dataset.gotoTab}"]`);
    if (target) target.click();
  });
});

document.getElementById("submit-measurement").addEventListener("click", async () => {
  const fields = ["weight", "waist", "hips", "chest", "arms", "thighs"];
  const payload = {};
  fields.forEach(f => {
    const val = document.getElementById(`m-${f}`).value;
    payload[f] = val ? Number(val) : null;
  });

  if (Object.values(payload).every(v => v === null)) return;

  await postJSON("/api/measurement", payload);
  MEASUREMENTS.push({ ts: new Date().toISOString(), ...payload });

  fields.forEach(f => (document.getElementById(`m-${f}`).value = ""));
  renderWeightTab();
  renderMeasurementsHistory();

  const badge = document.getElementById("measurement-saved");
  badge.hidden = false;
  setTimeout(() => (badge.hidden = true), 2000);
});

function renderStrengthPills() {
  const wrap = document.getElementById("strength-exercise-pills");
  const names = Object.keys(EXERCISE_HISTORY);
  wrap.innerHTML = names.map((n, i) => `<span data-ex="${n}" class="${i === 0 ? "active" : ""}">${n}</span>`).join("");
  wrap.querySelectorAll("[data-ex]").forEach(el => {
    el.addEventListener("click", () => {
      wrap.querySelectorAll("span").forEach(s => s.classList.remove("active"));
      el.classList.add("active");
      renderStrengthChart(el.dataset.ex);
    });
  });
  if (names.length) renderStrengthChart(names[0]);
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

      if (opt.dataset.view) {
        const screen = seg.closest("[data-screen]");
        screen.querySelectorAll("[data-view-content]").forEach(block => {
          block.hidden = block.dataset.viewContent !== opt.dataset.view;
        });
      }
    });
  });
});

// ---------- Weekly nutrition analysis ----------
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

  const avgKcal = average(WEEK_NUTRITION.map(d => d.kcal));
  const avgP = average(WEEK_NUTRITION.map(d => d.p));
  const avgF = average(WEEK_NUTRITION.map(d => d.f));
  const avgC = average(WEEK_NUTRITION.map(d => d.c));
  const daysCounted = daysWithData.length;

  document.getElementById("week-summary").innerHTML = `
    <div class="week-summary-row"><span>Калории (среднее/день)</span><span>${Math.round(avgKcal)} ккал ${fmtDelta(avgKcal, NUTRITION_TARGET.kcal, "ккал")}</span></div>
    <div class="week-summary-row"><span>Белки</span><span>${Math.round(avgP)} г ${fmtDelta(avgP, NUTRITION_TARGET.protein, "г")}</span></div>
    <div class="week-summary-row"><span>Жиры</span><span>${Math.round(avgF)} г ${fmtDelta(avgF, NUTRITION_TARGET.fat, "г")}</span></div>
    <div class="week-summary-row"><span>Углеводы</span><span>${Math.round(avgC)} г ${fmtDelta(avgC, NUTRITION_TARGET.carbs, "г")}</span></div>
    <div class="week-summary-row"><span>Дней учтено</span><span>${daysCounted} из 7</span></div>
  `;

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
  const values = { sleep: 0, stress: 0, mood: 0, compliance: 0 };
  document.querySelectorAll(".checkin-field").forEach(field => {
    const label = field.querySelector(".checkin-label").textContent;
    const selected = field.querySelectorAll(".scale-10 span.selected").length;
    if (label.includes("Сон")) values.sleep = selected;
    else if (label.includes("Стресс")) values.stress = selected;
    else if (label.includes("Самочувствие")) values.mood = selected;
    else if (label.includes("плана")) values.compliance = selected;
  });

  postJSON("/api/checkin", values);

  try {
    if (window.Telegram && window.Telegram.WebApp) {
      Telegram.WebApp.HapticFeedback?.notificationOccurred("success");
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

(async () => {
  await loadRealData();

  if (!PROGRAM[currentWorkoutDay]) currentWorkoutDay = "Пн";
  document.getElementById("nutrition-goal-kcal").textContent = NUTRITION_TARGET.kcal;

  selectWorkoutDay(currentWorkoutDay);
  renderWeekProgram();
  renderStrengthPills();
  renderWeekNutrition();
  renderWeightTab();
  renderMeasurementsHistory();

  const KNOWN_SCREENS = ["home", "workouts", "nutrition", "progress", "checkin", "profile"];
  const requestedScreen = new URLSearchParams(window.location.search).get("screen");
  showScreen(KNOWN_SCREENS.includes(requestedScreen) ? requestedScreen : "home");
})();
