// Enquiries go to our serverless function, which e-mails them through Resend.
// The local preview has no such function, so there nothing is sent.
const ENDPOINT = /^(localhost|127.0.0.1)$/.test(location.hostname) ? '' : '/api/anfrage';
let delivered = false;

const form = document.querySelector('#quiz');
const steps = [...form.querySelectorAll('.quiz-step')];
const questionCount = steps.length - 1;
const dots = [...form.querySelectorAll('.quiz-stepper li')];
const count = form.querySelector('.quiz-count');
const back = form.querySelector('.quiz-back');
const error = form.querySelector('.quiz-error');
const submit = form.querySelector('[type=submit]');
const interest = new URLSearchParams(location.search).get('leistung');
let current = 0;

const show = index => {
  current = index;
  steps.forEach((step, i) => { step.hidden = i !== index; });
  const done = index === questionCount;
  document.body.classList.toggle('quiz-finished', done);
  dots.forEach((dot, i) => { dot.classList.toggle('is-done', i < index); dot.classList.toggle('is-current', i === index); });
  count.textContent = done ? (delivered ? 'Gesendet' : 'Fertig') : 'Schritt ' + (index + 1) + ' von ' + questionCount;
  back.hidden = index === 0 || done;
  const focusTarget = steps[index].querySelector('h1, input:not([type=radio]):not([type=checkbox])');
  if (index > 0 && focusTarget) focusTarget.focus({ preventScroll: true });
  if (index > 0) form.scrollIntoView({ block: 'start' });
};

// Single-choice steps move on as soon as an answer is picked.
form.querySelectorAll('input[type=radio]').forEach(radio => radio.addEventListener('change', () => {
  setTimeout(() => show(current + 1), 220);
}));
form.querySelector('[data-step=features] .quiz-next').addEventListener('click', () => show(current + 1));
back.addEventListener('click', () => show(current - 1));

const answers = () => {
  const data = new FormData(form);
  return [
    ['Name', data.get('name')],
    ['Telefon / WhatsApp', data.get('phone')],
    ['Betrieb', data.get('company')],
    ['Aktueller Stand', data.get('status')],
    ['Die Website soll', data.getAll('features').join(', ')],
    ['Budget', data.get('budget')],
    ['Interesse an', interest],
  ].filter(([, value]) => value && String(value).trim());
};

const fail = message => { error.textContent = message; error.hidden = false; };

form.addEventListener('submit', async event => {
  event.preventDefault();
  const data = new FormData(form);
  const missing = [];
  if (!String(data.get('name') || '').trim()) missing.push('deinen Namen');
  if (String(data.get('phone') || '').replace(/\D/g, '').length < 6) missing.push('eine gültige Telefonnummer');
  if (!data.get('consent')) missing.push('die Bestätigung der Datenschutzhinweise');
  if (missing.length) return fail('Bitte ergänze noch: ' + missing.join(', ') + '.');
  error.hidden = true;
  const fields = answers();

  if (ENDPOINT) {
    submit.disabled = true;
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(fields)),
      });
      delivered = response.ok;
    } catch {
      delivered = false;
    }
    submit.disabled = false;
  }
  // If the e-mail went out we say so; otherwise WhatsApp stays the way to reach us.
  document.querySelector('#quiz-done-text').textContent = delivered
    ? 'Deine Anfrage ist bei uns angekommen. Wir melden uns innerhalb von 24 Stunden bei dir.'
    : 'Ein Klick fehlt noch: Schick uns deine Angaben per WhatsApp.';
  document.body.classList.toggle('quiz-delivered', delivered);

  // The WhatsApp message carries only the four points the team wants to see.
  const lines = [['Name', data.get('name')], ['Betrieb', data.get('company')], ['Budget', data.get('budget')], ['Stand', data.get('status')]]
    .filter(([, value]) => value && String(value).trim())
    .map(([label, value]) => label + ': ' + String(value).trim()).join('\n');
  document.querySelector('#quiz-whatsapp').href = 'https://wa.me/4915511353496?text=' + encodeURIComponent('Hey, ich habe Interesse an einer Website.\n\n' + lines);
  show(questionCount);
});

show(0);
