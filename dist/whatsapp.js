// In-app browsers (TikTok, Instagram, Facebook) do not follow links that open in a
// new tab, and they block the whatsapp:// scheme. A plain same-tab link to
// api.whatsapp.com is the form they accept, so on phones and tablets every
// WhatsApp link is rewritten to that right before it is followed.
const touchDevice = matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

if (touchDevice) {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="https://wa.me/"]');
    if (!link) return;
    const url = new URL(link.href);
    const phone = url.pathname.replace(/\D/g, '');
    const text = url.searchParams.get('text') || '';
    link.href = 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + encodeURIComponent(text);
    link.removeAttribute('target');
  }, true);
}
