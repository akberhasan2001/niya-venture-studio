// Scroll nav shadow
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

// Modal logic
function openModal(type) {
  const modal = document.getElementById('niyaModal');
  const badge = document.getElementById('modalBadge');
  const title = document.getElementById('modalTitle');
  const sub = document.getElementById('modalSub');
  const partnerExtra = document.getElementById('partnerExtra');
  const submitBtn = document.getElementById('modalSubmitBtn');
  document.getElementById('niyaForm').style.display = 'flex';
  document.getElementById('modalSuccess').style.display = 'none';
  document.getElementById('niyaForm').reset();

  if (type === 'demo') {
    badge.textContent = 'Join the Waitlist';
    badge.style.background = 'rgba(255,107,53,0.1)';
    badge.style.color = '#FF6B35';
    title.textContent = 'Join the Waitlist';
    sub.textContent = "The platform is coming soon. Join the waitlist and we'll reach out when it's ready for you.";
    partnerExtra.style.display = 'none';
    submitBtn.textContent = 'Join the Waitlist';
  } else {
    badge.textContent = 'Design Partner';
    badge.style.background = 'rgba(31,78,121,0.08)';
    badge.style.color = '#1F4E79';
    title.textContent = 'Help shape the platform';
    sub.textContent = "Design partners get early access, direct input into product decisions, and a front-row seat to what's being built for the Muslim Economy.";
    partnerExtra.style.display = 'block';
    document.querySelector('#partnerExtra label').textContent = 'Why do you want to be a design partner?';
    document.querySelector('#partnerExtra textarea').placeholder = "Tell us about your interest and what you'd like to help shape...";
    submitBtn.textContent = 'Apply as Design Partner';
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('niyaModal').style.display = 'none';
  document.body.style.overflow = '';
}

function submitForm(e) {
  e.preventDefault();
  document.getElementById('niyaForm').style.display = 'none';
  document.getElementById('modalSuccess').style.display = 'block';
}

document.getElementById('niyaModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Summit registration modal
function openSummitModal() {
  document.getElementById('summitForm').style.display = 'flex';
  document.getElementById('summitSuccess').style.display = 'none';
  document.getElementById('summitForm').reset();
  document.getElementById('summitModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeSummitModal() {
  document.getElementById('summitModal').style.display = 'none';
  document.body.style.overflow = '';
}
function submitSummitForm(e) {
  e.preventDefault();
  var name = document.getElementById('summitName').value.trim();
  var email = document.getElementById('summitEmail').value.trim();
  var phone = document.getElementById('summitPhone').value.trim();
  var subject = 'Niya Startup Summit 2026 — Registration: ' + name;
  var body =
    'New registration for Niya Startup Summit 2026\n' +
    'Saturday, August 29, 2026 · Computer History Museum, Silicon Valley\n\n' +
    '────────────────────────\n' +
    'Name:  ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Phone: ' + phone + '\n' +
    '────────────────────────\n\n' +
    'Submitted from niyasf.com';
  var href = 'mailto:events@niyasf.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  window.location.href = href;
  document.getElementById('summitForm').style.display = 'none';
  document.getElementById('summitSuccess').style.display = 'block';
}
document.getElementById('summitModal').addEventListener('click', function(e) {
  if (e.target === this) closeSummitModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); closeSummitModal(); }
});

// Join section form
function submitJoinForm(e) {
  e.preventDefault();
  document.getElementById('joinForm').style.display = 'none';
  document.getElementById('joinSuccess').style.display = 'block';
}

function setJoinRole(role) {
  const sel = document.getElementById('jfRole');
  if (sel) {
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === role) { sel.selectedIndex = i; break; }
    }
    document.querySelector('.join-form-wrap').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => obs.observe(el));
