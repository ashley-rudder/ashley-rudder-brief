/* The Banquet — Reader Feedback
   Submissions insert into Supabase (RLS: anon may insert, never read). */

(function () {
  'use strict';

  var SUPABASE_URL = 'https://ohgcayvyvwtybdoswpox.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_2J7DCt3UuTJHAsQ-aw0pDg_nd81qu-v';

  var state = { day: null, feeling: null };

  /* ---------- Day chips ---------- */
  var dayChips = document.querySelectorAll('#day-chips .chip');
  var otherWrapper = document.getElementById('other-day-wrapper');
  var otherInput = document.getElementById('other-day');

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

  /* ---------- Submit another day ---------- */
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
