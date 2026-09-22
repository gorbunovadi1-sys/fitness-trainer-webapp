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
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initData) {
      return Telegram.WebApp.initData;
    }
  } catch (e) {}

  // Постоянная ссылка без Telegram: ?token=... в адресе. Не убираем его из URL — если
  // добавить страницу на экран домой, iOS запомнит именно текущий адрес, и без токена
  // в самой ссылке значок на главном экране открывал бы пустой экран (изолированное
  // хранилище standalone-режима не всегда видит localStorage обычного Safari).
  try {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      localStorage.setItem("access_token", urlToken);
      return urlToken;
    }
    return localStorage.getItem("access_token") || "";
  } catch (e) {
    return "";
  }
}

async function postJSON(path, body) {
  try {
    const res = await fetch(API_BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: getInitData(), ...body }),
    });
    if (!res.ok) {
      console.warn("API call failed:", path, res.status);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("API call failed:", path, e);
    return false;
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

// Один элемент "weeks" — протокол (обычно на 4-6 недель), не календарная неделя. Тренер сам
// переключает active_index, когда решает, что клиент готов к следующему протоколу — без автоматики по дате.
function currentWeekDays(rawProgram) {
  if (!rawProgram || !Array.isArray(rawProgram.weeks)) return rawProgram || {};
  const weeks = rawProgram.weeks;
  if (!weeks.length) return {};
  const idx = Math.min(Math.max(rawProgram.active_index || 0, 0), weeks.length - 1);
  return weeks[idx].days || {};
}

function normalizeProgram(rawProgram) {
  const days = currentWeekDays(rawProgram);
  const program = {};
  DAYS.forEach(day => {
    const info = days[day] || { title: "ОТДЫХ", duration: "", exercises: [] };
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

function openTrainerChat(prefillText) {
  const trainerUrl = "https://t.me/mikhailpobedinsky" + (prefillText ? `?text=${encodeURIComponent(prefillText)}` : "");
  try {
    if (window.Telegram && window.Telegram.WebApp && Telegram.WebApp.openTelegramLink) {
      Telegram.WebApp.openTelegramLink(trainerUrl);
      return;
    }
  } catch (e) {}
  window.open(trainerUrl, "_blank");
}
document.getElementById("contact-trainer-btn").addEventListener("click", () => openTrainerChat());
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
let TARIFFS = [];
let REQUESTED_TARIFF = null;
let TARIFF_CONTACTED = false;
let SUBSCRIPTION_UNTIL = null;
let WORKOUT_DATES = [];
let CHECKINS = [];
let CARDIO_LOG = {};
try { CARDIO_LOG = JSON.parse(localStorage.getItem("cardio_log") || "{}"); } catch (e) { CARDIO_LOG = {}; }
let PROGRAM_STARTED_AT = null;
let TRAINER_ACTION_PENDING = null;

function showAccessBlocked() {
  document.querySelector(".app").hidden = true;
  document.querySelector(".tabbar").hidden = true;
  document.getElementById("subscription-gate-screen").hidden = false;
}
document.getElementById("subscription-gate-contact-btn").addEventListener("click", () => openTrainerChat("Миш, у меня закрылся доступ — хочу продлить"));

async function loadRealData() {
  try {
    const res = await fetch(API_BASE + "/api/bootstrap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: getInitData() }),
    });
    if (res.status === 403) {
      let detail = null;
      try { detail = (await res.json()).detail; } catch (e) {}
      if (detail === "access_expired") {
        showAccessBlocked();
        return;
      }
    }
    if (!res.ok) return;
    const data = await res.json();
    if (data.name) {
      // Реальное имя из бэкенда — источник истины. Telegram.WebApp даёт имя мгновенно
      // (до этого fetch), но по ссылке без Telegram его вообще нет, поэтому обновляем
      // здесь всегда, когда бэкенд что-то прислал.
      CLIENT_NAME = data.name;
      document.getElementById("home-greeting").textContent = `ПРИВЕТ, ${CLIENT_NAME.toUpperCase()}!`;
      document.getElementById("profile-name").textContent = CLIENT_NAME;
      document.getElementById("profile-avatar").textContent = CLIENT_NAME.charAt(0).toUpperCase();
    }
    PROGRAM = normalizeProgram(data.program);
    NUTRITION_TARGET = data.nutrition_target;
    if (data.exercise_history && Object.keys(data.exercise_history).length) EXERCISE_HISTORY = data.exercise_history;
    MEASUREMENTS = data.measurements || [];
    ANKETA = data.anketa || {};
    PHOTOS = data.photos || [];
    NUTRITION_LOGS = data.nutrition_logs || [];
    WORKOUT_REMINDERS_ENABLED = data.workout_reminders_enabled !== false;
    NUTRITION_REMINDERS_ENABLED = data.nutrition_reminders_enabled !== false;
    MEASUREMENT_REMINDERS_ENABLED = data.measurement_reminders_enabled !== false;
    TARIFFS = data.tariffs || [];
    REQUESTED_TARIFF = data.requested_tariff || null;
    TARIFF_CONTACTED = !!data.tariff_contacted;
    SUBSCRIPTION_UNTIL = data.subscription_until || null;
    WORKOUT_DATES = data.workout_dates || [];
    CHECKINS = data.checkins || [];
    PROGRAM_STARTED_AT = data.program_started_at || null;
    TRAINER_ACTION_PENDING = data.trainer_action_pending || null;
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

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[ch]));
}

// "Сегодня" в календарной дате устройства клиента (не UTC) — new Date().toISOString()
// сдвигает дату назад на ночные 2-3 часа в МСК (UTC+3), из-за чего "сегодня" по факту
// показывало вчера, пока полночь ещё не наступила по UTC.
function localDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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
                ? `<textarea data-field="${f.key}">${escapeHtml(data[f.key] || "")}</textarea>`
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
    btn.addEventListener("click", async () => {
      const sectionKey = btn.dataset.saveSection;
      const sectionEl = btn.closest(".anketa-section");
      const sectionDef = ANKETA_SECTIONS.find(s => s.key === sectionKey);
      const values = {};
      sectionEl.querySelectorAll("[data-field]").forEach(input => {
        values[input.dataset.field] = input.value;
      });
      const ok = await postJSON("/api/anketa", { anketa: { [sectionKey]: values } });
      if (!ok) {
        btn.textContent = "Не сохранилось, попробуй ещё раз";
        return;
      }
      ANKETA[sectionKey] = values;

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
  renderAnketaNudge();
  renderTariffNudge();
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
  document.querySelectorAll("#complete-mood-row .mood-btn").forEach(b => b.classList.remove("selected"));
  document.querySelectorAll("#complete-rpe-scale span").forEach(s => s.classList.remove("selected"));
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

let finishingWorkoutSession = false;

async function finishWorkoutSession() {
  if (finishingWorkoutSession) return;
  const durationMin = Math.max(1, Math.round((Date.now() - SESSION.startedAt) / 60000));
  let totalSets = 0;

  const payloadExercises = SESSION.exercises.map(ex => {
    let weight = null;
    if (ex.setLogs) {
      const weights = ex.setLogs.map(s => s.weight).filter(w => w != null);
      totalSets += ex.setLogs.filter(s => s.weight != null || s.reps != null).length;
      weight = weights.length ? Math.max(...weights) : null;
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

  const selectedMoodBtn = document.querySelector("#complete-mood-row .mood-btn.selected");
  const mood = selectedMoodBtn ? selectedMoodBtn.dataset.mood : null;
  const overallRpe = document.querySelectorAll("#complete-rpe-scale span.selected").length || null;

  finishingWorkoutSession = true;
  const ok = await postJSON("/api/workout-log", { exercises: payloadExercises, mood, overall_rpe: overallRpe });
  finishingWorkoutSession = false;
  if (!ok) {
    alert("Не удалось сохранить тренировку — проверь связь и попробуй ещё раз.");
    return;
  }

  payloadExercises.forEach(pe => {
    const liveEx = PROGRAM[currentWorkoutDay].exercises.find(e => e.name === pe.name);
    if (liveEx) {
      liveEx.weight = pe.weight;
      liveEx.done = true;
    }
  });
  WORKOUT_DATES.push(new Date().toISOString());

  document.getElementById("complete-duration").textContent = durationMin;
  document.getElementById("complete-exercises").textContent = SESSION.exercises.length;
  document.getElementById("complete-sets").textContent = totalSets;

  showScreen("session-complete");
}

document.getElementById("complete-finish-btn").addEventListener("click", () => {
  SESSION = null;
  renderExercises(PROGRAM[currentWorkoutDay].exercises);
  renderTodayCard();
  renderAchievements();
  showScreen("home");
});

document.getElementById("complete-contact-trainer-btn").addEventListener("click", () => {
  openTrainerChat(`Миш, вопрос по сегодняшней тренировке «${PROGRAM[currentWorkoutDay].title}»...`);
});

document.getElementById("nutrition-contact-trainer-btn").addEventListener("click", () => {
  openTrainerChat("Миш, вопрос по рациону...");
});

function renderExercises(exercises) {
  const list = document.getElementById("exercise-list");
  document.getElementById("start-workout-btn").textContent = "Начать";

  if (!exercises.length) {
    const dateStr = dateForWorkoutDay(currentWorkoutDay);
    const cardioDone = WORKOUT_DATES.some(ts => dateKey(ts) === dateStr);
    const cachedCardio = CARDIO_LOG[dateStr];

    if (cardioDone) {
      list.innerHTML = `
        <div class="rest-day-card">
          <div class="rest-day-title">🔥 КАРДИО${cachedCardio ? `: ${cachedCardio.name.toUpperCase()}` : ""}</div>
          <div class="hint-text" style="margin: 12px 0 0;">${cachedCardio && cachedCardio.duration ? `${cachedCardio.duration} — ` : ""}уже записано. Отдыхай дальше 😴</div>
        </div>
      `;
      return;
    }

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
    document.getElementById("save-cardio-btn").addEventListener("click", async (e) => {
      const name = document.getElementById("cardio-name").value.trim();
      const duration = document.getElementById("cardio-duration").value.trim();
      if (!name) return;
      const btn = e.currentTarget;
      btn.disabled = true;
      const ok = await postJSON("/api/workout-log", {
        exercises: [{ name, comment: duration, done: true }],
      });
      btn.disabled = false;
      if (!ok) {
        alert("Не удалось сохранить — попробуй ещё раз.");
        return;
      }
      WORKOUT_DATES.push(new Date().toISOString());
      CARDIO_LOG[dateStr] = { name, duration };
      try { localStorage.setItem("cardio_log", JSON.stringify(CARDIO_LOG)); } catch (e) {}
      renderWeekProgram();
      renderTodayCard();
      renderAchievements();
      selectWorkoutDay(currentWorkoutDay);
    });
    return;
  }

  // Сама PROGRAM с бэкенда не хранит done/weight за сегодня (это план тренера, не лог) —
  // после перезагрузки страницы эти поля всегда пустые. Восстанавливаем их из уже
  // сохранённого лога тренировки, иначе список выглядит так, будто ничего не сделано,
  // хотя тренировка на сегодня уже записана (WORKOUT_DATES её содержит).
  const todayStr = dateForWorkoutDay(currentWorkoutDay);
  const doneToday = WORKOUT_DATES.some(ts => dateKey(ts) === todayStr);
  if (doneToday) {
    exercises.forEach(ex => {
      const hist = EXERCISE_HISTORY[ex.name];
      const lastEntry = hist && hist.length ? hist[hist.length - 1] : null;
      if (lastEntry && dateKey(lastEntry.date) === todayStr) {
        ex.weight = lastEntry.weight;
      }
      ex.done = true;
    });
  }

  const startBtn = document.getElementById("start-workout-btn");
  startBtn.textContent = doneToday ? "Пройти ещё раз" : "Начать";

  list.innerHTML = (doneToday ? `<div class="hint-text" style="margin:0 0 12px;">✅ Тренировка на сегодня уже выполнена.</div>` : "") + exercises.map((ex, i) => {
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

function dateForWorkoutDay(day) {
  return currentWeekDates()[DAYS.indexOf(day)];
}

function selectWorkoutDay(day) {
  currentWorkoutDay = day;
  const info = PROGRAM[day];
  const dateStr = dateForWorkoutDay(day);
  const cardio = !info.exercises.length && WORKOUT_DATES.some(ts => dateKey(ts) === dateStr) ? CARDIO_LOG[dateStr] : null;

  if (cardio) {
    document.getElementById("workout-day-title").textContent = "КАРДИО";
    document.getElementById("workout-day-meta").textContent = `🔥 ${cardio.name}${cardio.duration ? ` · ⏱ ${cardio.duration}` : ""}`;
  } else if (!info.exercises.length && WORKOUT_DATES.some(ts => dateKey(ts) === dateStr)) {
    document.getElementById("workout-day-title").textContent = "КАРДИО";
    document.getElementById("workout-day-meta").textContent = "🔥 Уже выполнено";
  } else {
    document.getElementById("workout-day-title").textContent = info.title;
    document.getElementById("workout-day-meta").textContent = info.exercises.length
      ? `⏱ ${info.duration} · 🔥 ${info.exercises.length} упражнений`
      : "😴 День отдыха";
  }

  renderWorkoutDayPills();
  renderExercises(info.exercises);
}

function currentWeekDates() {
  const today = new Date();
  const dow = (today.getDay() + 6) % 7; // 0 = понедельник
  const monday = new Date(today);
  monday.setDate(today.getDate() - dow);
  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return localDateKey(d);
  });
}

function renderWeekProgram() {
  const weekDates = currentWeekDates();
  const loggedDates = new Set(WORKOUT_DATES.map(dateKey));
  const wrap = document.getElementById("week-program-list");

  let doneCount = 0;
  let totalScheduled = 0;

  wrap.innerHTML = DAYS.map((d, i) => {
    const info = PROGRAM[d];
    const isRest = info.exercises.length === 0;
    const isDone = !isRest && loggedDates.has(weekDates[i]);
    const cardioLogged = isRest && loggedDates.has(weekDates[i]);
    if (!isRest) {
      totalScheduled++;
      if (isDone) doneCount++;
    }
    return `
      <div class="week-program-day">
        <div class="week-program-day-head">
          <span class="week-program-day-name${d === currentWorkoutDay ? " is-today" : ""}">${d}</span>
          <span class="week-program-day-title">${info.title}</span>
          ${!isRest ? `<span class="week-program-day-check${isDone ? " done" : ""}">${isDone ? "✓" : "○"}</span>` : ""}
          ${cardioLogged ? `<span class="week-program-day-check done">🔥</span>` : ""}
        </div>
        ${isRest ? "" : `<div class="week-program-exercises">${info.exercises.map(e => `
          <div class="week-program-ex-row"><span>${e.name}</span><span>${e.sets}</span></div>
        `).join("")}</div>`}
      </div>`;
  }).join("");

  document.getElementById("week-completion-label").textContent = `${doneCount} из ${totalScheduled} выполнено`;
  document.getElementById("week-completion-fill").style.width = totalScheduled ? `${Math.round((doneCount / totalScheduled) * 100)}%` : "0%";
}

// ---------- «Сегодня» на главном ----------
function renderTodayCard() {
  const todayStr = todayDateStr();
  const nutritionSum = sumNutrition(nutritionLogsForDate(todayStr));
  const nutritionDone = nutritionSum.kcal > 0;
  document.getElementById("today-mark-nutrition").textContent = nutritionDone ? "✓" : "○";
  document.getElementById("today-mark-nutrition").classList.toggle("done", nutritionDone);
  document.getElementById("today-nutrition-text").textContent = `${Math.round(nutritionSum.kcal)} / ${NUTRITION_TARGET.kcal} ккал`;
  document.getElementById("nutrition-card-sub").textContent = nutritionDone
    ? `Внесено: ${Math.round(nutritionSum.kcal)} ккал`
    : "Заполни за сегодня";

  const todayInfo = PROGRAM[currentWorkoutDay] || { title: "—", exercises: [] };
  const isRestDay = !todayInfo.exercises.length;
  const workoutDoneToday = WORKOUT_DATES.some(ts => dateKey(ts) === todayStr);
  const workoutMark = document.getElementById("today-mark-workout");
  workoutMark.textContent = (isRestDay || workoutDoneToday) ? "✓" : "○";
  workoutMark.classList.toggle("done", isRestDay || workoutDoneToday);
  document.getElementById("today-workout-text").textContent = isRestDay ? "день отдыха" : todayInfo.title;

  const lastCheckin = CHECKINS.length ? CHECKINS[CHECKINS.length - 1] : null;
  const daysSinceCheckin = lastCheckin ? Math.floor((Date.now() - new Date(lastCheckin.ts).getTime()) / 86400000) : null;
  const checkinDue = daysSinceCheckin === null || daysSinceCheckin >= 7;
  document.getElementById("today-row-checkin").hidden = !checkinDue;
  document.getElementById("checkin-banner").hidden = !checkinDue;

  const cta = document.getElementById("today-cta-btn");
  if (!isRestDay && !workoutDoneToday) {
    cta.textContent = "Начать тренировку →";
    cta.dataset.nav = "workouts";
    cta.hidden = false;
  } else if (!nutritionDone) {
    cta.textContent = "Внести питание →";
    cta.dataset.nav = "nutrition";
    cta.hidden = false;
  } else if (checkinDue) {
    cta.textContent = "Пройти чек-ин →";
    cta.dataset.nav = "checkin";
    cta.hidden = false;
  } else {
    cta.hidden = true;
  }
}

// ---------- Достижения ----------
function computeStreakDays() {
  const activeDates = new Set([...WORKOUT_DATES.map(dateKey), ...NUTRITION_LOGS.map(n => dateKey(n.ts))]);
  let streak = 0;
  const cursor = new Date();
  if (!activeDates.has(localDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (activeDates.has(localDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function computeWeeksWithoutMissedCheckin() {
  if (!CHECKINS.length) return 0;
  const sorted = CHECKINS.map(c => new Date(c.ts).getTime()).sort((a, b) => b - a);
  let weeks = 0;
  let windowEnd = Date.now();
  while (weeks <= 52) {
    const windowStart = windowEnd - 7 * 86400000;
    if (!sorted.some(t => t >= windowStart && t <= windowEnd)) break;
    weeks++;
    windowEnd = windowStart;
  }
  return weeks;
}

function renderAchievements() {
  const wrap = document.getElementById("achievements-grid");
  if (!wrap) return;

  const weights = MEASUREMENTS.filter(m => m.weight != null).map(m => m.weight);
  const weightDelta = weights.length > 1 ? Math.round((weights[weights.length - 1] - weights[0]) * 10) / 10 : null;

  const cards = [
    { value: `🔥 ${computeStreakDays()}`, label: "дней подряд" },
    { value: `🏆 ${WORKOUT_DATES.length}`, label: "тренировок выполнено" },
  ];
  if (weightDelta != null) cards.push({ value: `${weightDelta > 0 ? "+" : ""}${weightDelta} кг`, label: "с начала программы" });
  cards.push({ value: `${computeWeeksWithoutMissedCheckin()}`, label: "нед. без пропущенного чек-ина" });

  wrap.innerHTML = cards.map(c => `<div class="achievement-card"><div class="achievement-value">${c.value}</div><div class="achievement-label">${c.label}</div></div>`).join("");
}

// ---------- Усиленный экран результата ----------
function computeResultData() {
  const weights = MEASUREMENTS.filter(m => m.weight != null);
  if (weights.length < 2) return null;

  const start = weights[0].weight;
  const current = weights[weights.length - 1].weight;
  const delta = Math.round((current - start) * 10) / 10;
  // "За сколько недель" — по датам самих замеров (их можно вносить задним числом), а не по
  // дате старта программы: иначе бэкдейтнутые замеры показывали бы период в 1 неделю всегда.
  const spanMs = new Date(weights[weights.length - 1].ts).getTime() - new Date(weights[0].ts).getTime();
  const weeksElapsed = Math.max(1, Math.round(spanMs / (7 * 86400000)));

  // "% соблюдения плана" — отдельная величина, ей нужна именно длительность самой программы
  // (сколько тренировок реально ожидалось), а не период между замерами веса.
  let compliance = null;
  if (PROGRAM_STARTED_AT) {
    const programWeeks = Math.max(1, Math.floor((Date.now() - new Date(PROGRAM_STARTED_AT).getTime()) / (7 * 86400000)));
    const expectedPerWeek = DAYS.filter(d => PROGRAM[d] && PROGRAM[d].exercises.length).length;
    if (expectedPerWeek) {
      compliance = Math.min(100, Math.round((WORKOUT_DATES.length / (expectedPerWeek * programWeeks)) * 100));
    }
  }

  const measureDeltas = {};
  ["waist", "hips", "chest"].forEach(key => {
    const first = MEASUREMENTS.find(m => m[key] != null);
    const last = [...MEASUREMENTS].reverse().find(m => m[key] != null);
    if (first && last && first !== last) measureDeltas[key] = Math.round((last[key] - first[key]) * 10) / 10;
  });

  return { start, current, delta, weeksElapsed, workouts: WORKOUT_DATES.length, compliance, measureDeltas };
}

function renderResultHero() {
  const hero = document.getElementById("result-hero");
  const data = computeResultData();
  if (!data) {
    hero.hidden = true;
    return;
  }

  hero.hidden = false;
  document.getElementById("result-hero-delta").textContent = `${data.delta > 0 ? "+" : ""}${data.delta} кг`;
  document.getElementById("result-hero-period").textContent = `за ${data.weeksElapsed} нед.`;
  document.getElementById("result-hero-range").textContent = `${data.start} → ${data.current} кг`;

  const stats = [{ value: data.workouts, label: "тренировок" }];
  if (data.compliance != null) stats.push({ value: `${data.compliance}%`, label: "соблюдения плана" });
  document.getElementById("result-hero-stats").innerHTML = stats.map(s => `<div><b>${s.value}</b><span>${s.label}</span></div>`).join("");
}

// ---------- Карточка результата для Stories ----------
const MEASURE_SHARE_LABELS = { waist: "см в талии", hips: "см в бёдрах", chest: "см в груди" };

async function drawShareCard() {
  const data = computeResultData();
  if (!data) return;

  try { await document.fonts.ready; } catch (e) {}

  const canvas = document.getElementById("share-canvas");
  const W = 1080, H = 1350;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#c6ff3d";
  ctx.fillRect(0, 0, W, 10);

  ctx.textAlign = "center";
  ctx.fillStyle = "#9a9a9a";
  ctx.font = "700 40px Inter, sans-serif";
  ctx.fillText(`${data.weeksElapsed} НЕДЕЛЬ`, W / 2, 260);

  ctx.fillStyle = "#c6ff3d";
  ctx.font = "800 150px Inter, sans-serif";
  ctx.fillText(`${data.delta > 0 ? "+" : ""}${data.delta} кг`, W / 2, 440);

  ctx.fillStyle = "#f5f5f5";
  ctx.font = "600 42px Inter, sans-serif";
  ctx.fillText(`${data.start} → ${data.current} кг`, W / 2, 520);

  const lines = [];
  Object.entries(data.measureDeltas).forEach(([key, val]) => {
    lines.push(`${val > 0 ? "+" : ""}${val} ${MEASURE_SHARE_LABELS[key]}`);
  });
  lines.push(`${data.workouts} тренировок`);
  if (data.compliance != null) lines.push(`${data.compliance}% соблюдения программы`);

  ctx.font = "600 44px Inter, sans-serif";
  let y = 650;
  lines.forEach(line => {
    ctx.fillText(line, W / 2, y);
    y += 76;
  });

  ctx.fillStyle = "#c6ff3d";
  ctx.font = "800 38px Inter, sans-serif";
  ctx.fillText("POBEDINSKY FIT", W / 2, H - 80);
}

document.getElementById("share-result-btn").addEventListener("click", async () => {
  document.getElementById("share-card-modal").hidden = false;
  await drawShareCard();
});
document.getElementById("share-close-btn").addEventListener("click", () => {
  document.getElementById("share-card-modal").hidden = true;
});
document.getElementById("share-download-btn").addEventListener("click", () => {
  const canvas = document.getElementById("share-canvas");
  const link = document.createElement("a");
  link.download = "moy-progress.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// ---------- «Что изменил тренер» ----------
function maybeShowTrainerActionModal() {
  if (!TRAINER_ACTION_PENDING) return;
  document.getElementById("trainer-action-text").textContent = TRAINER_ACTION_PENDING.summary;
  document.getElementById("trainer-action-modal").hidden = false;
}

document.getElementById("trainer-action-ok-btn").addEventListener("click", async () => {
  document.getElementById("trainer-action-modal").hidden = true;
  await postJSON("/api/actions-seen", {});
  TRAINER_ACTION_PENDING = null;
});

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

const MEASUREMENT_FIELDS = [
  ["weight", "Вес", "кг"], ["waist", "Талия", "см"], ["hips", "Бёдра", "см"],
  ["chest", "Грудь", "см"], ["arms", "Руки", "см"], ["thighs", "Бедро", "см"],
];
let editingMeasurementId = null;

function renderMeasurementsHistory() {
  const wrap = document.getElementById("measurements-history");
  if (!MEASUREMENTS.length) {
    wrap.textContent = "Записей пока нет.";
    return;
  }
  wrap.innerHTML = MEASUREMENTS.slice().reverse().map(m => {
    const date = new Date(m.ts).toLocaleDateString("ru-RU");
    const values = MEASUREMENT_FIELDS
      .filter(([key]) => m[key] != null)
      .map(([key, label, unit]) => `${label}: <b>${m[key]} ${unit}</b>`)
      .join(" · ");
    return `<div class="measurement-row">
      <span>${date}</span><span>${values}</span>
      <span class="measurement-row-actions">
        <button class="icon-btn" data-edit-measurement="${m.id}" title="Изменить">✎</button>
        <button class="icon-btn" data-delete-measurement="${m.id}" title="Удалить">✕</button>
      </span>
    </div>`;
  }).join("");

  wrap.querySelectorAll("[data-edit-measurement]").forEach(btn => {
    btn.addEventListener("click", () => {
      const m = MEASUREMENTS.find(x => x.id === Number(btn.dataset.editMeasurement));
      if (!m) return;
      editingMeasurementId = m.id;
      document.getElementById("m-date").value = dateKey(m.ts);
      MEASUREMENT_FIELDS.forEach(([key]) => (document.getElementById(`m-${key}`).value = m[key] ?? ""));
      document.getElementById("submit-measurement").textContent = "Сохранить изменения";
      document.getElementById("cancel-edit-measurement").hidden = false;
      document.getElementById("progress-measurements").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  wrap.querySelectorAll("[data-delete-measurement]").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (!confirm("Удалить эту запись замера?")) return;
      const id = Number(btn.dataset.deleteMeasurement);
      let res;
      try {
        res = await fetch(`${API_BASE}/api/measurement/${id}?initData=${encodeURIComponent(getInitData())}`, { method: "DELETE" });
      } catch (e) {
        alert("Не удалось удалить — проверь интернет-соединение и попробуй ещё раз.");
        return;
      }
      if (!res.ok) {
        alert("Не удалось удалить запись — попробуй ещё раз.");
        return;
      }
      MEASUREMENTS = MEASUREMENTS.filter(m => m.id !== id);
      renderMeasurementsHistory();
      renderWeightTab();
      renderResultHero();
      renderAchievements();
      renderGoalCard();
    });
  });
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
  const groups = groupPhotosByDate(PHOTOS.filter(p => p.angle === "front" || p.angle === "side" || p.angle === "back"));
  const historyWrap = document.getElementById("photo-history");
  const compareWrap = document.getElementById("photo-compare");

  historyWrap.innerHTML = groups.length
    ? groups.slice().reverse().map(([date, photos]) => `
        <div class="photo-history-group">
          <div class="photo-history-date">${new Date(date).toLocaleDateString("ru-RU")}</div>
          <div class="photo-history-thumbs">
            ${photos.map(p => `
              <div class="photo-thumb-wrap">
                <img src="${photoUrl(p)}" class="photo-thumb" alt="${PHOTO_ANGLE_LABEL[p.angle] || p.angle}" />
                <button class="photo-thumb-delete" data-delete-photo="${p.id}" title="Удалить">✕</button>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")
    : `<div class="hint-text">Фото пока нет.</div>`;

  historyWrap.querySelectorAll("[data-delete-photo]").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (!confirm("Удалить это фото?")) return;
      const id = Number(btn.dataset.deletePhoto);
      let res;
      try {
        res = await fetch(`${API_BASE}/api/photo/${id}?initData=${encodeURIComponent(getInitData())}`, { method: "DELETE" });
      } catch (e) {
        alert("Не удалось удалить — проверь интернет-соединение и попробуй ещё раз.");
        return;
      }
      if (!res.ok) {
        alert("Не удалось удалить фото — попробуй ещё раз.");
        return;
      }
      PHOTOS = PHOTOS.filter(p => p.id !== id);
      renderPhotos();
    });
  });

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

    const dateVal = document.getElementById("photo-date").value || todayInputValue();
    const formData = new FormData();
    formData.append("initData", getInitData());
    formData.append("angle", input.dataset.angle);
    formData.append("file", file);
    formData.append("ts", dateInputToIso(dateVal));

    try {
      const res = await fetch(`${API_BASE}/api/photo`, { method: "POST", body: formData });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      insertSortedByTs(PHOTOS, data.photo);
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

// ---------- Задним числом: даты по умолчанию — сегодня, не позже сегодня ----------
function todayInputValue() {
  return localDateKey(new Date());
}
function dateInputToIso(dateStr) {
  return `${dateStr}T12:00:00.000Z`;
}
function insertSortedByTs(array, entry) {
  let i = array.length;
  while (i > 0 && array[i - 1].ts > entry.ts) i--;
  array.splice(i, 0, entry);
}
["m-date", "photo-date"].forEach(id => {
  const el = document.getElementById(id);
  el.max = todayInputValue();
  el.value = todayInputValue();
});

function resetMeasurementForm() {
  editingMeasurementId = null;
  document.getElementById("submit-measurement").textContent = "Сохранить замер";
  document.getElementById("cancel-edit-measurement").hidden = true;
  ["weight", "waist", "hips", "chest", "arms", "thighs"].forEach(f => (document.getElementById(`m-${f}`).value = ""));
  document.getElementById("m-date").value = todayInputValue();
}

document.getElementById("cancel-edit-measurement").addEventListener("click", resetMeasurementForm);

let measurementSubmitting = false;

document.getElementById("submit-measurement").addEventListener("click", async (e) => {
  if (measurementSubmitting) return;
  const fields = ["weight", "waist", "hips", "chest", "arms", "thighs"];
  const payload = {};
  fields.forEach(f => {
    const val = document.getElementById(`m-${f}`).value;
    payload[f] = val ? Number(val) : null;
  });

  if (Object.values(payload).every(v => v === null)) return;

  const submitBtn = e.currentTarget;
  measurementSubmitting = true;
  submitBtn.disabled = true;

  try {
    const dateVal = document.getElementById("m-date").value || todayInputValue();
    const ts = dateInputToIso(dateVal);
    payload.ts = ts;

    if (editingMeasurementId) {
      const id = editingMeasurementId;
      let res;
      try {
        res = await fetch(`${API_BASE}/api/measurement/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData: getInitData(), ...payload }),
        });
      } catch (e) {
        alert("Не удалось сохранить изменения — проверь интернет-соединение и попробуй ещё раз.");
        return;
      }
      if (!res.ok) {
        alert("Не удалось сохранить изменения — попробуй ещё раз.");
        return;
      }
      delete payload.ts;
      MEASUREMENTS = MEASUREMENTS.filter(m => m.id !== id);
      insertSortedByTs(MEASUREMENTS, { id, ts, ...payload });
    } else {
      let res;
      try {
        res = await fetch(`${API_BASE}/api/measurement`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData: getInitData(), ...payload }),
        });
      } catch (e) {
        alert("Не удалось сохранить замер — проверь интернет-соединение и попробуй ещё раз.");
        return;
      }
      if (!res.ok) {
        alert("Не удалось сохранить замер — попробуй ещё раз.");
        return;
      }
      let newId = null;
      try { newId = (await res.json()).id; } catch (e) {}
      delete payload.ts;
      insertSortedByTs(MEASUREMENTS, { id: newId, ts, ...payload });
    }

    resetMeasurementForm();
    renderWeightTab();
    renderMeasurementsHistory();
    renderResultHero();
    renderAchievements();
    renderGoalCard();

    const badge = document.getElementById("measurement-saved");
    badge.hidden = false;
    setTimeout(() => (badge.hidden = true), 2000);
  } finally {
    measurementSubmitting = false;
    submitBtn.disabled = false;
  }
});

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
  // Локальный календарный день таймстампа с бэкенда (UTC), а не UTC-дата — иначе
  // запись, сделанная поздно вечером по МСК, могла "уехать" на день вперёд.
  return localDateKey(new Date(ts));
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
  return localDateKey(new Date());
}

function renderNutritionToday() {
  const todayStr = todayDateStr();
  const logsToday = nutritionLogsForDate(todayStr);
  const sums = sumNutrition(logsToday);

  document.getElementById("nutrition-today-kcal").textContent = Math.round(sums.kcal);
  document.getElementById("nutrition-today-protein").textContent = `${Math.round(sums.protein)} г`;
  document.getElementById("nutrition-today-fat").textContent = `${Math.round(sums.fat)} г`;
  document.getElementById("nutrition-today-carbs").textContent = `${Math.round(sums.carbs)} г`;
  const pct = NUTRITION_TARGET.kcal ? Math.min(100, Math.round((sums.kcal / NUTRITION_TARGET.kcal) * 100)) : 0;
  document.querySelector(".calorie-ring").style.setProperty("--pct", pct);
  renderTodayCard();

  const listWrap = document.getElementById("nutrition-today-list");
  if (!logsToday.length) {
    listWrap.className = "hint-text";
    listWrap.textContent = "Пока пусто.";
    return;
  }
  listWrap.className = "";
  listWrap.innerHTML = logsToday.slice().sort((a, b) => a.ts.localeCompare(b.ts)).map(n => {
    const time = new Date(n.ts).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    const link = n.source === "fatsecret" && n.url ? ` · <a href="${n.url}" target="_blank" rel="noopener">FatSecret</a>` : "";
    return `<div class="nutrition-entry-row"><span>${time}</span><span>${n.kcal || 0} ккал · Б${n.protein || 0} Ж${n.fat || 0} У${n.carbs || 0}${link}</span></div>`;
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
    days.push(localDateKey(d));
  }
  return days;
}

function renderWeekNutrition() {
  const dayStats = last7Days().map(dateStr => {
    const logs = nutritionLogsForDate(dateStr);
    return logs.length ? { dateStr, sums: sumNutrition(logs), logs } : { dateStr, sums: null, logs: [] };
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
    const fatsecretLog = d.logs.find(n => n.source === "fatsecret" && n.url);
    const link = fatsecretLog ? ` · <a href="${fatsecretLog.url}" target="_blank" rel="noopener">FatSecret</a>` : "";
    return `
      <div class="week-day-card">
        <div class="week-day-row">
          <div class="week-day-name">${label}</div>
          <div class="week-day-bar-wrap"><div class="week-day-bar ${over ? "over" : "ok"}" style="width:${pct}%"></div></div>
          <div class="week-day-kcal">${Math.round(d.sums.kcal)} ккал</div>
        </div>
        <div class="week-day-detail">
          <span>Б${Math.round(d.sums.protein)} Ж${Math.round(d.sums.fat)} У${Math.round(d.sums.carbs)}</span>
          <span>${link}</span>
        </div>
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

// ---------- Тариф ----------
function anketaFullyFilled() {
  return ANKETA_SECTIONS.every(s => anketaSectionFilled(s));
}

function renderAnketaNudge() {
  const card = document.getElementById("anketa-nudge-card");
  const filled = anketaFullyFilled();
  card.hidden = filled;
  if (filled) return;
  document.getElementById("anketa-nudge-label").textContent = "📝 АНКЕТА";
  document.getElementById("anketa-nudge-title").textContent = "Заполни анкету";
  document.getElementById("anketa-nudge-sub").textContent = "Тренер подберёт программу и КБЖУ под тебя — это займёт пару минут";
}

function hasActiveSubscription() {
  return !!(SUBSCRIPTION_UNTIL && new Date(SUBSCRIPTION_UNTIL) >= new Date(new Date().toDateString()));
}

function renderTariffNudge() {
  const card = document.getElementById("tariff-nudge-card");
  if (!TARIFFS.length || !anketaFullyFilled() || hasActiveSubscription()) {
    card.hidden = true;
    return;
  }
  card.hidden = false;
  if (REQUESTED_TARIFF) {
    document.getElementById("tariff-nudge-title").textContent = `Заявка: ${REQUESTED_TARIFF.name}`;
    document.getElementById("tariff-nudge-sub").textContent = "Тренер свяжется с тобой, чтобы принять оплату";
  } else {
    document.getElementById("tariff-nudge-title").textContent = "Выбери тариф";
    document.getElementById("tariff-nudge-sub").textContent = "Тренер подготовил варианты — выбери свой";
  }
}

// Тарифы могут называться одинаково (напр. несколько «1 месяц» с разной ценой) —
// сравниваем по id, если он есть у обоих; иначе — по паре имя+цена, как раньше.
function tariffMatches(a, b) {
  if (!a || !b) return false;
  if (a.id && b.id) return a.id === b.id;
  return a.name === b.name && (a.price || "") === (b.price || "");
}

function renderTariffScreen() {
  const wrap = document.getElementById("tariff-content");

  if (!TARIFFS.length) {
    wrap.innerHTML = `<div class="hint-text">Тренер ещё не добавил тарифы — загляни сюда чуть позже.</div>`;
    return;
  }

  const statusHtml = hasActiveSubscription()
    ? `<div class="hint-text" style="margin-bottom:16px;">Подписка активна до ${new Date(SUBSCRIPTION_UNTIL).toLocaleDateString("ru-RU")}.</div>`
    : REQUESTED_TARIFF
    ? `<div class="hint-text" style="margin-bottom:16px;">Заявка на «${REQUESTED_TARIFF.name}» отправлена — тренер свяжется с тобой в переписке, чтобы принять оплату.</div>
       <button class="btn-primary" id="tariff-contact-btn" style="margin-bottom:20px;">💬 Написать тренеру</button>`
    : `<div class="hint-text" style="margin-bottom:16px;">Выбери тариф — тренер увидит заявку и напишет тебе, чтобы принять оплату.</div>`;

  const cardsHtml = TARIFFS.map((t, i) => {
    const picked = tariffMatches(REQUESTED_TARIFF, t);
    return `
    <div class="list-card tariff-card">
      <div class="list-card-body">
        <div class="list-card-title">${t.name}${t.price ? ` — ${t.price}` : ""}</div>
        ${t.description ? `<div class="list-card-sub">${t.description}</div>` : ""}
      </div>
      <button class="btn-outline-sm" data-pick-tariff="${i}" ${picked ? "disabled" : ""}>
        ${picked ? "Выбрано ✓" : "Выбрать"}
      </button>
    </div>`;
  }).join("");

  wrap.innerHTML = statusHtml + cardsHtml;

  const contactBtn = document.getElementById("tariff-contact-btn");
  if (contactBtn) contactBtn.addEventListener("click", () => openTrainerChat(tariffContactMessage()));

  wrap.querySelectorAll("[data-pick-tariff]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const t = TARIFFS[Number(btn.dataset.pickTariff)];
      btn.disabled = true;
      btn.textContent = "Отправляю…";
      const ok = await postJSON("/api/tariff-request", { id: t.id || "", name: t.name, price: t.price || "" });
      if (!ok) {
        btn.disabled = false;
        btn.textContent = "Выбрать";
        alert("Не удалось отправить заявку — попробуй ещё раз.");
        return;
      }
      REQUESTED_TARIFF = { id: t.id || "", name: t.name, price: t.price || "" };
      TARIFF_CONTACTED = false;
      renderTariffScreen();
      renderTariffNudge();
      showTariffContactModal();
    });
  });
}

function tariffContactMessage() {
  const name = REQUESTED_TARIFF ? REQUESTED_TARIFF.name : "";
  return `Привет! Выбрал(а) тариф «${name}» — хочу обсудить оплату.`;
}

function showTariffContactModal() {
  if (TARIFF_CONTACTED) return;
  document.getElementById("tariff-contact-modal").hidden = false;
}

document.getElementById("tariff-modal-contact-btn").addEventListener("click", () => {
  document.getElementById("tariff-contact-modal").hidden = true;
  openTrainerChat(tariffContactMessage());
});
document.getElementById("tariff-modal-close-btn").addEventListener("click", () => {
  document.getElementById("tariff-contact-modal").hidden = true;
});

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

document.querySelectorAll("#complete-mood-row .mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#complete-mood-row .mood-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

let checkinSubmitting = false;

document.getElementById("submit-checkin").addEventListener("click", async () => {
  if (checkinSubmitting) return;
  const submitBtn = document.getElementById("submit-checkin");
  const values = { sleep: 0, stress: 0, mood: 0, compliance: 0 };
  document.querySelectorAll(".checkin-field").forEach(field => {
    const label = field.querySelector(".checkin-label").textContent;
    const selected = field.querySelectorAll(".scale-10 span.selected").length;
    if (label.includes("Сон")) values.sleep = selected;
    else if (label.includes("Стресс")) values.stress = selected;
    else if (label.includes("Самочувствие")) values.mood = selected;
    else if (label.includes("плана")) values.compliance = selected;
  });

  checkinSubmitting = true;
  submitBtn.disabled = true;
  const ok = await postJSON("/api/checkin", values);
  submitBtn.disabled = false;
  checkinSubmitting = false;
  if (!ok) {
    alert("Не удалось сохранить чек-ин — попробуй ещё раз.");
    return;
  }
  CHECKINS.push({ ts: new Date().toISOString(), ...values });
  renderTodayCard();
  renderAchievements();

  try {
    if (window.Telegram && window.Telegram.WebApp) {
      Telegram.WebApp.HapticFeedback?.notificationOccurred("success");
    }
  } catch (e) {}

  showScreen("home");
});

let fatsecretImporting = false;

document.getElementById("save-fatsecret-btn").addEventListener("click", async () => {
  if (fatsecretImporting) return;
  const btn = document.getElementById("save-fatsecret-btn");
  const input = document.getElementById("fatsecret-link-input");
  const url = input.value.trim();
  const status = document.getElementById("nutrition-upload-status");
  status.hidden = false;

  if (!/^https:\/\/([a-z0-9-]+\.)*fatsecret\.com\//i.test(url)) {
    status.textContent = "Похоже, это не ссылка на fatsecret.com — проверь и вставь заново";
    setTimeout(() => (status.hidden = true), 3000);
    return;
  }

  status.textContent = "Импортирую из FatSecret…";
  const formData = new FormData();
  formData.append("initData", getInitData());
  formData.append("url", url);

  fatsecretImporting = true;
  btn.disabled = true;
  try {
    const res = await fetch(`${API_BASE}/api/nutrition-fatsecret-import`, { method: "POST", body: formData });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    insertSortedByTs(NUTRITION_LOGS, { ts: data.ts, kcal: data.kcal, protein: data.protein, fat: data.fat, carbs: data.carbs, source: "fatsecret", url: data.url });
    input.value = "";
    renderNutritionToday();
    renderWeekNutrition();
    status.textContent = `Импортировано: ${data.kcal ?? 0} ккал · Б${data.protein ?? 0} Ж${data.fat ?? 0} У${data.carbs ?? 0}`;
  } catch (err) {
    status.textContent = "Не удалось импортировать — проверь ссылку и попробуй ещё раз";
  } finally {
    fatsecretImporting = false;
    btn.disabled = false;
  }

  setTimeout(() => (status.hidden = true), 4000);
});

// ---------- ИИ-консультант ----------
let AI_CHAT_HISTORY = [];

function renderAiChatLog() {
  const log = document.getElementById("ai-chat-log");
  if (!AI_CHAT_HISTORY.length) {
    log.innerHTML = `<div class="hint-text" style="margin: 24px 0;">Спроси про тренировки, питание, восстановление — отвечу коротко и по делу.</div>`;
    return;
  }
  log.innerHTML = AI_CHAT_HISTORY.map(m =>
    `<div class="ai-chat-msg ${m.role === "user" ? "ai-chat-msg-user" : "ai-chat-msg-ai"}">${escapeHtml(m.content)}</div>`
  ).join("");
  log.scrollTop = log.scrollHeight;
}

let aiChatSending = false;

async function sendAiChatMessage() {
  if (aiChatSending) return;
  const input = document.getElementById("ai-chat-input");
  const message = input.value.trim();
  if (!message) return;

  const status = document.getElementById("ai-chat-status");
  const sendBtn = document.getElementById("ai-chat-send-btn");
  aiChatSending = true;
  input.disabled = true;
  sendBtn.disabled = true;
  input.value = "";
  AI_CHAT_HISTORY.push({ role: "user", content: message });
  renderAiChatLog();
  status.hidden = false;
  status.textContent = "Печатает…";

  try {
    const res = await fetch(`${API_BASE}/api/ai-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: getInitData(), message, history: AI_CHAT_HISTORY.slice(0, -1) }),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    AI_CHAT_HISTORY.push({ role: "assistant", content: data.reply });
    renderAiChatLog();
    status.hidden = true;
  } catch (err) {
    status.textContent = "Не получилось получить ответ — попробуй ещё раз чуть позже.";
  } finally {
    aiChatSending = false;
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }
}

document.getElementById("ai-chat-send-btn").addEventListener("click", sendAiChatMessage);
document.getElementById("ai-chat-input").addEventListener("keydown", e => {
  if (e.key === "Enter") sendAiChatMessage();
});
renderAiChatLog();

(async () => {
  await loadRealData();

  if (!PROGRAM[currentWorkoutDay]) currentWorkoutDay = "Пн";
  document.getElementById("nutrition-goal-kcal").textContent = NUTRITION_TARGET.kcal;

  selectWorkoutDay(currentWorkoutDay);
  renderWeekProgram();
  renderWeekNutrition();
  renderWeightTab();
  renderMeasurementsHistory();
  renderAnketa();
  renderAnketaProgress();
  renderPhotos();
  renderNutritionToday();
  renderGoalCard();
  renderTariffScreen();
  renderTodayCard();
  renderAchievements();
  renderResultHero();
  maybeShowTrainerActionModal();
  document.getElementById("settings-workout-reminders").checked = WORKOUT_REMINDERS_ENABLED;
  document.getElementById("settings-nutrition-reminders").checked = NUTRITION_REMINDERS_ENABLED;
  document.getElementById("settings-measurement-reminders").checked = MEASUREMENT_REMINDERS_ENABLED;

  const KNOWN_SCREENS = ["home", "workouts", "nutrition", "progress", "checkin", "profile", "anketa", "settings", "ai", "tariff"];
  const requestedScreen = new URLSearchParams(window.location.search).get("screen");
  showScreen(KNOWN_SCREENS.includes(requestedScreen) ? requestedScreen : "home");
})();
