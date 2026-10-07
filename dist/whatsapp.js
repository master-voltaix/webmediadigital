// A tap on any WhatsApp button copies our number and opens a small contact sheet.
// TikTok's in-app browser cannot hand links over to WhatsApp, so there the sheet
// explains why and how to continue; elsewhere it offers a button that opens the
// chat with the prepared message.
const tiktokBrowser = /musical_ly|Bytedance|TikTok/i.test(navigator.userAgent);
const whatsappNumber = '+4915511353496';
const whatsappDisplayNumber = '0155 11353496';

const waIcons = {
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  paste: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4.5V3h6v1.5M9 11h6M9 15h4"/></svg>',
  dots: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

const copyWhatsappNumber = async () => {
  try { await navigator.clipboard.writeText(whatsappNumber); return true; }
  catch {
    // Older webviews: fall back to a temporary field and the copy command.
    const field = document.createElement('input');
    field.value = whatsappNumber;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.append(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    field.remove();
    return copied;
  }
};

const closeWhatsappHelp = () => document.querySelectorAll('.wa-help,.wa-help-backdrop').forEach(node => node.remove());

const showWhatsappHelp = async href => {
  const copied = await copyWhatsappNumber();
  closeWhatsappHelp();

  const backdrop = document.createElement('div');
  backdrop.className = 'wa-help-backdrop';
  backdrop.addEventListener('click', closeWhatsappHelp);

  const sheet = document.createElement('div');
  sheet.className = 'wa-help';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-labelledby', 'wa-help-title');
  // Static markup only; no visitor data is inserted here.
  sheet.innerHTML = `
    <button type="button" class="wa-help-close" aria-label="Schließen">×</button>
    <div class="wa-help-head">
      <span class="wa-help-logo">${waIcons.whatsapp}</span>
      <div>
        <strong id="wa-help-title">Schreib uns auf WhatsApp</strong>
        <p>${tiktokBrowser ? 'TikTok blockiert das direkte Öffnen von WhatsApp. So erreichst du uns trotzdem:' : 'In Apps wie TikTok lässt sich WhatsApp nicht direkt öffnen. So erreichst du uns:'}</p>
      </div>
    </div>
    <div class="wa-help-number">
      <span>${whatsappDisplayNumber}</span>
      <button type="button" class="wa-help-copy">${copied ? waIcons.check + 'Kopiert' : waIcons.copy + 'Kopieren'}</button>
    </div>
    <ol class="wa-help-steps">
      <li><span>${waIcons.paste}</span><div><b>Nummer einfügen</b>Öffne WhatsApp, füge die Nummer ein und schreib uns.</div></li>
      <li><span>${waIcons.dots}</span><div><b>Oder im Browser öffnen</b>Tippe oben rechts auf die drei Punkte und wähle „Im Browser öffnen“.</div></li>
    </ol>`;

  if (href && !tiktokBrowser) {
    const open = document.createElement('a');
    open.className = 'button button-whatsapp wa-help-open';
    open.href = href;
    open.target = '_blank';
    open.rel = 'noopener nofollow';
    open.innerHTML = waIcons.whatsapp + 'Chat öffnen' + waIcons.arrow;
    sheet.append(open);
  }

  const copyButton = sheet.querySelector('.wa-help-copy');
  copyButton.classList.toggle('is-copied', copied);
  copyButton.addEventListener('click', async () => {
    const ok = await copyWhatsappNumber();
    copyButton.innerHTML = ok ? waIcons.check + 'Kopiert' : waIcons.copy + 'Kopieren';
    copyButton.classList.toggle('is-copied', ok);
  });
  sheet.querySelector('.wa-help-close').addEventListener('click', closeWhatsappHelp);
  document.body.append(backdrop, sheet);
};

document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="https://wa.me/"]');
  if (!link || link.closest('.wa-help')) return;
  event.preventDefault();
  showWhatsappHelp(link.href);
}, true);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeWhatsappHelp(); });
