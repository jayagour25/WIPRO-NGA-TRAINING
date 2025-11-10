// dashboard.js (module)
const eventsUrl = './data/events.json';

// Application state
let events = [];
let registrations = []; // simple in-memory registrations

// DOM elements
const eventCardsEl = document.getElementById('eventCards');
const eventListEl = document.getElementById('eventList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const dateFilter = document.getElementById('dateFilter');
const resetBtn = document.getElementById('resetFilters');
const regForm = document.getElementById('regForm');
const regEventSelect = document.getElementById('regEvent');
const regAlert = document.getElementById('regAlert');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

async function fetchEvents() {
  try {
    const res = await fetch(eventsUrl);
    if (!res.ok) throw new Error('Failed to load events');
    events = await res.json();
    renderAll();
  } catch (err) {
    console.error(err);
    eventCardsEl.innerHTML = `<div class="col-12"><div class="alert alert-danger">Unable to load events.</div></div>`;
  }
}

function renderAll() {
  renderCards(events);
  populateRegOptions(events);
  renderList(events);
}

function renderCards(list) {
  eventCardsEl.innerHTML = '';
  list.forEach(ev => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${ev.image}" class="card-img-top" alt="${ev.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${ev.title}</h5>
          <p class="card-text small text-muted">${ev.category} • ${ev.date}</p>
          <p class="card-text">${ev.summary}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-primary btn-sm" data-id="${ev.id}" data-action="details">Details</button>
            <button class="btn btn-primary btn-sm" data-id="${ev.id}" data-action="register">Register</button>
          </div>
        </div>
      </div>
    `;
    eventCardsEl.appendChild(col);
  });
  // attach handlers for details & register buttons
  eventCardsEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', cardButtonHandler);
  });
}

function renderList(list) {
  // alternate list view below filters
  eventListEl.innerHTML = '';
  list.forEach(ev => {
    const el = document.createElement('div');
    el.className = 'col-12';
    el.innerHTML = `
      <div class="card p-3 shadow-sm">
        <div class="d-flex align-items-center">
          <img src="${ev.image}" style="width:120px;height:80px;object-fit:cover;border-radius:6px;margin-right:12px;">
          <div class="flex-grow-1">
            <h5 class="mb-1">${ev.title}</h5>
            <p class="mb-1 small text-muted">${ev.category} • ${ev.date}</p>
            <p class="mb-0">${ev.summary}</p>
          </div>
          <div class="ms-3 text-end">
            <button class="btn btn-sm btn-outline-secondary" data-id="${ev.id}" data-action="details">Details</button>
            <button class="btn btn-sm btn-success" data-id="${ev.id}" data-action="register">Register</button>
          </div>
        </div>
      </div>
    `;
    eventListEl.appendChild(el);
  });
  eventListEl.querySelectorAll('button').forEach(btn => btn.addEventListener('click', cardButtonHandler));
}

function cardButtonHandler(e) {
  const id = e.currentTarget.getAttribute('data-id');
  const action = e.currentTarget.getAttribute('data-action');
  const ev = events.find(x => x.id === id);
  if (!ev) return;
  if (action === 'details') {
    showDetails(ev);
  } else if (action === 'register') {
    regEventSelect.value = ev.id;
    regEventSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function showDetails(ev) {
  modalTitle.textContent = ev.title;
  modalBody.innerHTML = `
    <img src="${ev.image}" class="img-fluid mb-3" alt="${ev.title}">
    <p><strong>Category:</strong> ${ev.category} &nbsp; | &nbsp; <strong>Date:</strong> ${ev.date}</p>
    <p>${ev.long}</p>
    <p><strong>Currently registered:</strong> ${countRegistrationsFor(ev.id)}</p>
  `;
  const modalEl = new bootstrap.Modal(document.getElementById('eventModal'));
  modalEl.show();
}

function populateRegOptions(list) {
  regEventSelect.innerHTML = '<option value="">Choose an event...</option>';
  list.forEach(ev => {
    const opt = document.createElement('option');
    opt.value = ev.id;
    opt.textContent = `${ev.title} (${ev.date})`;
    regEventSelect.appendChild(opt);
  });
}

// filters
function applyFilters() {
  let filtered = [...events];
  const q = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  const date = dateFilter.value;

  if (q) {
    filtered = filtered.filter(ev => (ev.title + ' ' + ev.summary + ' ' + ev.long).toLowerCase().includes(q));
  }
  if (cat) filtered = filtered.filter(ev => ev.category === cat);
  if (date) filtered = filtered.filter(ev => ev.date === date);

  renderCards(filtered);
  renderList(filtered);
}

// registration
regForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  if (!regForm.checkValidity()) {
    regForm.classList.add('was-validated');
    return;
  }
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const eventId = regEventSelect.value;

  const reg = {
    id: Date.now().toString(),
    name,
    email,
    eventId,
    createdAt: new Date().toISOString()
  };
  registrations.push(reg);

  // Show success
  regAlert.style.display = 'block';
  regAlert.className = 'alert alert-success';
  regAlert.textContent = `Registered ${name} for the event. Total registrations for this event: ${countRegistrationsFor(eventId)}`;

  // reset form (keep validation classes)
  regForm.reset();
  regForm.classList.remove('was-validated');

  // If modal open update it
});

function countRegistrationsFor(eventId) {
  return registrations.filter(r => r.eventId === eventId).length;
}

// event listeners for filters
[searchInput, categoryFilter, dateFilter].forEach(el => el.addEventListener('input', applyFilters));
resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  categoryFilter.value = '';
  dateFilter.value = '';
  applyFilters();
});

fetchEvents();
