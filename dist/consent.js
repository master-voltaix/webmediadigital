// Cookie consent and Meta Pixel. The pixel is a marketing tracker, so it is only
// loaded after the visitor has agreed; the choice is kept in localStorage.
const CONSENT_KEY = 'wmd_consent_v1';
const META_PIXEL_ID = '25666265169690276';

const readConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
const storeConsent = value => { try { localStorage.setItem(CONSENT_KEY, value); } catch { /* private mode: ask again next visit */ } };

const loadMetaPixel = () => {
  if (window.fbq) return;
  /* Meta Pixel base code */
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
};

// Other scripts report conversions through this; it does nothing without consent.
window.trackMetaEvent = (name, data) => { if (window.fbq) window.fbq('track', name, data); };

const showConsentBanner = () => {
  if (document.querySelector('.consent-banner')) return;
  const banner = document.createElement('div');
  banner.className = 'consent-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie-Einstellungen');
  const text = document.createElement('p');
  text.append('Wir nutzen das Meta-Pixel, um unsere Werbung zu messen. Das passiert nur mit deiner Zustimmung. ');
  const more = document.createElement('a');
  more.href = 'index.html#datenschutz';
  more.textContent = 'Datenschutz';
  text.append(more);
  const actions = document.createElement('div');
  actions.className = 'consent-actions';
  const decline = document.createElement('button');
  decline.type = 'button';
  decline.className = 'consent-decline';
  decline.textContent = 'Nur notwendige';
  const accept = document.createElement('button');
  accept.type = 'button';
  accept.className = 'consent-accept';
  accept.textContent = 'Alle akzeptieren';
  decline.addEventListener('click', () => { storeConsent('essential'); banner.remove(); });
  accept.addEventListener('click', () => { storeConsent('all'); banner.remove(); loadMetaPixel(); });
  actions.append(decline, accept);
  banner.append(text, actions);
  document.body.append(banner);
};

const consent = readConsent();
if (consent === 'all') loadMetaPixel();
else if (consent !== 'essential') showConsentBanner();

// "Cookie-Einstellungen" links let visitors change their choice later.
document.addEventListener('click', event => {
  if (!event.target.closest('[data-consent-settings]')) return;
  event.preventDefault();
  showConsentBanner();
});
