const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Menü öffnen' : 'Menü schließen');
  mobileNav.hidden = open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Menü öffnen');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

const legalContent={
  imprint:`<div class="eyebrow">RECHTLICHE ANGABEN</div><h2 id="legal-dialog-title">Impressum</h2>
<h3>Angaben gemäß § 5 DDG</h3><p>WebMedia Digital<br>Sulaiman Samir<br>Berliner Platz 8<br>71065 Sindelfingen<br>Deutschland</p>
<h3>Kontakt</h3><p>Telefon: +49 15511 353496<br>E-Mail: info@webmedia-digital.de</p>
<h3>Umsatzsteuer</h3><p>Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.</p>
<h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3><p>Sulaiman Samir<br>Berliner Platz 8<br>71065 Sindelfingen</p>
<h3>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h3><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h3>Haftung für Inhalte</h3><p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.</p>
<h3>Haftung für Links</h3><p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
<h3>Urheberrecht</h3><p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>`,
  privacy:`<div class="eyebrow">DEINE DATEN</div><h2 id="legal-dialog-title">Datenschutzerklärung</h2>
<h3>1. Verantwortlicher</h3><p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br>WebMedia Digital<br>Sulaiman Samir<br>Berliner Platz 8<br>71065 Sindelfingen<br>E-Mail: info@webmedia-digital.de<br>Telefon: +49 15511 353496</p>
<h3>2. Allgemeine Hinweise</h3><p>Wir nehmen den Schutz deiner personenbezogenen Daten sehr ernst. Diese Datenschutzerklärung erklärt, welche Daten wir erheben, wenn du unsere Webseite nutzt, wofür wir sie verwenden und welche Rechte du hast.</p>
<h3>3. Datenerhebung beim Besuch der Webseite</h3><p>Beim bloßen informatorischen Besuch der Webseite erheben wir nur die Daten, die dein Browser automatisch an den Server übermittelt: IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite und HTTP-Statuscode, Browser-Typ und Betriebssystem sowie die Referrer-URL.</p><p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am stabilen, sicheren Betrieb der Webseite).</p>
<h3>4. Hosting: Vercel</h3><p>Diese Webseite wird bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA gehostet. Beim Abruf der Webseite werden automatisch Server-Logfiles gespeichert (IP-Adresse, Datum/Uhrzeit, aufgerufene URL, Browser). Mit Vercel besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.</p><p>Die Datenübermittlung in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission (Art. 46 DSGVO). Weitere Informationen: vercel.com/legal/privacy-policy.</p><p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
<h3>5. Anfrage in vier Schritten</h3><p>Auf der Seite „Projekt starten“ kannst du uns eine Anfrage senden. Dabei gibst du an: Name (Pflichtfeld), Telefon- oder WhatsApp-Nummer (Pflichtfeld), Betriebsname (freiwillig) sowie Angaben zum aktuellen Stand deiner Website, zu gewünschten Funktionen und zum Budget. Mit dem Absenden werden diese Angaben per E-Mail an uns übermittelt (siehe Abschnitt 6a). Zusätzlich kannst du sie uns per WhatsApp schicken (siehe Abschnitt 7).</p><p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch das Ankreuzen der Datenschutz-Checkbox). Die Daten werden gelöscht, sobald sie für die Bearbeitung deiner Anfrage nicht mehr erforderlich sind, spätestens nach 6 Monaten, sofern kein Vertrag zustande kommt.</p>
<h3>6. Kurzformular auf der Startseite</h3><p>Über das Formular im Bereich „Kontakt“ sendest du uns deinen Namen, deine E-Mail-Adresse und deine Nachricht. Die Angaben werden per E-Mail an uns übermittelt (siehe Abschnitt 6a). Rechtsgrundlage und Speicherdauer entsprechen Abschnitt 5.</p>
<h3>6a. E-Mail-Versand der Anfragen: Resend</h3><p>Für die technische Übermittlung der Formularangaben an unser Postfach nutzen wir den Dienst Resend (Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). Beim Absenden eines Formulars werden deine Angaben an unseren Server bei Vercel (siehe Abschnitt 4) und von dort an Resend übertragen, das sie als E-Mail an uns zustellt.</p><p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b und lit. f DSGVO. Die Übermittlung in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission (Art. 46 DSGVO). Weitere Informationen: resend.com/legal/privacy-policy.</p>
<h3>7. WhatsApp-Kontakt</h3><p>Auf unserer Webseite bieten wir die Möglichkeit, uns über WhatsApp zu kontaktieren. WhatsApp wird von der WhatsApp Ireland Limited (für Nutzer in der EU) betrieben, einem Unternehmen der Meta-Gruppe. Wenn du auf einen WhatsApp-Link klickst und uns eine Nachricht sendest, werden deine Nachricht und Metadaten (u. a. Telefonnummer, Zeitstempel) auf den Servern von Meta verarbeitet. Weitere Informationen: whatsapp.com/legal/privacy-policy.</p><p>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch das aktive Anklicken des Links).</p>
<h3>8. Cookies, Analyse und Werbung</h3><p>Diese Webseite setzt keine Cookies und verwendet keine Analyse-, Tracking- oder Werbedienste. Ein Cookie-Banner ist deshalb nicht erforderlich.</p>
<h3>9. Lokale Schriften</h3><p>Alle Schriftarten werden lokal ausgeliefert. Es findet kein Aufruf externer Dienste (z. B. Google Fonts) statt, sodass diesbezüglich keine Daten an Dritte übertragen werden.</p>
<h3>10. Deine Rechte</h3><p>Du hast jederzeit das Recht auf Auskunft über deine gespeicherten Daten (Art. 15 DSGVO), Berichtigung unrichtiger Daten (Art. 16 DSGVO), Löschung deiner Daten (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO), Widerspruch gegen die Verarbeitung (Art. 21 DSGVO), Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO) und Beschwerde bei einer Datenschutzaufsichtsbehörde (Art. 77 DSGVO); zuständig ist der Landesbeauftragte für den Datenschutz Baden-Württemberg.</p><p>Um deine Rechte auszuüben, kontaktiere uns unter info@webmedia-digital.de.</p>
<h3>11. SSL-Verschlüsselung</h3><p>Diese Webseite nutzt SSL-Verschlüsselung (erkennbar am „https://“ und dem Schloss-Symbol im Browser). Dadurch sind alle Daten, die du an uns überträgst, vor dem Zugriff Dritter geschützt.</p>
<h3>12. Änderungen dieser Datenschutzerklärung</h3><p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen abzubilden.</p><p>Stand: Oktober 2026</p>`
};
document.querySelectorAll('[data-legal]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#legal-dialog-content').innerHTML=legalContent[button.dataset.legal];document.querySelector('#legal-dialog').showModal();}));

let briefText='';
const contactEndpoint=/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?'':'/api/anfrage';
document.querySelector('#contact-form').addEventListener('submit', async event=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity()) return;
  const data=new FormData(form);
  const fields=[['Name',data.get('name')],['E-Mail',data.get('email')],['Nachricht',data.get('message')]];
  const button=form.querySelector('.submit-button');
  let delivered=false;
  if(contactEndpoint){
    button.disabled=true;
    try{const response=await fetch(contactEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(fields))});delivered=response.ok;}catch{delivered=false;}
    button.disabled=false;
  }
  if(delivered){
    const thanks=document.createElement('div');thanks.className='form-thanks';thanks.setAttribute('role','status');
    const title=document.createElement('h3');title.textContent='Vielen Dank für deine Nachricht!';
    const text=document.createElement('p');text.textContent='Sie ist bei uns angekommen. Wir melden uns innerhalb von 24 Stunden bei dir.';
    thanks.append(title,text);form.closest('.contact-form-wrap').replaceChildren(thanks);
    return;
  }
  // Sending failed or is unavailable: offer the prepared brief instead of losing the message.
  const summary=document.querySelector('#brief-summary');summary.replaceChildren();
  fields.forEach(([label,value])=>{const term=document.createElement('dt');term.textContent=label;const detail=document.createElement('dd');detail.textContent=String(value);summary.append(term,detail);});
  briefText='WEBMEDIA DIGITAL — ANFRAGE\n\n'+fields.map(([label,value])=>label+':\n'+value).join('\n\n')+'\n';
  document.querySelector('#brief-dialog').showModal();
});
document.querySelector('#download-brief').addEventListener('click',()=>{
  const blob=new Blob(['\uFEFF'+briefText],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='WebMedia-Digital-Projektbrief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
});

const navLinks=[...document.querySelectorAll('.desktop-nav a')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const id=entry.target.classList.contains('hero')?'main':entry.target.id;navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===(id==='main'?'#':'#'+id)));});},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('.hero,#leistungen,#arbeiten,#agentur,#kontakt').forEach(section=>observer.observe(section));}


const header=document.querySelector('.header');
const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.prepend(progress);
const whatsappFloat=document.querySelector('.whatsapp-float'),heroSection=document.querySelector('.hero');
let floatGreeted=false;
const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(max>0?Math.min(scrollY/max,1):0)+')';header.classList.toggle('is-scrolled',scrollY>10);const showFloat=scrollY>heroSection.offsetHeight*.6;whatsappFloat.classList.toggle('is-visible',showFloat);if(showFloat&&!floatGreeted){floatGreeted=true;setTimeout(()=>whatsappFloat.classList.add('is-expanded'),350);setTimeout(()=>whatsappFloat.classList.remove('is-expanded'),4200);}};
addEventListener('scroll',onScroll,{passive:true});onScroll();

if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;revealObserver.unobserve(el);el.classList.add('is-in');
    setTimeout(()=>el.classList.remove('reveal','is-in'),1300);
  }),{rootMargin:'0px 0px -8% 0px',threshold:.1});
  document.querySelectorAll('.section-heading,.services-list>*,.agency-story-intro,.quality-panel,.refs-slider,.compare,.comparison-foot,.essentials-grid>div:first-child,.essentials-list>div,.process-grid>article,.faq-grid>div:first-child,.faq-list>details,.contact-copy,.contact-form-wrap').forEach(el=>{
    const index=[...el.parentElement.children].indexOf(el);
    el.style.setProperty('--reveal-delay',Math.min(index,5)*70+'ms');
    el.classList.add('reveal');revealObserver.observe(el);
  });
}


if(location.hash==='#datenschutz'){document.querySelector('#legal-dialog-content').innerHTML=legalContent.privacy;document.querySelector('#legal-dialog').showModal();}
