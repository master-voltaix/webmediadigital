// In-app browsers (TikTok, Instagram, Facebook) often refuse to open wa.me links,
// especially in a new tab. There we open WhatsApp directly and, if that fails,
// show a small sheet with the number to copy.
const inAppBrowser = /musical_ly|Bytedance|TikTok|Instagram|FBAN|FBAV|FB_IAB/i.test(navigator.userAgent);
const whatsappDisplayNumber = '0155 11353496';

const showWhatsappHelp = () => {
  if (document.querySelector('.wa-help')) return;
  const sheet = document.createElement('div');
  sheet.className = 'wa-help';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-label', 'WhatsApp-Kontakt');
  const title = document.createElement('strong');
  title.textContent = 'WhatsApp lässt sich hier nicht direkt öffnen.';
  const text = document.createElement('p');
  text.textContent = 'Schreib uns auf WhatsApp an ' + whatsappDisplayNumber + ' oder öffne diese Seite über das Menü (⋯) im Browser.';
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'button button-whatsapp';
  copy.textContent = 'Nummer kopieren';
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('+4915511353496'); copy.textContent = 'Nummer kopiert'; }
    catch { copy.textContent = whatsappDisplayNumber; }
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

if (inAppBrowser) {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="https://wa.me/"]');
    if (!link) return;
    event.preventDefault();
    const url = new URL(link.href);
    const phone = url.pathname.replace(/\D/g, '');
    const text = url.searchParams.get('text') || '';
    let left = false;
    const markLeft = () => { if (document.hidden) left = true; };
    document.addEventListener('visibilitychange', markLeft);
    location.href = 'whatsapp://send?phone=' + phone + '&text=' + encodeURIComponent(text);
    setTimeout(() => {
      document.removeEventListener('visibilitychange', markLeft);
      if (!left && !document.hidden) showWhatsappHelp();
    }, 1500);
  });
}
