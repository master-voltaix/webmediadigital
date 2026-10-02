// In-app browsers (TikTok, Instagram, Facebook) do not follow links that open in a
// new tab, and they block the whatsapp:// scheme. On phones and tablets every
// WhatsApp link is therefore rewritten right before it is followed:
// - Android: an intent:// deep link, which asks the system to open WhatsApp and
//   falls back to the WhatsApp web address if no app answers.
// - everything else: a plain same-tab link to api.whatsapp.com.
const touchDevice = matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const android = /Android/i.test(navigator.userAgent);

if (touchDevice) {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="https://wa.me/"]');
    if (!link) return;
    const url = new URL(link.href);
    const query = 'phone=' + url.pathname.replace(/\D/g, '') + '&text=' + encodeURIComponent(url.searchParams.get('text') || '');
    const web = 'https://api.whatsapp.com/send?' + query;
    link.href = android
      ? 'intent://send?' + query + '#Intent;scheme=whatsapp;S.browser_fallback_url=' + encodeURIComponent(web) + ';end'
      : web;
    link.removeAttribute('target');
  }, true);
}
