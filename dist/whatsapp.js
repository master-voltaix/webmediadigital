// TikTok's in-app browser does not hand WhatsApp links over to the app. For
// visitors coming from TikTok a tap on a WhatsApp button therefore copies our
// number and shows a short note explaining what to do with it. Every other
// browser follows the plain wa.me link untouched.
const tiktokBrowser = /musical_ly|Bytedance|TikTok/i.test(navigator.userAgent);
const whatsappNumber = '+4915511353496';
const whatsappDisplayNumber = '0155 11353496';

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

const showWhatsappHelp = async () => {
  const copied = await copyWhatsappNumber();
  document.querySelector('.wa-help')?.remove();
  const sheet = document.createElement('div');
  sheet.className = 'wa-help';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-label', 'WhatsApp-Kontakt');
  const title = document.createElement('strong');
  title.textContent = copied ? 'Nummer kopiert' : 'Unsere WhatsApp-Nummer';
  const text = document.createElement('p');
  text.textContent = whatsappDisplayNumber + ' – einfach in WhatsApp einfügen.';
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'button button-whatsapp';
  copy.textContent = copied ? 'Nummer erneut kopieren' : 'Nummer kopieren';
  copy.addEventListener('click', async () => {
    copy.textContent = (await copyWhatsappNumber()) ? 'Nummer kopiert' : whatsappDisplayNumber;
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

if (tiktokBrowser) {
  document.addEventListener('click', event => {
    if (!event.target.closest('a[href^="https://wa.me/"]')) return;
    event.preventDefault();
    showWhatsappHelp();
  }, true);
}
