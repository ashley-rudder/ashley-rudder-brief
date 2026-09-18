/* ============================================
   CREATOR DARWINISM OS - BETA APP JS
   ============================================ */

const API = "port/8000".startsWith("__") ? "http://localhost:8000" : "port/8000";

// ---- FORM ----
const form = document.getElementById('betaForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');
const successMsg = document.getElementById('successMsg');
const hasProductSelect = document.getElementById('has_product');
const productDetailGroup = document.getElementById('product-detail-group');

// Show/hide product detail based on selection
if (hasProductSelect) {
  hasProductSelect.addEventListener('change', function() {
    productDetailGroup.style.display = (this.value === 'Yes' || this.value === 'Working on one') ? 'flex' : 'none';
  });
}

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate required fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const whyNow = document.getElementById('why_now').value.trim();

    if (!name || !email || !whyNow) {
      shakeButton();
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      shakeButton();
      return;
    }

    // Collect wound
    const woundRadio = document.querySelector('input[name="wound"]:checked');

    const data = {
      name: name,
      email: email,
      platform: document.getElementById('platform').value || '',
      profile_url: document.getElementById('profile_url').value.trim(),
      has_product: hasProductSelect.value || '',
      product_detail: document.getElementById('product_detail').value.trim(),
      known_for: document.getElementById('known_for').value.trim(),
      wound: woundRadio ? woundRadio.value : '',
      why_now: whyNow
    };

    // Submit
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    try {
      const res = await fetch(`${API}/api/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      btnText.textContent = 'Something went wrong. Try again.';
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

function shakeButton() {
  submitBtn.style.animation = 'shake 0.4s ease';
  setTimeout(() => submitBtn.style.animation = '', 400);
}

// ---- SCROLL ANIMATIONS ----
document.documentElement.classList.add('js-loaded');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.wound-card, .loop-step, .benefit').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${i % 4 * 80}ms`;
  observer.observe(el);
});

// ---- ADMIN PANEL ----
let adminPassword = '';
let allApplications = [];
let currentFilter = 'all';

function checkHash() {
  if (window.location.hash === '#admin') {
    const pw = prompt('Enter admin password:');
    if (pw) {
      adminPassword = pw;
      openAdmin();
    } else {
      window.location.hash = '';
    }
  } else {
    closeAdmin();
  }
}

window.addEventListener('hashchange', checkHash);
if (window.location.hash === '#admin') checkHash();

async function openAdmin() {
  try {
    const res = await fetch(`${API}/api/applications?password=${encodeURIComponent(adminPassword)}`);
    if (res.status === 401) {
      alert('Wrong password.');
      window.location.hash = '';
      return;
    }
    allApplications = await res.json();
    document.getElementById('adminPanel').style.display = 'block';
    document.body.style.overflow = 'hidden';
    renderStats();
    renderApplications();
    setupFilters();
  } catch (err) {
    alert('Could not load applications.');
    window.location.hash = '';
  }
}

function closeAdmin() {
  document.getElementById('adminPanel').style.display = 'none';
  document.body.style.overflow = '';
  if (window.location.hash === '#admin') window.location.hash = '';
}

function renderStats() {
  const stats = {
    total: allApplications.length,
    new: allApplications.filter(a => a.status === 'new').length,
    accepted: allApplications.filter(a => a.status === 'accepted').length,
    waitlisted: allApplications.filter(a => a.status === 'waitlisted').length,
  };

  document.getElementById('adminStats').innerHTML = `
    <div class="stat-card"><div class="stat-num">${stats.total}</div><div class="stat-label">Total</div></div>
    <div class="stat-card"><div class="stat-num">${stats.new}</div><div class="stat-label">New</div></div>
    <div class="stat-card"><div class="stat-num">${stats.accepted}</div><div class="stat-label">Accepted</div></div>
    <div class="stat-card"><div class="stat-num">${stats.waitlisted}</div><div class="stat-label">Waitlisted</div></div>
  `;
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      renderApplications();
    });
  });
}

function renderApplications() {
  const filtered = currentFilter === 'all'
    ? allApplications
    : allApplications.filter(a => a.status === currentFilter);

  const list = document.getElementById('adminList');

  if (filtered.length === 0) {
    list.innerHTML = `<p style="color:var(--text-dim);text-align:center;padding:3rem;">No applications${currentFilter !== 'all' ? ' with status "' + currentFilter + '"' : ''} yet.</p>`;
    return;
  }

  list.innerHTML = filtered.map(app => `
    <div class="app-card" data-id="${app.id}">
      <div class="app-card-header">
        <div>
          <div class="app-card-name">${escapeHtml(app.name)}</div>
          <div class="app-card-email">${escapeHtml(app.email)}</div>
        </div>
        <div class="app-card-meta">
          <span class="status-badge status-${app.status}">${app.status}</span>
          <span class="app-card-date">${formatDate(app.created_at)}</span>
        </div>
      </div>
      <div class="app-card-body">
        ${app.platform ? `<div class="app-field"><span class="app-field-label">Platform</span><span class="app-field-value">${escapeHtml(app.platform)}</span></div>` : ''}
        ${app.profile_url ? `<div class="app-field"><span class="app-field-label">Profile</span><span class="app-field-value"><a href="${escapeHtml(app.profile_url)}" target="_blank" rel="noopener">${escapeHtml(app.profile_url)}</a></span></div>` : ''}
        ${app.has_product ? `<div class="app-field"><span class="app-field-label">Has product</span><span class="app-field-value">${escapeHtml(app.has_product)}${app.product_detail ? ' / ' + escapeHtml(app.product_detail) : ''}</span></div>` : ''}
        ${app.known_for ? `<div class="app-field"><span class="app-field-label">Known for</span><span class="app-field-value">${escapeHtml(app.known_for)}</span></div>` : ''}
        ${app.wound ? `<div class="app-field"><span class="app-field-label">Wound</span><span class="app-field-value">${escapeHtml(app.wound)}</span></div>` : ''}
        ${app.why_now ? `<div class="app-field"><span class="app-field-label">Why now</span><span class="app-field-value">${escapeHtml(app.why_now)}</span></div>` : ''}
      </div>
      <div class="app-card-actions">
        <button class="action-btn ${app.status === 'accepted' ? 'active-action' : ''}" onclick="setStatus(${app.id}, 'accepted')">Accept</button>
        <button class="action-btn ${app.status === 'waitlisted' ? 'active-action' : ''}" onclick="setStatus(${app.id}, 'waitlisted')">Waitlist</button>
        <button class="action-btn ${app.status === 'declined' ? 'active-action' : ''}" onclick="setStatus(${app.id}, 'declined')">Decline</button>
      </div>
    </div>
  `).join('');
}

async function setStatus(id, status) {
  try {
    await fetch(`${API}/api/applications/${id}/status?password=${encodeURIComponent(adminPassword)}&new_status=${status}`, { method: 'POST' });
    const app = allApplications.find(a => a.id === id);
    if (app) app.status = status;
    renderStats();
    renderApplications();
  } catch (err) {
    alert('Failed to update status.');
  }
}

function exportCSV() {
  window.open(`${API}/api/export?password=${encodeURIComponent(adminPassword)}`, '_blank');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'Z');
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return date + ' at ' + time;
}

// Shake animation (injected)
const style = document.createElement('style');
style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }`;
document.head.appendChild(style);

// ---- ADMIN LINK ----
var adminLink = document.getElementById('adminLink');
if (adminLink) {
  adminLink.addEventListener('click', function(e) {
    e.preventDefault();
    var pw = prompt('Enter admin password:');
    if (pw) {
      adminPassword = pw;
      openAdmin();
    }
  });
}
