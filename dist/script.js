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
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#service-select').value = link.dataset.service;
}));

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

const projects = {
  werkraum: {title:'Werkraum', category:'Handwerk & Innenausbau', description:'Ein ruhiger, hochwertiger Auftritt für einen Handwerksbetrieb. Natürliche Farben, Einblicke in die Arbeit und ein klarer Weg zur Projektanfrage machen Qualität sichtbar.', tags:['Individuelles Webdesign','Mobile Darstellung','Klare Leistungsstruktur'], service:'Website'},
  studio: {title:'Studio Lumi', category:'Lokale Dienstleistung', description:'Ein eleganter Auftritt für ein lokales Studio. Eine warme Bildsprache, übersichtliche Leistungen und gut erreichbare Kontaktmöglichkeiten vermitteln bereits vor dem ersten Besuch ein Gefühl für das Angebot.', tags:['Markengerechtes Design','Mobile Darstellung','Kontakt im Fokus'], service:'Website'}
};
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  const content = document.querySelector('#project-dialog-content');
  content.replaceChildren();
  const eyebrow = document.createElement('div'); eyebrow.className='eyebrow'; eyebrow.textContent='DESIGNKONZEPT · '+project.category.toUpperCase();
  const title = document.createElement('h2'); title.id='project-dialog-title'; title.textContent=project.title;
  const art=button.querySelector('.project-art').cloneNode(true);
  const description=document.createElement('p');description.textContent=project.description;
  const tags=document.createElement('div');tags.className='project-meta';project.tags.forEach(tag=>{const el=document.createElement('span');el.textContent=tag;tags.append(el);});
  const note=document.createElement('p');note.textContent='Dieses Beispiel zeigt eine mögliche Designrichtung. Es handelt sich um ein fiktives Unternehmen und kein abgeschlossenes Kundenprojekt.';
  const link=document.createElement('a');link.className='button button-purple';link.href='#kontakt';link.textContent='So einen Auftritt möchte ich auch';link.addEventListener('click',()=>{document.querySelector('#project-dialog').close();document.querySelector('#service-select').value=project.service;});
  content.append(eyebrow,title,art,description,tags,note,link);
  document.querySelector('#project-dialog').showModal();
}));

const legalContent={
  imprint:`<div class="eyebrow">RECHTLICHE ANGABEN</div><h2 id="legal-dialog-title">Impressum</h2><div class="legal-placeholder">Platzhalter – die vollständigen Firmendaten werden vor dem öffentlichen Start ergänzt.</div><h3>Angaben zum Unternehmen</h3><p>WebMedia Digital<br>[Vollständiger Name / Unternehmensbezeichnung]<br>[Straße und Hausnummer]<br>[Postleitzahl und Ort]</p><h3>Kontakt</h3><p>E-Mail: [E-Mail-Adresse ergänzen]<br>Telefon: [Telefonnummer ergänzen]</p><h3>Weitere Angaben</h3><p>[Vertretungsberechtigte Person, Registerangaben und Umsatzsteuer-ID ergänzen, soweit für das Unternehmen zutreffend.]</p>`,
  privacy:`<div class="eyebrow">DEINE DATEN</div><h2 id="legal-dialog-title">Datenschutzhinweise</h2><div class="legal-placeholder">Platzhalter – die vollständige Datenschutzerklärung wird vor dem öffentlichen Start passend zum Hosting und den tatsächlich verwendeten Diensten ergänzt.</div><h3>Verantwortlicher</h3><p>WebMedia Digital<br>[Unternehmensname, Anschrift und Kontaktadresse ergänzen]</p><h3>Anfrageformular in dieser Vorschau</h3><p>Deine Angaben werden ausschließlich zur Vorbereitung eines Projektbriefs in deinem Browser verarbeitet. Das Formular versendet keine E-Mail und speichert die Angaben nicht in einer Datenbank. Beim Herunterladen wird eine Textdatei auf deinem Gerät erstellt.</p><h3>Technik dieser Website</h3><p>Schrift und Bilder werden lokal mit der Website ausgeliefert. Diese Seite verwendet keinen eingebauten Analyse- oder Werbetracker. Angaben zur Verarbeitung durch den Hostinganbieter sind noch zu ergänzen.</p><h3>Für die fertige Datenschutzerklärung</h3><p>[Rechtsgrundlagen, Hostinganbieter, Speicherfristen, Betroffenenrechte und zuständige Aufsichtsbehörde anhand des tatsächlichen Betriebs ergänzen.]</p>`
};
document.querySelectorAll('[data-legal]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#legal-dialog-content').innerHTML=legalContent[button.dataset.legal];document.querySelector('#legal-dialog').showModal();}));

let briefText='';
document.querySelector('#contact-form').addEventListener('submit', event=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity()) return;
  const data=new FormData(form);
  const fields=[['Name',data.get('name')],['E-Mail',data.get('email')],['Unternehmen',data.get('company')||'Nicht angegeben'],['Leistung',data.get('service')],['Deine Idee',data.get('message')]];
  const summary=document.querySelector('#brief-summary');summary.replaceChildren();
  fields.forEach(([label,value])=>{const term=document.createElement('dt');term.textContent=label;const detail=document.createElement('dd');detail.textContent=String(value);summary.append(term,detail);});
  briefText='WEBMEDIA DIGITAL — PROJEKTBRIEF\n\n'+fields.map(([label,value])=>label+':\n'+value).join('\n\n')+'\n\nHinweis: Dieser Projektbrief wurde lokal vorbereitet. Es wurde keine Anfrage versendet.\n';
  document.querySelector('#brief-dialog').showModal();
});
document.querySelector('#download-brief').addEventListener('click',()=>{
  const blob=new Blob(['\uFEFF'+briefText],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='WebMedia-Digital-Projektbrief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
});

const navLinks=[...document.querySelectorAll('.desktop-nav a')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const id=entry.target.classList.contains('hero')?'main':entry.target.id;navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===(id==='main'?'#':'#'+id)));});},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('.hero,#leistungen,#arbeiten,#agentur,#kontakt').forEach(section=>observer.observe(section));}

