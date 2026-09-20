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

// ---------- Мотивационная фраза дня (меняется раз в сутки, свой у каждого дня года) ----------
const MOTIVATIONAL_QUOTES = [
  "Сегодняшняя тренировка — вклад в завтрашнего себя.",
  "Маленькие шаги каждый день дают большой результат.",
  "Тело слушается тех, кто не сдаётся.",
  "Дисциплина сильнее настроения.",
  "Не жди мотивации — начни, и она придёт.",
  "Лучшая версия себя строится по одному повтору.",
  "Сложно — не значит невозможно.",
  "Ты сильнее, чем думаешь.",
  "Прогресс любит постоянство.",
  "Один день не решает всё, но каждый день решает многое.",
  "Результат — это сумма всех дней, когда не хотелось, но сделал.",
  "Комфорт — враг роста.",
  "Сегодня тяжело — завтра легче.",
  "Начни с малого, но начни.",
  "Твой единственный соперник — вчерашний ты.",
  "Усталость временна, гордость — навсегда.",
  "Тело меняется тогда, когда меняются привычки.",
  "Не сравнивай себя с другими — сравнивай с собой вчера.",
  "Каждая тренировка — инвестиция в энергию на весь день.",
  "Сила рождается в повторении.",
  "Верь процессу.",
  "Ты не обязан быть быстрым — обязан быть постоянным.",
  "Мышцы растут не в зале, а в отдыхе — уважай сон.",
  "Дисциплина — это свобода в будущем.",
  "Лень сегодня — сожаление завтра.",
  "Тренировка — это разговор с собой на языке действий.",
  "Пот сегодня — сила завтра.",
  "Не ищи оправданий — ищи решения.",
  "Каждый подход приближает тебя к цели.",
  "Твоя энергия — твой выбор.",
  "Сложные дни делают сильных людей.",
  "Начни день с движения — и день начнёт работать на тебя.",
  "Тело — единственное место, где тебе придётся жить всегда. Заботься о нём.",
  "Маленький прогресс лучше отсутствия прогресса.",
  "То, что кажется трудным сегодня, станет разминкой завтра.",
  "Ты уже сделал самое сложное — начал.",
  "Дисциплина побеждает талант, когда талант ленится.",
  "Не бросай на полпути — именно там начинается результат.",
  "Съеденный завтрак — топливо для победы над днём.",
  "Питание — это фундамент, тренировка — стены.",
  "Вода, сон, движение — три кита прогресса.",
  "Ты тренируешься не для соревнований, а для качества жизни.",
  "Секрет прогресса — не пропускать.",
  "Отговорки не сжигают калории.",
  "Каждый день — новый шанс стать сильнее.",
  "Реши один раз — и просто выполняй.",
  "Результат не спрашивает про настроение.",
  "Тренируйся так, будто результат уже решён.",
  "Не жди идеального дня — тренируйся в обычный.",
  "Терпение — самая недооценённая суперсила.",
  "Ты строишь не тело, а характер.",
  "Сила воли — это мышца, которую тоже можно тренировать.",
  "Твой прогресс не обязан быть быстрым, он обязан быть настоящим.",
  "Успех — это не событие, а привычка.",
  "Тренировка окончена, дисциплина продолжается.",
  "Даже 10 минут — лучше, чем ноль.",
  "Не ищи мотивацию в других — создавай свою.",
  "Первый шаг — самый важный, остальные легче.",
  "Твоё тело способно на большее, чем думает голова.",
  "Сегодняшний труд — завтрашняя лёгкость.",
  "Не гонись за идеалом, гонись за постоянством.",
  "Хочешь другой результат — измени привычки, а не только настроение.",
  "Сила характера видна в тренировках, которые не хотелось делать.",
  "Ты не устал — ты растёшь.",
  "Отдых — часть плана, а не его отмена.",
  "Смотри не на весы, а на то, как меняется твоя энергия.",
  "Каждая мелочь — вода, сон, шаги — складывается в результат.",
  "Двигайся, даже если медленно.",
  "Тело помнит то, что делаешь регулярно.",
  "Терпение к процессу — это уважение к себе.",
  "Ты уже не тот, кем был месяц назад.",
  "Пусть привычки будут сильнее эмоций.",
  "Маленькая победа сегодня — большая уверенность завтра.",
  "Никто не станет сильным за один день — но каждый день делает сильнее.",
  "Твой темп — это твой темп. Сравнивай с собой.",
  "Не откладывай на понедельник то, что можно начать сегодня.",
  "Забота о себе — это не роскошь, а привычка.",
  "Ты тренируешь не только тело, но и умение не сдаваться.",
  "Стабильность побеждает интенсивность.",
  "Тренировка — лучший способ сказать себе «я справлюсь».",
  "Каждый день без оправданий — день с результатом.",
  "Твоя энергия сегодня — это инвестиция в завтра.",
  "Не бойся начинать заново — бойся не начинать вовсе.",
  "Сила — это привычка, а не разовое усилие.",
  "Ты ближе к цели, чем был вчера.",
  "Реальные изменения происходят медленно и незаметно — не бросай.",
  "Хочешь результат — полюби процесс.",
  "Тренируйся для себя настоящего и себя будущего.",
  "Твоё тело — не враг, а команда. Работай с ним, а не против него.",
  "Каждый шаг на пути к цели уже победа.",
];

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

document.getElementById("daily-quote").textContent =
  "«" + MOTIVATIONAL_QUOTES[dayOfYear(new Date()) % MOTIVATIONAL_QUOTES.length] + "»";

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
let WORKOUT_REMINDERS_ENABLED = true;
let NUTRITION_REMINDERS_ENABLED = true;
let MEASUREMENT_REMINDERS_ENABLED = true;

function closeMiniApp() {
  try {
    if (window.Telegram && window.Telegram.WebApp) {
      Telegram.WebApp.close();
      return;
    }
  } catch (e) {}
  alert("Открой это в Telegram, чтобы вернуться в чат с ботом.");
}

document.getElementById("contact-trainer-btn").addEventListener("click", () => {
  const trainerUrl = "https://t.me/mikhailpobedinsky";
  try {
    if (window.Telegram && window.Telegram.WebApp && Telegram.WebApp.openTelegramLink) {
      Telegram.WebApp.openTelegramLink(trainerUrl);
      return;
    }
  } catch (e) {}
  window.open(trainerUrl, "_blank");
});
document.getElementById("settings-close-btn").addEventListener("click", closeMiniApp);

document.getElementById("settings-workout-reminders").addEventListener("change", e => {
  WORKOUT_REMINDERS_ENABLED = e.target.checked;
  postJSON("/api/settings", { workout_reminders_enabled: WORKOUT_REMINDERS_ENABLED });
});
document.getElementById("settings-nutrition-reminders").addEventListener("change", e => {
  NUTRITION_REMINDERS_ENABLED = e.target.checked;
  postJSON("/api/settings", { nutrition_reminders_enabled: NUTRITION_REMINDERS_ENABLED });
});
document.getElementById("settings-measurement-reminders").addEventListener("change", e => {
  MEASUREMENT_REMINDERS_ENABLED = e.target.checked;
  postJSON("/api/settings", { measurement_reminders_enabled: MEASUREMENT_REMINDERS_ENABLED });
});
let ANKETA = {};

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
    ANKETA = data.anketa || {};
    PHOTOS = data.photos || [];
    NUTRITION_LOGS = data.nutrition_logs || [];
    WORKOUT_REMINDERS_ENABLED = data.workout_reminders_enabled !== false;
    NUTRITION_REMINDERS_ENABLED = data.nutrition_reminders_enabled !== false;
    MEASUREMENT_REMINDERS_ENABLED = data.measurement_reminders_enabled !== false;
  } catch (e) {
    console.warn("Не удалось загрузить данные с бэкенда, показываю демо:", e);
  }
}

// ---------- Анкета (8 разделов) ----------
const ANKETA_SECTIONS = [
  { key: "general", title: "Общая информация", fields: [
    { key: "name", label: "Имя", type: "text" },
    { key: "age", label: "Возраст", type: "text" },
    { key: "height_weight", label: "Рост / вес", type: "text" },
    { key: "city_timezone", label: "Город / часовой пояс", type: "text" },
    { key: "occupation", label: "Род деятельности (сидячая / активная)", type: "text" },
    { key: "experience", label: "Опыт тренировок (какой, как давно)", type: "textarea" },
  ]},
  { key: "goals", title: "Цели и мотивация", fields: [
    { key: "main_goal", label: "Основная цель", type: "text" },
    { key: "desired_result", label: "Желаемый результат (в цифрах или визуально)", type: "text" },
    { key: "deadline", label: "Срок достижения результата", type: "text" },
    { key: "why_now", label: "Почему эта цель важна именно сейчас", type: "textarea" },
  ]},
  { key: "health", title: "Здоровье и ограничения", warn: true, fields: [
    { key: "chronic", label: "Хронические заболевания", type: "textarea" },
    { key: "injuries", label: "Травмы (прошлые или текущие)", type: "textarea" },
    { key: "joints", label: "Проблемы с суставами / спиной / коленями / давлением", type: "textarea" },
    { key: "medications", label: "Приём лекарств на постоянной основе", type: "text" },
    { key: "contraindications", label: "Противопоказания от врача", type: "textarea" },
  ]},
  { key: "activity", title: "Активность и образ жизни", fields: [
    { key: "steps", label: "Среднее количество шагов в день", type: "text" },
    { key: "frequency", label: "Сколько раз в неделю готов(а) тренироваться", type: "text" },
    { key: "time", label: "Предпочтительное время тренировок", type: "text" },
    { key: "place", label: "Где тренируешься (дом / зал / улица)", type: "text" },
    { key: "equipment", label: "Оборудование (если дом)", type: "text" },
  ]},
  { key: "nutrition_anketa", title: "Питание", fields: [
    { key: "kbju_experience", label: "Опыт подсчёта калорий / БЖУ", type: "text" },
    { key: "meals_count", label: "Количество приёмов пищи в день", type: "text" },
    { key: "restrictions", label: "Пищевые ограничения / аллергии", type: "text" },
    { key: "breakdowns", label: "Частые срывы и сложности", type: "textarea" },
    { key: "diary_readiness", label: "Готовность вести дневник питания", type: "text" },
  ]},
  { key: "sleep", title: "Сон и восстановление", fields: [
    { key: "sleep_hours", label: "Среднее количество сна (часы)", type: "text" },
    { key: "sleep_quality", label: "Качество сна (1–10)", type: "text" },
    { key: "stress_level", label: "Уровень стресса (1–10)", type: "text" },
  ]},
  { key: "discipline", title: "Дисциплина и ожидания", fields: [
    { key: "readiness", label: "Готовность соблюдать рекомендации (1–10)", type: "text" },
    { key: "obstacles", label: "Что может помешать процессу", type: "textarea" },
    { key: "expectations", label: "Ожидания от тренера", type: "textarea" },
    { key: "control_format", label: "Предпочтительный формат контроля", type: "text" },
  ]},
  { key: "extra", title: "Дополнительно", fields: [
    { key: "extra_info", label: "Дополнительная информация, которую важно знать", type: "textarea" },
  ]},
];

function anketaSectionFilled(section) {
  const data = ANKETA[section.key] || {};
  return section.fields.some(f => (data[f.key] || "").trim() !== "");
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

function renderAnketa() {
  const wrap = document.getElementById("anketa-sections");

  wrap.innerHTML = ANKETA_SECTIONS.map((section, i) => {
    const filled = anketaSectionFilled(section);
    const data = ANKETA[section.key] || {};
    return `
      <div class="anketa-section${section.warn ? " is-health" : ""}" data-section="${section.key}">
        <div class="anketa-section-head" data-toggle-section>
          <div class="anketa-section-num ${filled ? "done" : ""}">${filled ? "✓" : i + 1}</div>
          <div class="anketa-section-title">${section.title}</div>
          ${section.warn ? '<span class="anketa-section-warn">⚠️</span>' : ""}
          <span class="anketa-section-chevron">⌄</span>
        </div>
        <div class="anketa-section-body" hidden>
          ${section.fields.map(f => `
            <div class="anketa-field">
              <label>${f.label}</label>
              ${f.type === "textarea"
                ? `<textarea data-field="${f.key}">${data[f.key] || ""}</textarea>`
                : `<input type="text" data-field="${f.key}" value="${escapeAttr(data[f.key] || "")}" />`}
            </div>
          `).join("")}
          <button class="btn-primary anketa-save-btn" data-save-section="${section.key}">Сохранить раздел</button>
        </div>
      </div>
    `;
  }).join("");

  wrap.querySelectorAll("[data-toggle-section]").forEach(head => {
    head.addEventListener("click", () => {
      const sectionEl = head.closest(".anketa-section");
      const body = sectionEl.querySelector(".anketa-section-body");
      const isOpen = sectionEl.classList.contains("open");
      sectionEl.classList.toggle("open", !isOpen);
      body.hidden = isOpen;
    });
  });

  wrap.querySelectorAll("[data-save-section]").forEach(btn => {
    btn.addEventListener("click", () => {
      const sectionKey = btn.dataset.saveSection;
      const sectionEl = btn.closest(".anketa-section");
      const sectionDef = ANKETA_SECTIONS.find(s => s.key === sectionKey);
      const values = {};
      sectionEl.querySelectorAll("[data-field]").forEach(input => {
        values[input.dataset.field] = input.value;
      });
      ANKETA[sectionKey] = values;
      postJSON("/api/anketa", { anketa: { [sectionKey]: values } });

      const numEl = sectionEl.querySelector(".anketa-section-num");
      const filled = sectionDef.fields.some(f => (values[f.key] || "").trim() !== "");
      numEl.classList.toggle("done", filled);
      numEl.textContent = filled ? "✓" : String(ANKETA_SECTIONS.indexOf(sectionDef) + 1);

      renderAnketaProgress();
      btn.textContent = "Сохранено ✓";
      setTimeout(() => (btn.textContent = "Сохранить раздел"), 2000);
    });
  });
}

function renderAnketaProgress() {
  const filledCount = ANKETA_SECTIONS.filter(s => anketaSectionFilled(s)).length;
  const pct = Math.round((filledCount / ANKETA_SECTIONS.length) * 100);
  document.getElementById("anketa-progress-fill").style.width = `${pct}%`;
  document.getElementById("anketa-progress-label").textContent = `${filledCount} из ${ANKETA_SECTIONS.length} разделов заполнено`;
}

function openAnketaSection(key) {
  const sectionEl = document.querySelector(`.anketa-section[data-section="${key}"]`);
  if (!sectionEl) return;
  sectionEl.classList.add("open");
  sectionEl.querySelector(".anketa-section-body").hidden = false;
  sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
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

// ---------- Пошаговое выполнение тренировки (подходы, RPE, комментарий) ----------
function parseSetsTarget(setsStr) {
  const m = /(\d+)\s*[×xX]\s*(\d+)/.exec(setsStr || "");
  if (!m) return null;
  return { count: Number(m[1]), reps: Number(m[2]) };
}

let SESSION = null;

function buildSessionExercises(exercises) {
  return exercises.map(ex => {
    const target = ex.weighted ? parseSetsTarget(ex.sets) : null;
    return {
      name: ex.name,
      sets: ex.sets,
      weighted: ex.weighted,
      targetSets: target,
      setLogs: target ? Array.from({ length: target.count }, () => ({ weight: null, reps: null })) : null,
      rpe: null,
      comment: "",
    };
  });
}

function startWorkoutSession() {
  const exercises = PROGRAM[currentWorkoutDay].exercises;
  if (!exercises.length) return;
  SESSION = {
    exercises: buildSessionExercises(exercises),
    index: 0,
    startedAt: Date.now(),
  };
  showScreen("session");
  renderSessionExercise();
}

function renderSessionExercise() {
  const ex = SESSION.exercises[SESSION.index];
  const total = SESSION.exercises.length;

  document.getElementById("session-progress-label").textContent = `Упражнение ${SESSION.index + 1} из ${total}`;
  document.getElementById("session-progress-fill").style.width = `${(SESSION.index / total) * 100}%`;
  document.getElementById("session-exercise-icon").textContent = ex.weighted ? "💪" : "⏱";
  document.getElementById("session-exercise-name").textContent = ex.name;
  document.getElementById("session-exercise-target").textContent = ex.sets;

  const setsBlock = document.getElementById("session-sets-block");
  const setsWrap = document.getElementById("session-sets-list");

  if (ex.setLogs) {
    const prev = lastWeightFor(ex.name);
    setsBlock.hidden = false;
    setsWrap.innerHTML = ex.setLogs.map((s, i) => `
      <div class="session-set-row">
        <span class="session-set-num">${i + 1}</span>
        <input type="number" inputmode="decimal" step="0.5" class="weight-input session-set-weight" data-set="${i}"
               placeholder="${prev !== null ? prev : "вес"}" value="${s.weight ?? ""}" />
        <span class="weight-unit">кг</span>
        <input type="number" inputmode="numeric" class="weight-input session-set-reps" data-set="${i}"
               placeholder="${ex.targetSets.reps}" value="${s.reps ?? ""}" />
        <span class="weight-unit">повт.</span>
      </div>
    `).join("");
    setsWrap.querySelectorAll(".session-set-weight").forEach(inp => {
      inp.addEventListener("input", () => {
        ex.setLogs[Number(inp.dataset.set)].weight = inp.value ? Number(inp.value) : null;
      });
    });
    setsWrap.querySelectorAll(".session-set-reps").forEach(inp => {
      inp.addEventListener("input", () => {
        ex.setLogs[Number(inp.dataset.set)].reps = inp.value ? Number(inp.value) : null;
      });
    });
  } else {
    setsBlock.hidden = true;
    setsWrap.innerHTML = "";
  }

  const rpeScale = document.getElementById("session-rpe-scale");
  rpeScale.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    const cell = document.createElement("span");
    cell.dataset.value = i;
    if (ex.rpe && i <= ex.rpe) cell.classList.add("selected");
    rpeScale.appendChild(cell);
  }
  rpeScale.querySelectorAll("span").forEach(cell => {
    cell.addEventListener("click", () => {
      ex.rpe = Number(cell.dataset.value);
      rpeScale.querySelectorAll("span").forEach(c => c.classList.toggle("selected", Number(c.dataset.value) <= ex.rpe));
    });
  });

  document.getElementById("session-comment").value = ex.comment || "";
  document.getElementById("session-next-btn").textContent =
    SESSION.index === total - 1 ? "Завершить тренировку →" : "Готово →";
}

document.getElementById("session-comment").addEventListener("input", e => {
  if (SESSION) SESSION.exercises[SESSION.index].comment = e.target.value;
});

document.getElementById("start-workout-btn").addEventListener("click", startWorkoutSession);

document.getElementById("session-next-btn").addEventListener("click", () => {
  if (SESSION.index < SESSION.exercises.length - 1) {
    SESSION.index++;
    renderSessionExercise();
  } else {
    finishWorkoutSession();
  }
});

document.getElementById("session-close").addEventListener("click", () => {
  SESSION = null;
  showScreen("workouts");
});

function finishWorkoutSession() {
  const durationMin = Math.max(1, Math.round((Date.now() - SESSION.startedAt) / 60000));
  let totalSets = 0;

  const payloadExercises = SESSION.exercises.map(ex => {
    let weight = null;
    if (ex.setLogs) {
      const weights = ex.setLogs.map(s => s.weight).filter(w => w != null);
      totalSets += ex.setLogs.filter(s => s.weight != null || s.reps != null).length;
      weight = weights.length ? Math.max(...weights) : null;
    }

    const liveEx = PROGRAM[currentWorkoutDay].exercises.find(e => e.name === ex.name);
    if (liveEx) {
      liveEx.weight = weight;
      liveEx.done = true;
    }

    return {
      name: ex.name,
      weight,
      done: true,
      sets: ex.setLogs ? ex.setLogs.map(s => ({ weight: s.weight, reps: s.reps })) : null,
      rpe: ex.rpe,
      comment: ex.comment || null,
    };
  });

  postJSON("/api/workout-log", { exercises: payloadExercises });

  document.getElementById("complete-duration").textContent = durationMin;
  document.getElementById("complete-exercises").textContent = SESSION.exercises.length;
  document.getElementById("complete-sets").textContent = totalSets;

  showScreen("session-complete");
}

document.getElementById("complete-finish-btn").addEventListener("click", () => {
  SESSION = null;
  renderExercises(PROGRAM[currentWorkoutDay].exercises);
  showScreen("home");
});

function renderExercises(exercises) {
  const list = document.getElementById("exercise-list");

  if (!exercises.length) {
    list.innerHTML = `
      <div class="rest-day-card">
        <div class="rest-day-title">ВЫХОДНОЙ 😴</div>
        <div class="rest-day-sub">Может сделаешь кардио? 20 минут — это недолго, но сильно приблизит к твоей цели 🔥</div>
        <button class="btn-outline" id="add-cardio-btn">+ Добавить кардио</button>
        <div id="cardio-form" hidden>
          <div class="anketa-field"><label>Какое кардио?</label><input type="text" id="cardio-name" placeholder="Бег, велосипед, скакалка…" /></div>
          <div class="anketa-field" style="margin-top: 10px;"><label>Сколько времени?</label><input type="text" id="cardio-duration" placeholder="20 мин" /></div>
          <button class="btn-primary" id="save-cardio-btn" style="margin-top: 12px;">Сохранить</button>
        </div>
      </div>
    `;

    document.getElementById("add-cardio-btn").addEventListener("click", () => {
      document.getElementById("cardio-form").hidden = false;
    });
    document.getElementById("save-cardio-btn").addEventListener("click", () => {
      const name = document.getElementById("cardio-name").value.trim();
      const duration = document.getElementById("cardio-duration").value.trim();
      if (!name) return;
      postJSON("/api/workout-log", {
        exercises: [{ name, comment: duration, done: true }],
      });
      list.innerHTML = `<div class="hint-text" style="margin: 24px 0;">Кардио «${name}» записано 🔥</div>`;
    });
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
    const first = points[0].split(",");
    svg.innerHTML = `
      <defs>
        <linearGradient id="weight-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.35" />
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#weight-chart-fill)" points="${first[0]},120 ${points.join(" ")} ${last[0]},120" />
      <polyline fill="none" stroke="var(--accent)" stroke-width="3" points="${points.join(" ")}" />
      <circle cx="${last[0]}" cy="${last[1]}" r="5" fill="var(--accent)" />
    `;
  }

  document.getElementById("weight-start").textContent = weights.length ? `${weights[0]} кг` : "—";
  document.getElementById("weight-current").textContent = weights.length ? `${weights[weights.length - 1]} кг` : "—";

  const targetCard = document.getElementById("weight-target-card");
  const targetWeight = NUTRITION_TARGET.target_weight;
  if (targetWeight) {
    targetCard.hidden = false;
    document.getElementById("weight-target").textContent = `${targetWeight} кг`;
  } else {
    targetCard.hidden = true;
  }

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

// ---------- Фото-прогресс ----------
let PHOTOS = [];
const PHOTO_ANGLE_LABEL = { front: "Спереди", side: "Сбоку", back: "Сзади" };

function photoUrl(photo) {
  return `${API_BASE}/api/photo/${photo.id}?initData=${encodeURIComponent(getInitData())}`;
}

function groupPhotosByDate(photos) {
  const groups = {};
  photos.forEach(p => {
    const day = p.ts.slice(0, 10);
    (groups[day] = groups[day] || []).push(p);
  });
  return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
}

function renderPhotos() {
  const groups = groupPhotosByDate(PHOTOS);
  const historyWrap = document.getElementById("photo-history");
  const compareWrap = document.getElementById("photo-compare");

  historyWrap.innerHTML = groups.length
    ? groups.slice().reverse().map(([date, photos]) => `
        <div class="photo-history-group">
          <div class="photo-history-date">${new Date(date).toLocaleDateString("ru-RU")}</div>
          <div class="photo-history-thumbs">
            ${photos.map(p => `<img src="${photoUrl(p)}" class="photo-thumb" alt="${PHOTO_ANGLE_LABEL[p.angle] || p.angle}" />`).join("")}
          </div>
        </div>
      `).join("")
    : `<div class="hint-text">Фото пока нет.</div>`;

  if (groups.length >= 2) {
    const [firstDate, firstPhotos] = groups[0];
    const [lastDate, lastPhotos] = groups[groups.length - 1];
    compareWrap.innerHTML = `
      <div class="photo-compare-dates">
        <span>${new Date(firstDate).toLocaleDateString("ru-RU")}</span>
        <span>↔</span>
        <span>${new Date(lastDate).toLocaleDateString("ru-RU")}</span>
      </div>
      ${Object.keys(PHOTO_ANGLE_LABEL).map(angle => {
        const before = firstPhotos.find(p => p.angle === angle);
        const after = lastPhotos.find(p => p.angle === angle);
        if (!before || !after) return "";
        return `
          <div class="photo-compare-row">
            <div class="photo-compare-label">${PHOTO_ANGLE_LABEL[angle]}</div>
            <div class="photo-compare-pair">
              <img src="${photoUrl(before)}" class="photo-compare-img" />
              <img src="${photoUrl(after)}" class="photo-compare-img" />
            </div>
          </div>
        `;
      }).join("")}
    `;
  } else {
    compareWrap.innerHTML = `<div class="hint-text">Загрузи хотя бы 2 набора фото (в разные даты), чтобы увидеть сравнение.</div>`;
  }
}

document.querySelectorAll(".photo-upload-slot input[type=\"file\"]").forEach(input => {
  input.addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file) return;

    const status = document.getElementById("photo-upload-status");
    status.hidden = false;
    status.textContent = "Загружаю…";

    const formData = new FormData();
    formData.append("initData", getInitData());
    formData.append("angle", input.dataset.angle);
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/api/photo`, { method: "POST", body: formData });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      PHOTOS.push(data.photo);
      renderPhotos();
      status.textContent = "Сохранено ✓";
    } catch (err) {
      status.textContent = "Ошибка загрузки — попробуй другое фото";
    }

    e.target.value = "";
    setTimeout(() => (status.hidden = true), 2500);
  });
});

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
  el.addEventListener("click", () => {
    showScreen(el.dataset.nav);
    if (el.dataset.openSection) openAnketaSection(el.dataset.openSection);
    if (el.dataset.openTab) openProgressTab(el.dataset.openTab);
  });
});

function openProgressTab(view) {
  const seg = document.getElementById("progress-segmented");
  const target = seg.querySelector(`[data-view="${view}"]`);
  if (target) target.click();
}

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

// ---------- Питание: реальные записи (ручной ввод КБЖУ или скрин) ----------
let NUTRITION_LOGS = [];

function dateKey(ts) {
  return ts.slice(0, 10);
}

function nutritionLogsForDate(dateStr) {
  return NUTRITION_LOGS.filter(n => dateKey(n.ts) === dateStr);
}

function sumNutrition(logs) {
  return logs.reduce((acc, n) => {
    acc.kcal += n.kcal || 0;
    acc.protein += n.protein || 0;
    acc.fat += n.fat || 0;
    acc.carbs += n.carbs || 0;
    return acc;
  }, { kcal: 0, protein: 0, fat: 0, carbs: 0 });
}

function todayDateStr() {
  return new Date().toISOString().slice(0, 10);
}

function renderNutritionToday() {
  const todayStr = todayDateStr();
  const logsToday = nutritionLogsForDate(todayStr);
  const sums = sumNutrition(logsToday);

  document.getElementById("nutrition-today-kcal").textContent = Math.round(sums.kcal);
  document.getElementById("nutrition-today-protein").textContent = `${Math.round(sums.protein)} г`;
  document.getElementById("nutrition-today-fat").textContent = `${Math.round(sums.fat)} г`;
  document.getElementById("nutrition-today-carbs").textContent = `${Math.round(sums.carbs)} г`;

  const photosToday = PHOTOS.filter(p => p.angle === "meal" && dateKey(p.ts) === todayStr);
  const entries = [
    ...logsToday.map(n => ({ type: "manual", ts: n.ts, data: n })),
    ...photosToday.map(p => ({ type: "photo", ts: p.ts, data: p })),
  ].sort((a, b) => a.ts.localeCompare(b.ts));

  const listWrap = document.getElementById("nutrition-today-list");
  if (!entries.length) {
    listWrap.className = "hint-text";
    listWrap.textContent = "Пока пусто.";
    return;
  }
  listWrap.className = "";
  listWrap.innerHTML = entries.map(e => {
    const time = new Date(e.ts).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    if (e.type === "photo") {
      return `<div class="nutrition-entry-row"><span>${time} · скрин</span><img src="${photoUrl(e.data)}" /></div>`;
    }
    const n = e.data;
    return `<div class="nutrition-entry-row"><span>${time}</span><span>${n.kcal || 0} ккал · Б${n.protein || 0} Ж${n.fat || 0} У${n.carbs || 0}</span></div>`;
  }).join("");
}

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

function last7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function renderWeekNutrition() {
  const dayStats = last7Days().map(dateStr => {
    const logs = nutritionLogsForDate(dateStr);
    return logs.length ? { dateStr, sums: sumNutrition(logs) } : { dateStr, sums: null };
  });
  const daysWithData = dayStats.filter(d => d.sums);
  const maxKcal = Math.max(NUTRITION_TARGET.kcal * 1.3, ...daysWithData.map(d => d.sums.kcal), 1);

  document.getElementById("week-day-list").innerHTML = dayStats.map(d => {
    const label = new Date(d.dateStr).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
    if (!d.sums) {
      return `
        <div class="week-day-row">
          <div class="week-day-name">${label}</div>
          <div class="week-day-bar-wrap"></div>
          <div class="week-day-kcal missing">нет данных</div>
        </div>`;
    }
    const pct = Math.min(100, (d.sums.kcal / maxKcal) * 100);
    const over = d.sums.kcal > NUTRITION_TARGET.kcal * 1.1;
    return `
      <div class="week-day-row">
        <div class="week-day-name">${label}</div>
        <div class="week-day-bar-wrap"><div class="week-day-bar ${over ? "over" : "ok"}" style="width:${pct}%"></div></div>
        <div class="week-day-kcal">${Math.round(d.sums.kcal)} ккал</div>
      </div>`;
  }).join("");

  if (!daysWithData.length) {
    document.getElementById("week-summary").innerHTML = "";
    document.getElementById("week-verdict").textContent =
      "Пока нет ни одной записи за неделю — начни вносить питание, чтобы видеть анализ.";
    return;
  }

  const avgKcal = average(daysWithData.map(d => d.sums.kcal));
  const avgP = average(daysWithData.map(d => d.sums.protein));
  const avgF = average(daysWithData.map(d => d.sums.fat));
  const avgC = average(daysWithData.map(d => d.sums.carbs));
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
    const overDays = daysWithData
      .filter(d => d.sums.kcal > NUTRITION_TARGET.kcal * 1.1)
      .map(d => new Date(d.dateStr).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }));
    const overText = overDays.length ? ` в основном за счёт ${overDays.join(", ")}` : "";
    verdict = `⚠️ В среднем за неделю перебор на ${kcalDelta} ккал/день${overText}. Это может объяснять застой в прогрессе, даже если в остальные дни всё по плану.`;
  } else {
    verdict = `⚠️ В среднем за неделю недобор на ${Math.abs(kcalDelta)} ккал/день. При дефиците это не проблема, но при цели набора/поддержания — стоит обратить внимание.`;
  }
  document.getElementById("week-verdict").textContent = verdict;
}

// ---------- Карточка цели на главном экране ----------
function renderGoalCard() {
  const card = document.getElementById("goal-card");
  const goalsData = ANKETA.goals || {};
  const mainGoal = goalsData.main_goal;
  const targetWeight = NUTRITION_TARGET.target_weight;
  const weights = MEASUREMENTS.filter(m => m.weight != null).map(m => m.weight);

  if (!mainGoal && !targetWeight) {
    card.hidden = true;
    return;
  }
  card.hidden = false;
  document.getElementById("goal-card-title").textContent = mainGoal || "Цель не указана";

  if (targetWeight && weights.length) {
    const start = weights[0];
    const current = weights[weights.length - 1];
    const total = start - targetWeight;
    const done = start - current;
    const pct = total !== 0 ? Math.max(0, Math.min(100, Math.round((done / total) * 100))) : 0;
    document.getElementById("goal-progress-fill").style.width = `${pct}%`;
    document.getElementById("goal-card-numbers").textContent =
      `${current} → ${targetWeight} кг · ${pct}% пути (начало: ${start} кг)`;
  } else {
    document.getElementById("goal-progress-fill").style.width = "0%";
    document.getElementById("goal-card-numbers").textContent = targetWeight
      ? "Внеси первый замер, чтобы видеть прогресс"
      : "Тренер ещё не поставил цель по весу";
  }
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
  const form = document.getElementById("meal-form");
  form.hidden = !form.hidden;
});

document.getElementById("save-meal-btn").addEventListener("click", async () => {
  const fields = ["kcal", "protein", "fat", "carbs"];
  const payload = {};
  fields.forEach(f => {
    const val = document.getElementById(`meal-${f}`).value;
    payload[f] = val ? Number(val) : null;
  });
  if (Object.values(payload).every(v => v === null)) return;

  await postJSON("/api/nutrition-log", payload);
  NUTRITION_LOGS.push({ ts: new Date().toISOString(), ...payload });

  fields.forEach(f => (document.getElementById(`meal-${f}`).value = ""));
  document.getElementById("meal-form").hidden = true;
  renderNutritionToday();
  renderWeekNutrition();
});

document.getElementById("meal-photo-input").addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;

  const status = document.getElementById("nutrition-upload-status");
  status.hidden = false;
  status.textContent = "Загружаю…";

  const formData = new FormData();
  formData.append("initData", getInitData());
  formData.append("angle", "meal");
  formData.append("file", file);

  try {
    const res = await fetch(`${API_BASE}/api/photo`, { method: "POST", body: formData });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    PHOTOS.push(data.photo);
    renderNutritionToday();
    status.textContent = "Сохранено ✓";
  } catch (err) {
    status.textContent = "Ошибка загрузки — попробуй другое фото";
  }

  e.target.value = "";
  setTimeout(() => (status.hidden = true), 2500);
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
  renderAnketa();
  renderAnketaProgress();
  renderPhotos();
  renderNutritionToday();
  renderGoalCard();
  document.getElementById("settings-workout-reminders").checked = WORKOUT_REMINDERS_ENABLED;
  document.getElementById("settings-nutrition-reminders").checked = NUTRITION_REMINDERS_ENABLED;
  document.getElementById("settings-measurement-reminders").checked = MEASUREMENT_REMINDERS_ENABLED;

  const KNOWN_SCREENS = ["home", "workouts", "nutrition", "progress", "checkin", "profile", "anketa", "settings"];
  const requestedScreen = new URLSearchParams(window.location.search).get("screen");
  showScreen(KNOWN_SCREENS.includes(requestedScreen) ? requestedScreen : "home");
})();
