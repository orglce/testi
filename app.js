(function () {
  for (var ok = false, pass = String.fromCharCode(0x67,0x65,0x73,0x6c,0x6f); !ok;) {
    if (prompt(String.fromCharCode(0x47,0x65,0x73,0x6c,0x6f,0x3a)) === pass) {
      ok = true;
    } else {
      alert(String.fromCharCode(0x4e,0x61,0x70,0x61,0x10c,0x6e,0x6f,0x20,0x67,0x65,0x73,0x6c,0x6f));
    }
  }
})();

const gdklghd_3x = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6f\x68\x63\x63\x6c\x63\x6e\x6a\x71\x62\x69\x7a\x65\x62\x6e\x62\x6c\x69\x6e\x67\x2e\x73\x75\x70\x61\x62\x61\x73\x65\x2e\x63\x6f";
const hdkglh30 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
let dkgdgdX_ = "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oY2NsY25qcWJpemVibmJsaW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MzAzMzcsImV4cCI6MjA3NDQwNjMzN30"
let gdlkghd = "GHG-bik_-3I8VbTVIF7PbF"
const hgdkl43_ = "_EGCY6JCmG0XmrNV6wJFU"
const _dglkge533 = hdkglh30 + "." + dkgdgdX_ + "." + gdlkghd + hgdkl43_;

const lkgdhgd_xfdlh = window.supabase.createClient(
  gdklghd_3x,
  _dglkge533
);

const BASE_GRADES = [6, 7, 8, 9];
const GRADES = BASE_GRADES.flatMap(g => [
  `${g}`,
  `${g}a`,
  `${g}b`,
]);

const SUBJECTS = [
    "angleščina",
    "biologija",
    "domovinska in državljanska kultura in etika",
    "fizika",
    "fizika",
    "francoščina",
    "geografija",
    "glasba",
    "gospodinjstvo",
    "kemija",
    "matematika",
    "naravoslovje",
    "nemščina",
    "slovenski jezik",
    "šport",
    "tuji jezik angleščina",
    "zgodovina",
    "drugo"
];

const SUBJECT_COLORS = {
  Matematika: "#f7b267",
  Slovenščina: "#a0c4ff",
  Angleščina: "#ffd6a5",
  Fizika: "#bdb2ff",
  DRUGO: "#caffbf",
};

/* =========================
   GRADE COLORS
========================= */

const GRADE_COLORS = {};
GRADES.forEach((g, i) => {
  const isJoint = /^\d+$/.test(g);
  const hue = (i * 45) % 360;
  const saturation = 65;
  const lightness = isJoint ? 72 : 78;
  GRADE_COLORS[g] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
});

/* =========================
   HELPERS
========================= */

function gradeMatchesFilter(testGrade, filter) {
  if (!filter) return true;

  // joint grade selected (e.g. "6")
  if (/^\d+$/.test(filter)) {
    return testGrade === filter || testGrade.startsWith(filter);
  }

  // specific class selected (e.g. "6a")
  const base = filter.replace(/[ab]$/, "");
  return testGrade === filter || testGrade === base;
}

/* =========================
   SUBJECT STYLES
========================= */

function injectSubjectStyles() {
  const style = document.createElement("style");
  let css = "";
  for (const [subject, color] of Object.entries(SUBJECT_COLORS)) {
    css += `.subject-${subject
      .toLowerCase()
      .replace(/\s+/g, "-")} { background: ${color}; }\n`;
  }
  style.textContent = css;
  document.head.appendChild(style);
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) tooltip.classList.remove("visible");

  const form = document.querySelector(".form-modal");
  if (form) form.remove();
}

document.addEventListener("click", (e) => {
  if (
    !e.target.closest("#tooltip") &&
    !e.target.closest(".fc-event") &&
    !e.target.closest(".form-modal")
  ) {
    hideTooltip();
  }
});

/* =========================
   CACHE
========================= */

let testCache = {};
let currentGradeFilter = "";

function getByDate(date) {
  return testCache[date] || [];
}
function addToCache(test) {
  if (!testCache[test.date]) testCache[test.date] = [];
  testCache[test.date].push(test);
}
function removeFromCache(id) {
  for (const date in testCache) {
    testCache[date] = testCache[date].filter(t => t.id !== id);
  }
}
function updateCache(id, newData) {
  for (const date in testCache) {
    testCache[date] = testCache[date].map(t =>
      t.id === id ? { ...t, ...newData } : t
    );
  }
}
function clearCache() {
  testCache = {};
}

/* =========================
   CRUD
========================= */

async function createTest(test) {
  const { data, error } = await lkgdhgd_xfdlh
    .from("tests")
    .insert([test])
    .select();

  if (error) {
    showToast("Ni uspelo dodati preizkusa", true);
    return null;
  }
  addToCache(data[0]);
  return data[0];
}

async function updateTest(id, fields) {
  const { data, error } = await lkgdhgd_xfdlh
    .from("tests")
    .update(fields)
    .eq("id", id)
    .select();

  if (error) {
    showToast("Ni uspelo posodobiti preizkusa", true);
    return null;
  }
  updateCache(id, fields);
  return data[0];
}

async function deleteTest(id) {
  const { error } = await lkgdhgd_xfdlh.from("tests").delete().eq("id", id);
  if (error) {
    showToast("Ni uspelo izbrisati preizkusa", true);
    return false;
  }
  removeFromCache(id);
  return true;
}

/* =========================
   TOAST
========================= */

function showToast(msg, error = false) {
  const toast = document.getElementById("toast");
  toast.textContent = msg + (error ? " (Poskusi znova)" : "");
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 3000);
}

/* =========================
   CALENDAR
========================= */

let calendar;

async function fetchTestsAndFormatEvents(info, successCallback, failureCallback) {
  const { data, error } = await lkgdhgd_xfdlh
    .from("tests")
    .select("*")
    .gte("date", info.startStr)
    .lte("date", info.endStr);

  if (error) {
    showToast("Ni uspelo pridobiti preizkusov", true);
    failureCallback(error);
    return;
  }

  clearCache();
  (data || []).forEach(addToCache);

  const events = (data || [])
    .filter(t => gradeMatchesFilter(t.grade, currentGradeFilter))
    .map(test => ({
      id: test.id,
      title: `${test.grade} ${test.subject}${test.description ? ": " + test.description : ""}`,
      start: test.date,
      allDay: true,
      backgroundColor: GRADE_COLORS[test.grade] || "#ccc",
      borderColor: "#fff",
      extendedProps: { test },
    }));

  successCallback(events);
}

/* =========================
   GRADE BUTTONS
========================= */

function renderGradeButtons() {
  const container = document.getElementById("gradeButtons");
  container.innerHTML = "";

  GRADES.forEach(g => {
    const btn = document.createElement("button");
    btn.textContent = g;
    btn.className = "grade-btn";
    btn.onclick = () => {
      currentGradeFilter = g;
      highlightSelectedGrade(g);
      calendar.refetchEvents();
    };
    container.appendChild(btn);
  });

  const allBtn = document.createElement("button");
  allBtn.textContent = "Vsi";
  allBtn.className = "grade-btn";
  allBtn.onclick = () => {
    currentGradeFilter = null;
    highlightSelectedGrade(null);
    calendar.refetchEvents();
  };
  container.appendChild(allBtn);
}

function highlightSelectedGrade(selected) {
  document.querySelectorAll(".grade-btn").forEach(btn => {
    btn.classList.toggle("active", btn.textContent === selected);
  });
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  injectSubjectStyles();
  renderGradeButtons();

  calendar = new FullCalendar.Calendar(
    document.getElementById("calendar"),
    {
      locale: "sl",
      firstDay: 1,
      buttonText: { today: "Danes" },
      initialView: "dayGridMonth",
      events: fetchTestsAndFormatEvents,
      eventClick: handleEventClick,
      dateClick: handleDateClick,
      height: "auto",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "",
      },
    }
  );

  calendar.render();
});

/* =========================
   TOOLTIP + FORM
========================= */

function handleDateClick(info) {
  showTooltip(
    info.dateStr,
    new Date(info.dateStr).toLocaleDateString("sl-SI", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    info.jsEvent.pageX,
    info.jsEvent.pageY
  );
}

function handleEventClick(info) {
  info.jsEvent.stopPropagation();

  const tooltip = document.getElementById("tooltip");
  tooltip.innerHTML = "";
  tooltip.style.left = info.jsEvent.pageX + "px";
  tooltip.style.top = info.jsEvent.pageY + "px";
  tooltip.classList.add("visible");

  const title = document.createElement("h3");
  title.textContent = `${info.event.title}`;
  tooltip.appendChild(title);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Uredi";
  editBtn.onclick = () => {
    openTestForm(info.event.startStr, info.event.extendedProps.test);
  };
  tooltip.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Izbriši";
  deleteBtn.onclick = () => {
    if (confirm("Ali ste prepričani, da želite izbrisati ta dogodek?")) {
      deleteTest(info.event.id).then(success => {
        if (success) {
          showToast("Dogodek uspešno izbrisan");
          calendar.refetchEvents();
        }
      });
    }
    hideTooltip();
  };
  tooltip.appendChild(deleteBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Prekliči";
  cancelBtn.onclick = hideTooltip;
  tooltip.appendChild(cancelBtn);
}

/* =========================
   DELETE EVENT
========================= */

function handleDeleteEvent(eventId) {
  if (confirm("Ali ste prepričani, da želite izbrisati ta dogodek?")) {
    deleteTest(eventId).then(success => {
      if (success) {
        showToast("Dogodek uspešno izbrisan");
        calendar.refetchEvents();
      }
    });
  }
}

// Modify the showTooltip function to include a delete button
function showTooltip(date, titleText, x, y) {
  const tooltip = document.getElementById("tooltip");
  tooltip.innerHTML = "";
  tooltip.style.left = x + "px";
  tooltip.style.top = y + "px";
  tooltip.classList.add("visible");

  const title = document.createElement("h3");
  title.textContent = titleText;
  tooltip.appendChild(title);

  const tests = getByDate(date).filter(t =>
    gradeMatchesFilter(t.grade, currentGradeFilter)
  );

  tests.forEach(test => {
    const row = document.createElement("div");
    row.className = "test-row";
    row.innerHTML = `<strong>${test.grade}</strong> ${test.subject}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Izbriši";
    deleteBtn.onclick = () => handleDeleteEvent(test.id);
    row.appendChild(deleteBtn);

    tooltip.appendChild(row);
  });

  const addBtn = document.createElement("button");
  addBtn.textContent = "Dodaj preizkus";
  addBtn.onclick = () => openTestForm(date);
  tooltip.appendChild(addBtn);
}

/* =========================
   FORM
========================= */

function openTestForm(date, test = null) {
  hideTooltip();

  const body = document.body;
  const form = document.createElement("form");
  form.className = "form-modal";

  form.innerHTML = `
    <div class="form-group">
      <label for="grade">Razred</label>
      <select name="grade" id="grade">
        ${GRADES.map(
          g =>
            `<option value="${g}" ${
              test && test.grade === g ? "selected" : ""
            }>${g}</option>`
        ).join("")}
      </select>
    </div>

    <div class="form-group">
      <label for="subject">Predmet</label>
      <select name="subject" id="subject">
        ${SUBJECTS.map(
          s =>
            `<option value="${s}" ${
              test && test.subject === s ? "selected" : ""
            }>${s}</option>`
        ).join("")}
      </select>
    </div>

    <div class="form-group">
      <label for="description">Opis</label>
      <textarea name="description" id="description">${
        test ? test.description || "" : ""
      }</textarea>
    </div>

    <div class="form-actions">
      <button type="submit">Shrani</button>
      <button type="button" onclick="hideTooltip()">Prekliči</button>
    </div>
  `;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const grade = form.grade.value;
    const subject = form.subject.value;
    const description = form.description.value;

    if (!grade || !subject) {
      showToast("Razred in predmet sta obvezna", true);
      return;
    }

    if (test) {
      const res = await updateTest(test.id, {
        grade,
        subject,
        description,
      });
      if (!res) return;
    } else {
      const res = await createTest({
        date,
        grade,
        subject,
        description,
      });
      if (!res) return;
    }

    hideTooltip();
    calendar.refetchEvents();
  };

  body.appendChild(form);
}
