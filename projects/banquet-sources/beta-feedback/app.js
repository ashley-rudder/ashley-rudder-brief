/* The Banquet — The Journey of Love, Early Reader Circle
   Reading library + three-marks collector.
   Submissions insert into Supabase (RLS: anon may insert, never read). */

(function () {
  'use strict';

  var SUPABASE_URL = 'https://ohgcayvyvwtybdoswpox.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_2J7DCt3UuTJHAsQ-aw0pDg_nd81qu-v';

  var DAYS = [];
  var state = { day: null, feeling: null };

  var sections = {
    library: document.getElementById('library'),
    reader: document.getElementById('reader'),
    feedback: document.getElementById('feedback')
  };
  var navRead = document.getElementById('nav-read');
  var navMarks = document.getElementById('nav-marks');

  function show(which) {
    sections.library.hidden = which !== 'library';
    sections.reader.hidden = which !== 'reader';
    sections.feedback.hidden = which !== 'feedback';
    navRead.classList.toggle('active', which === 'library' || which === 'reader');
    navMarks.classList.toggle('active', which === 'feedback');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navRead.addEventListener('click', function () { show('library'); });
  navMarks.addEventListener('click', function () { show('feedback'); });

  /* ---------- Library (days served from the kitchen) ---------- */
  var listEl = document.getElementById('day-list');

  function renderLibrary() {
    listEl.innerHTML = '';
    DAYS.forEach(function (d) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day-card';
      var num = document.createElement('span');
      num.className = 'day-num';
      num.innerHTML = '<small>Day</small>' + d.n;
      var info = document.createElement('span');
      info.className = 'day-info';
      var t = document.createElement('span');
      t.className = 'day-title';
      t.textContent = d.title;
      var tease = document.createElement('span');
      tease.className = 'day-tease';
      tease.textContent = d.tease;
      info.appendChild(t);
      info.appendChild(tease);
      var arrow = document.createElement('span');
      arrow.className = 'day-arrow';
      arrow.innerHTML = '&rarr;';
      btn.appendChild(num);
      btn.appendChild(info);
      btn.appendChild(arrow);
      btn.addEventListener('click', function () { openDay(d); });
      listEl.appendChild(btn);
    });
  }

  function loadDays() {
    listEl.innerHTML = '<p class="library-intro">Setting the table...</p>';
    fetch(SUPABASE_URL + '/rest/v1/banquet_days?select=day_number,title,tease,body&order=day_number', {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (rows) {
        DAYS = rows.map(function (r) {
          return { n: r.day_number, title: r.title, tease: r.tease, body: r.body };
        });
        renderLibrary();
      })
      .catch(function () {
        listEl.innerHTML = '<p class="library-intro">The table wouldn\'t load. Check your connection and refresh, or go straight to Leave Your Marks above.</p>';
      });
  }

  loadDays();

  /* ---------- Reader ---------- */
  var readerLabel = document.getElementById('reader-day-label');
  var readerTitle = document.getElementById('reader-title');
  var readerBody = document.getElementById('reader-body');
  var currentDay = null;

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderBody(text) {
    var html = '';
    var lines = escapeHtml(text).split('\n');
    var para = [];
    var inList = false;

    function flushPara() {
      if (para.length) { html += '<p>' + para.join(' ') + '</p>'; para = []; }
    }
    function closeList() {
      if (inList) { html += '</ul>'; inList = false; }
    }

    lines.forEach(function (raw) {
      var line = raw.trim();
      if (!line) { flushPara(); closeList(); return; }
      if (line.indexOf('## ') === 0) {
        flushPara(); closeList();
        html += '<h3>' + line.slice(3) + '</h3>';
      } else if (line.indexOf('- ') === 0) {
        flushPara();
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + line.slice(2) + '</li>';
      } else {
        closeList();
        para.push(line);
      }
    });
    flushPara(); closeList();
    return html;
  }

  function openDay(d) {
    currentDay = d;
    readerLabel.textContent = 'Day ' + d.n + ' of 30';
    readerTitle.textContent = d.title;
    readerBody.innerHTML = renderBody(d.body);
    show('reader');
  }

  document.getElementById('back-btn').addEventListener('click', function () { show('library'); });

  document.getElementById('reader-marks-btn').addEventListener('click', function () {
    if (currentDay) selectDayChip('Day ' + currentDay.n);
    show('feedback');
  });

  /* ---------- Day chips ---------- */
  var dayChips = document.querySelectorAll('#day-chips .chip');
  var otherWrapper = document.getElementById('other-day-wrapper');
  var otherInput = document.getElementById('other-day');

  function selectDayChip(dayValue) {
    state.day = null;
    dayChips.forEach(function (c) {
      var match = c.dataset.day === dayValue;
      c.classList.toggle('selected', match);
      if (match) state.day = dayValue;
    });
    otherWrapper.hidden = true;
  }

  dayChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      dayChips.forEach(function (c) { c.classList.remove('selected'); });
      chip.classList.add('selected');
      state.day = chip.dataset.day;
      var isOther = state.day === 'other';
      otherWrapper.hidden = !isOther;
      if (isOther) otherInput.focus();
    });
  });

  /* ---------- Feeling tiles ---------- */
  var tiles = document.querySelectorAll('.feeling-tile');
  tiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
      tiles.forEach(function (t) { t.classList.remove('selected'); });
      tile.classList.add('selected');
      state.feeling = parseInt(tile.dataset.feeling, 10);
    });
  });

  /* ---------- Dictation ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var activeRec = null;
  var activeBtn = null;

  if (!SR) {
    document.body.classList.add('mic-unsupported');
  } else {
    document.querySelectorAll('.mic-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (activeBtn === btn) { stopDictation(); return; }
        stopDictation();
        startDictation(btn);
      });
    });
  }

  function statusEl(targetId) {
    return document.querySelector('[data-status-for="' + targetId + '"]');
  }

  function startDictation(btn) {
    var targetId = btn.dataset.target;
    var field = document.getElementById(targetId);
    var status = statusEl(targetId);
    var rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = true;
    rec.interimResults = true;

    var baseText = field.value ? field.value.replace(/\s+$/, '') + ' ' : '';

    rec.onresult = function (e) {
      var finalText = '';
      var interim = '';
      for (var i = 0; i < e.results.length; i++) {
        var r = e.results[i];
        if (r.isFinal) { finalText += r[0].transcript; }
        else { interim += r[0].transcript; }
      }
      field.value = (baseText + finalText + interim).replace(/^\s+/, '');
      if (status) status.textContent = interim ? 'Listening: "' + interim.trim() + '"' : 'Listening...';
    };

    rec.onerror = function (e) {
      if (status) {
        status.textContent = e.error === 'not-allowed'
          ? 'Microphone permission was blocked. Type instead, or allow the mic and try again.'
          : 'Dictation hiccup (' + e.error + '). Tap the mic to try again.';
      }
      cleanup();
    };

    rec.onend = function () { cleanup(); };

    function cleanup() {
      btn.classList.remove('listening');
      btn.setAttribute('aria-pressed', 'false');
      btn.querySelector('.mic-label').textContent = 'Dictate';
      if (status && status.textContent.indexOf('Listening') === 0) status.textContent = '';
      if (activeRec === rec) { activeRec = null; activeBtn = null; }
    }

    try {
      rec.start();
      activeRec = rec;
      activeBtn = btn;
      btn.classList.add('listening');
      btn.setAttribute('aria-pressed', 'true');
      btn.querySelector('.mic-label').textContent = 'Stop';
      if (status) status.textContent = 'Listening...';
    } catch (err) {
      if (status) status.textContent = 'Could not start the microphone. Type instead.';
    }
  }

  function stopDictation() {
    if (activeRec) { try { activeRec.stop(); } catch (e) {} }
    activeRec = null;
    activeBtn = null;
  }

  /* ---------- Submit ---------- */
  var form = document.getElementById('feedback-form');
  var submitBtn = document.getElementById('submit-btn');
  var errorEl = document.getElementById('form-error');
  var successEl = document.getElementById('success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    stopDictation();
    errorEl.textContent = '';

    if (document.getElementById('website').value) return; // honeypot

    var name = document.getElementById('reader-name').value.trim();
    var hit = document.getElementById('hit-hardest').value.trim();
    var confused = document.getElementById('confused').value.trim();
    var change = document.getElementById('one-change').value.trim();

    var day = state.day;
    if (day === 'other') day = otherInput.value.trim() || 'Unspecified';

    if (!name) { errorEl.textContent = 'Your name first, so I know whose marks these are.'; return; }
    if (!day) { errorEl.textContent = 'Pick the day you read.'; return; }
    if (!hit) { errorEl.textContent = 'Mark one is the one I need most. Where did it hit hardest?'; return; }
    if (!state.feeling) { errorEl.textContent = 'One last tap: how did it leave you feeling, 1 to 5?'; return; }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Setting the table...';

    fetch(SUPABASE_URL + '/rest/v1/banquet_feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        reader_name: name,
        day_read: day,
        hit_hardest: hit,
        confused: confused || null,
        one_change: change || null,
        feeling: state.feeling
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.hidden = true;
        successEl.hidden = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(function () {
        errorEl.textContent = 'That didn\'t go through. Check your connection and tap again; your words are still here.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Leave My Marks';
      });
  });

  /* ---------- Read another day ---------- */
  document.getElementById('again-btn').addEventListener('click', function () {
    ['hit-hardest', 'confused', 'one-change', 'other-day'].forEach(function (id) {
      document.getElementById(id).value = '';
    });
    dayChips.forEach(function (c) { c.classList.remove('selected'); });
    tiles.forEach(function (t) { t.classList.remove('selected'); });
    otherWrapper.hidden = true;
    state.day = null;
    state.feeling = null;
    successEl.hidden = true;
    form.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Leave My Marks';
    show('library');
  });

  /* ---------- Start ---------- */
  show('library');
})();
