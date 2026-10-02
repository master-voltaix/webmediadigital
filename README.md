# WebMedia Digital

Statische, responsive Agentur-Website auf Basis der vom Nutzer gewählten Agenturvorlage mit blauer Farbwelt.

## Vorschau

`node preview.mjs` startet die lokale Vorschau unter `http://127.0.0.1:4173`.

## Dateien

- `dist/index.html`: Inhalte und Struktur
- `dist/agency.css`: Design, maximal 1.700 px Inhaltsbreite und mobile Ansichten
- `dist/script.js`: Navigation, Projektansichten, Hinweise und lokaler Projektbrief
- `dist/assets`: lokal ausgelieferte Schrift und Fotos

## Noch zu ergänzen

Firmendaten, Telefonnummer, E-Mail-Adresse und endgültige rechtliche Texte sind auf ausdrücklichen Nutzerwunsch Platzhalter. Das Formular bereitet einen herunterladbaren Projektbrief vor und sendet keine E-Mail. Vor öffentlichem Betrieb den Versand mit einem tatsächlichen Empfänger verbinden und die rechtlichen Texte entsprechend dem tatsächlichen Betrieb ergänzen.

Werkraum und Studio Lumi sind fiktive Designkonzepte. Stockfotos zeigen illustrative Arbeitssituationen, nicht nachgewiesene Mitarbeitende von WebMedia Digital. Es wurden keine Kundenbewertungen oder Leistungszahlen erfunden.

## Bildquellen

- MASUD GAANWALA / Pexels: https://www.pexels.com/photo/web-developer-working-on-laptop-at-office-desk-35184836/
- Walls.io / Pexels: https://www.pexels.com/photo/colleagues-standing-and-looking-at-laptop-17737188/
- Pavel Danilyuk / Pexels: https://www.pexels.com/photo/hands-typing-on-a-laptop-6405641/
- Clay Banks / Unsplash: https://unsplash.com/photos/modern-kitchen-with-wooden-cabinets-and-island-XU_ODlSO9ac
- Max Vakhtbovych / Pexels: https://www.pexels.com/photo/beauty-salon-interior-design-7750114/

Schrift: Manrope, lokal eingebunden. Lizenz: SIL Open Font License.

Die blaue Skulptur wurde zunächst mit dem eingebauten Imagegen-Werkzeug erzeugt und ist nach der Designkorrektur im sichtbaren Layout nicht mehr verwendet. Prompt: „Polished floating translucent cobalt blue and violet acrylic glass angular V lightning sculpture, pale icy blue seamless studio background, premium 3D product render, main sculpture right-center, wide 3:2, no text or interface.“

## Aktueller Bildhintergrund

`dist/assets/office-no-faces.png` wurde mit dem eingebauten Imagegen-Werkzeug erzeugt. Prompt: „Photorealistic candid contemporary web design studio with three people seated at desktop monitors strictly viewed from behind; cool neutral daylight, natural believable desks and monitors, subjects on right, calm left area for text overlay, no visible faces, profiles or reflections, no logos or legible screen text.“

Die Mobile-Ansicht wurde für 320, 390, 768 und 1.024 Pixel überprüft. Die sechs Leistungskarten enthalten Icons und Vorteile statt Stockfotos. Der Header ist kompakt und dekorative blaue Randlinien sind entfernt.

## Letzte Änderungen

Die Agentur-Section ist bildfrei. Header und Logo-Bereich verwenden einen einheitlich dunklen Hintergrund. Die Leistungen sind als sechs kompakte, farbige Karten mit je zwei kurzen Vorteilen umgesetzt. Die Texte sprechen Handwerker und Dienstleister in einfacher Sprache an.

Der WhatsApp-Button öffnet `https://wa.me/4915511353496` mit dem vorgegebenen Text „Hey, ich habe Interesse an einer Webseite“. Der Link bereitet die Nachricht in WhatsApp vor; er versendet sie nicht automatisch. Die Website wird auf Nutzerwunsch weiterhin lokal unter `http://127.0.0.1:4173/` bereitgestellt. Das E-Mail-Formular und die rechtlichen Firmendaten bleiben Platzhalter.

Stand 02.10.2026: Die fiktiven Konzepte Werkraum und Studio Lumi sind durch fünf vom Nutzer gelieferte Screenshots eigener Websites ersetzt (`dist/assets/ref-*.webp`: RaumKlar, Drive7, Falkner Bedachungen, Kernwerk, GrünMeister). Die Bewertungszeile im Hero (4,8 bei 27 Bewertungen) beruht auf Angaben des Nutzers; Quelle und Link fehlen noch. Leistungen sind ein Kasten-Raster mit Nummerierung, die Hero-Schlagworte sind entfernt, auf dem Handy stehen die Hero-Buttons untereinander.

Lokale Überarbeitung: WhatsApp-Grün, konkrete Leistungs-Icons, entfernte Dekosterne und Karten-Pluszeichen, neue Qualitätsprüfung-Section und vereinfachter mobiler Vergleich. Beispiele unverändert.

## Stand 02.10.2026 (abends)

Schrift: General Sans (Regular und Medium, aus der lokalen Installation des Nutzers nach `dist/assets` kopiert; Lizenz bei Fontshare vor dem Livegang prüfen). Farbwelt: heller, warmer Hintergrund, tiefes Navy, Stahlblau als Akzent. Sektionen: Hero, Leistungen (sechs Karten), Anspruch, Referenz-Slider (fünf Screenshots, sechster „Nordmann Umzüge“ fehlt noch als Datei), Vergleichstabelle, Ablauf (vier Schritte), FAQ, Kontakt (Name, E-Mail, Nachricht), Footer mit Linkspalten. Die Sektion „Deine Kunden sollen nicht lange suchen“ wurde entfernt. Formularversand und Rechtstexte sind weiterhin Platzhalter. Werbeaussagen, die der Nutzer bestätigen muss: „Top bewertet von unseren Kunden“, „Premium-Webseite zum Bestpreis“, Zeilen der Vergleichstabelle (schnell, sicher, aktuell).

Unterseite `dist/anfrage.html` mit `dist/anfrage.js`: Anfrage in vier Schritten (Stand der Website, gewünschte Leistungen, Budget, Kontakt). Alle Call-to-Action-Buttons der Startseite führen dorthin; Leistungskarten wählen ihre Leistung über `?leistung=` vor. Am Ende entsteht eine vorbereitete WhatsApp-Nachricht an 0155 11353496 oder eine Textdatei; es gibt weiterhin keinen Server-Versand.
