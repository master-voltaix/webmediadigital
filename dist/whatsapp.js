// In-app browsers (TikTok, Instagram, Facebook) do not follow links that open in a
// new tab, and they block the whatsapp:// scheme. On phones and tablets every
// WhatsApp link is therefore rewritten right before it is followed:
// - Android: an intent:// deep link, which asks the system to open WhatsApp and
//   falls back to the WhatsApp web address if no app answers.
// - everything else: a plain same-tab link to api.whatsapp.com.
// TikTok on iOS blocks the jump into WhatsApp entirely, so there we explain how
// to leave the in-app browser and offer the number to copy instead.
const touchDevice = matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const android = /Android/i.test(navigator.userAgent);
const tiktokOnIos = !android && /musical_ly|Bytedance|TikTok/i.test(navigator.userAgent);

const showWhatsappHelp = () => {
  if (document.querySelector('.wa-help')) return;
  const sheet = document.createElement('div');
  sheet.className = 'wa-help';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-label', 'WhatsApp-Kontakt');
  const title = document.createElement('strong');
  title.textContent = 'TikTok lässt WhatsApp hier nicht öffnen.';
  const text = document.createElement('p');
  text.textContent = 'Tippe oben rechts auf ⋯ und wähle „Im Browser öffnen“. Oder schreib uns direkt auf WhatsApp: 0155 11353496.';
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'button button-whatsapp';
  copy.textContent = 'Nummer kopieren';
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('+4915511353496'); copy.textContent = 'Nummer kopiert'; }
    catch { copy.textContent = '0155 11353496'; }
  });
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'wa-help-close';
  close.setAttribute('aria-label', 'Schließen');
  close.textContent = '×';
  close.addEventListener('click', () => sheet.remove());
  sheet.append(close, title, text, copy);
  document.body.append(sheet);
};

if (touchDevice) {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="https://wa.me/"]');
    if (!link) return;
    if (tiktokOnIos) {
      event.preventDefault();
      showWhatsappHelp();
      return;
    }
    const url = new URL(link.href);
    const query = 'phone=' + url.pathname.replace(/\D/g, '') + '&text=' + encodeURIComponent(url.searchParams.get('text') || '');
    const web = 'https://api.whatsapp.com/send?' + query;
    link.href = android
      ? 'intent://send?' + query + '#Intent;scheme=whatsapp;S.browser_fallback_url=' + encodeURIComponent(web) + ';end'
      : web;
    link.removeAttribute('target');
  }, true);
}
