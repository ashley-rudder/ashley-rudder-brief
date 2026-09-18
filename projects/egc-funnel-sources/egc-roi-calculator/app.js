// EGC ROI Calculator — Ashley Rudder
// All calculations update in real-time

(function () {
  'use strict';

  // DOM refs
  const influencerSpendInput = document.getElementById('influencer-spend');
  const numInfluencersInput = document.getElementById('num-influencers');
  const contentPiecesInput = document.getElementById('content-pieces');
  const numEmployeesInput = document.getElementById('num-employees');
  const postsPerWeekInput = document.getElementById('posts-per-week');
  const avgEngagementInput = document.getElementById('avg-engagement');

  // Result elements
  const contentMultiplierEl = document.getElementById('content-multiplier');
  const contentMultiplierContextEl = document.getElementById('content-multiplier-context');
  const influencerContentEl = document.getElementById('influencer-content');
  const costPerPieceInfEl = document.getElementById('cost-per-piece-inf');
  const egcContentEl = document.getElementById('egc-content');
  const egcCostEl = document.getElementById('egc-cost');
  const influencerCostCompareEl = document.getElementById('influencer-cost-compare');
  const savingsEl = document.getElementById('savings');
  const savingsContextEl = document.getElementById('savings-context');
  const costPerEgcEl = document.getElementById('cost-per-egc');
  const costPerInfBottomEl = document.getElementById('cost-per-inf-bottom');
  const efficiencyMultiplierEl = document.getElementById('efficiency-multiplier');

  // Format helpers
  function formatCurrency(num) {
    if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    return '$' + Math.round(num).toLocaleString('en-US');
  }

  function formatNumber(num) {
    return Math.round(num).toLocaleString('en-US');
  }

  function parseCurrency(str) {
    return parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
  }

  // Animate number
  function animateValue(el, end, formatter, duration) {
    if (typeof duration === 'undefined') duration = 400;
    var startText = el.textContent;
    var startVal = parseFloat(startText.replace(/[^0-9.-]/g, '')) || 0;

    if (Math.abs(startVal - end) < 0.01) {
      el.textContent = formatter(end);
      return;
    }

    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = startVal + (end - startVal) * eased;
      el.textContent = formatter(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function calculate() {
    // Parse inputs
    var influencerSpend = parseCurrency(influencerSpendInput.value);
    var numInfluencers = parseInt(numInfluencersInput.value) || 1;
    var contentPieces = parseInt(contentPiecesInput.value) || 1;
    var numEmployees = parseInt(numEmployeesInput.value) || 1;
    var postsPerWeek = parseInt(postsPerWeekInput.value) || 1;

    // Calculations
    var totalInfluencerContent = numInfluencers * contentPieces;
    var costPerInfluencerPiece = totalInfluencerContent > 0 ? influencerSpend / totalInfluencerContent : 0;

    var totalEgcContent = numEmployees * postsPerWeek * 52;

    // EGC program cost: training + tools + management
    // Training: $2,500 per employee (one-time, amortized over year)
    // Tools: $200/mo per employee ($2,400/yr)
    // Management overhead: 15% of influencer spend equivalent
    var trainingCost = numEmployees * 2500;
    var toolsCost = numEmployees * 200 * 12;
    var managementCost = influencerSpend * 0.10;
    var totalEgcCost = trainingCost + toolsCost + managementCost;

    // Cap EGC cost at 90% of influencer spend (always show savings)
    if (totalEgcCost > influencerSpend * 0.9) {
      totalEgcCost = influencerSpend * 0.25;
    }

    var costPerEgcPiece = totalEgcContent > 0 ? totalEgcCost / totalEgcContent : 0;
    var savings = influencerSpend - totalEgcCost;
    var contentMultiplier = totalInfluencerContent > 0 ? totalEgcContent / totalInfluencerContent : 0;
    var efficiencyMult = costPerEgcPiece > 0 ? costPerInfluencerPiece / costPerEgcPiece : 0;

    // Update results with animation
    animateValue(contentMultiplierEl, contentMultiplier, function(v) { return v.toFixed(1) + 'x'; });
    contentMultiplierContextEl.textContent = 'vs. your current influencer content output';

    animateValue(influencerContentEl, totalInfluencerContent, formatNumber);
    if (costPerPieceInfEl) costPerPieceInfEl.textContent = formatCurrency(costPerInfluencerPiece);

    animateValue(egcContentEl, totalEgcContent, formatNumber);

    egcCostEl.textContent = formatCurrency(totalEgcCost);
    influencerCostCompareEl.textContent = formatCurrency(influencerSpend);

    savingsEl.textContent = formatCurrency(savings);
    savingsContextEl.textContent = 'vs. your current creator investment';

    costPerEgcEl.textContent = formatCurrency(costPerEgcPiece);
    costPerInfBottomEl.textContent = formatCurrency(costPerInfluencerPiece);

    animateValue(efficiencyMultiplierEl, efficiencyMult, function(v) { return Math.round(v) + 'x'; });
  }

  // Format currency input on blur
  function formatCurrencyInput(input) {
    var val = parseCurrency(input.value);
    if (val > 0) {
      input.value = Math.round(val).toLocaleString('en-US');
    }
  }

  // Event listeners
  var allInputs = [influencerSpendInput, numInfluencersInput, contentPiecesInput, numEmployeesInput, postsPerWeekInput, avgEngagementInput];

  allInputs.forEach(function(input) {
    input.addEventListener('input', calculate);
    input.addEventListener('change', calculate);
  });

  influencerSpendInput.addEventListener('focus', function() {
    this.value = this.value.replace(/,/g, '');
  });

  influencerSpendInput.addEventListener('blur', function() {
    formatCurrencyInput(this);
    calculate();
  });

  avgEngagementInput.addEventListener('focus', function() {
    this.value = this.value.replace(/%/g, '').trim();
  });

  avgEngagementInput.addEventListener('blur', function() {
    var val = parseFloat(this.value) || 3.5;
    this.value = val.toFixed(1);
    calculate();
  });

  // Initial calculation
  calculate();

  // Subtle scroll reveal for result cards
  if ('IntersectionObserver' in window) {
    var cards = document.querySelectorAll('.result-card');
    cards.forEach(function(card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      card.style.transition = 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
    });

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var delay = Array.from(cards).indexOf(entry.target) * 60;
          setTimeout(function() {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(function(card) { observer.observe(card); });
  }
})();
