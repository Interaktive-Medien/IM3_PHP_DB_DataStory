'use strict';

// IM3 Planer: links der offene Ablauf, rechts die Kurstage eines Standorts.

// Jede Kategorie trägt die Hauptfarbe ihres Emojis.
const KATEGORIEN = [
  ['📕', 'Theorie', '#e5484d'],
  ['🧑‍🏫', 'Code-Along', '#8e5cf0'],
  ['💻', 'Digitale Übung', '#3b82f6'],
  ['📝', 'Analoge Übung', '#e2a610'],
  ['🛠️', 'Tooling', '#6b7a90'],
  ['🎨', 'Projektarbeit', '#ec4899'],
  ['🃏', 'Story-Karten', '#12a594'],
  ['✅', 'Meilenstein', '#22a559'],
];
const WEITERE = [['🎲', '#c0712a'], ['☕', '#8b5e3c'], ['🍽️', '#8a8f98'], ['⭐', '#f2b705'], ['❗', '#e5484d'], ['🎤', '#8e5cf0'], ['📌', '#e5484d'], ['❓', '#e5484d'], ['🏪', '#1d1b17']];

// Jede dozierende Person bekommt eine feste Farbe für ihre Initiale.
const PERSONEN_FARBEN = ['#0f8b8d', '#d9480f', '#3b5bdb', '#9c36b5', '#c2255c', '#2b8a3e', '#b7791f'];

const ohneVariante = (emoji) => (emoji || '').replace(/️/g, '');
const FARBEN = new Map([...KATEGORIEN.map(([emoji, , f]) => [emoji, f]), ...WEITERE].map(([emoji, f]) => [ohneVariante(emoji), f]));
const farbe = (emoji) => FARBEN.get(ohneVariante(emoji)) || '#9a958c';

const $ = (selektor, wurzel = document) => wurzel.querySelector(selektor);

let zustand = null;
let standort = location.hash.slice(1);
let ziehen = null;
let markiert = null;
let offenerEintrag = null;
let offenerTag = null;
let ersterAufbau = true;

// Eingeklappte Blöcke in der Spalte «Offen», gespeichert pro Browser.
let zugeklappteBloecke = new Set();
try { zugeklappteBloecke = new Set(JSON.parse(localStorage.getItem('planer-bloecke-zu') || '[]')); } catch { /* kein Speicher */ }

// Auf Touch-Geräten und schmalen Bildschirmen gibt es kein Drag & Drop, sondern Aktionsblätter.
const TOUCH = matchMedia('(max-width: 860px), (pointer: coarse)');

const platzhalter = document.createElement('li');
platzhalter.className = 'platzhalter';

// --- Hilfsfunktionen -------------------------------------------------------

function el(tag, attribute = {}, ...kinder) {
  const knoten = document.createElement(tag);
  for (const [name, wert] of Object.entries(attribute)) {
    if (wert === null || wert === undefined || wert === false) continue;
    if (name === 'text') knoten.textContent = wert;
    else if (name === 'class') knoten.className = wert;
    else if (name.startsWith('on')) knoten.addEventListener(name.slice(2), wert);
    else knoten.setAttribute(name, wert === true ? '' : wert);
  }
  knoten.append(...kinder.filter((kind) => kind !== null && kind !== undefined && kind !== false));
  return knoten;
}

function datumAus(text) {
  const [jahr, monat, tag] = text.split('-').map(Number);
  return new Date(jahr, monat - 1, tag);
}

function tagName(tag) {
  const format = (text) => datumAus(text).toLocaleDateString('de-CH', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  return tag.datum2 ? `${format(tag.datum)} + ${format(tag.datum2)}` : format(tag.datum);
}

function dauerText(minuten) {
  if (minuten < 60) return `${minuten}'`;
  const rest = minuten % 60;
  return `${Math.floor(minuten / 60)} h${rest ? ` ${rest}'` : ''}`;
}

// Montag ist 0, Sonntag 6.
function wochentagVon(datum) {
  return (datum.getDay() + 6) % 7;
}

// Kalenderwoche nach ISO: Die Woche gehört zum Jahr ihres Donnerstags.
function kalenderwoche(montag) {
  const donnerstag = new Date(montag);
  donnerstag.setDate(montag.getDate() + 3);
  const jahresbeginn = new Date(donnerstag.getFullYear(), 0, 1);
  return Math.floor(Math.round((donnerstag - jahresbeginn) / 86400000) / 7) + 1;
}

let meldungTimer = null;
function meldung(text, istFehler = false) {
  const box = $('#meldung');
  box.hidden = true;
  box.textContent = text;
  box.classList.toggle('fehler', istFehler);
  box.hidden = false;
  clearTimeout(meldungTimer);
  meldungTimer = setTimeout(() => { box.hidden = true; }, istFehler ? 5000 : 1600);
}

// --- Server ----------------------------------------------------------------

async function laden(animieren = false) {
  try {
    const antwort = await fetch(`api.php?standort=${encodeURIComponent(standort)}`, { cache: 'no-store' });
    const daten = await antwort.json();
    if (!antwort.ok) throw new Error(daten.fehler || antwort.statusText);
    zustand = daten;
    render(animieren);
  } catch (fehler) {
    meldung(`Laden fehlgeschlagen: ${fehler.message}`, true);
  }
}

async function senden(aktion, daten = {}) {
  let antwort = null;
  let json;
  try {
    antwort = await fetch('api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aktion, standort, ...daten }),
    });
    json = await antwort.json();
  } catch {
    json = { fehler: 'Keine Verbindung zum Server' };
  }
  if (!antwort?.ok) {
    meldung(json.fehler || 'Speichern fehlgeschlagen', true);
    await laden();
    return false;
  }
  zustand = json;
  render();
  meldung('Gespeichert');
  return true;
}

// --- Darstellung -----------------------------------------------------------

function render(animieren = false) {
  standort = zustand.standort;
  if (location.hash.slice(1) !== standort) history.replaceState(null, '', `#${standort}`);
  document.title = `${zustand.standorte[standort]} · IM3 Planer`;
  document.body.dataset.standort = standort;
  document.body.classList.toggle('bearbeiten', zustand.bearbeiten);
  $('#modus').textContent = zustand.bearbeiten ? 'Bearbeiten beenden' : 'Bearbeiten';

  for (const bereich of [$('#ablauf-inhalt'), $('#tage-inhalt')]) bereich.classList.toggle('einblenden', animieren);

  renderBuehne();
  renderAblauf();
  renderTage();

  // Auf dem Handy beim ersten Öffnen direkt zum nächsten Kurstag springen.
  if (ersterAufbau && TOUCH.matches && document.body.dataset.ansicht === 'tage') {
    const naechster = [...document.querySelectorAll('.tag')].find((tag) => !tag.classList.contains('vorbei'));
    if (naechster && naechster !== $('.tag')) naechster.scrollIntoView({ block: 'start' });
  }
  ersterAufbau = false;
}

function renderBuehne() {
  $('#tabs').replaceChildren(...Object.entries(zustand.standorte).map(([slug, name]) =>
    el('a', { class: `tab ${slug}`, href: `#${slug}`, 'aria-current': slug === standort ? 'page' : null, text: name })));

  const eintraege = zustand.eintraege.filter((e) => e.typ === 'eintrag');
  const zaehle = (test) => eintraege.filter(test).length;
  const erledigt = zaehle((e) => e.erledigt);
  const geplant = zaehle((e) => e.tag_id && !e.erledigt);
  const gestrichen = zaehle((e) => !e.tag_id && e.gestrichen);
  const offen = eintraege.length - erledigt - geplant - gestrichen;
  const basis = eintraege.length - gestrichen || 1;

  $('#ort-name').textContent = zustand.standorte[standort];
  $('#zahlen').replaceChildren(...[['Erledigt', erledigt], ['Geplant', geplant], ['Offen', offen], ['Gestrichen', gestrichen]]
    .map(([name, zahl]) => el('div', { class: 'kennzahl' }, el('strong', { text: zahl }), el('span', { text: name }))));
  $('#balken-erledigt').style.width = `${(erledigt / basis) * 100}%`;
  $('#balken-geplant').style.width = `${(geplant / basis) * 100}%`;
  $('#prozent').textContent = `${Math.round((erledigt / basis) * 100)} % erledigt`;
  $('#zahl-offen').textContent = offen;
  $('#ablauf-zahl').textContent = offen;
}

function bloecke() {
  const gruppen = new Map();
  for (const eintrag of zustand.eintraege) {
    if (eintrag.typ !== 'eintrag') continue;
    if (!gruppen.has(eintrag.block)) gruppen.set(eintrag.block, []);
    gruppen.get(eintrag.block).push(eintrag);
  }
  return gruppen;
}

function renderAblauf() {
  $('#legende').replaceChildren(...KATEGORIEN.map(([emoji, name, f]) =>
    el('span', { style: `--k:${f}`, title: emoji, text: name })));

  const teile = [];
  if (zustand.bearbeiten) {
    teile.push(el('div', { class: 'palette' },
      el('span', { class: 'palette-label', text: 'Ziehen' }),
      el('span', { class: 'baustein', draggable: 'true', 'data-wert': 'neu:pause', text: '☕ Pause' }),
      el('span', { class: 'baustein', draggable: 'true', 'data-wert': 'neu:mittag', text: '🍽️ Mittag' }),
      el('span', { class: 'baustein', draggable: 'true', 'data-wert': 'neu:termin', text: '📌 Termin' }),
      el('button', { class: 'knopf-leise', type: 'button', text: '+ Eintrag', onclick: () => eintragDialog(null) })));
  }

  [...bloecke()].forEach(([block, alle], index) => {
    const liegen = alle.filter((e) => !e.tag_id);
    const offen = liegen.filter((e) => !e.gestrichen).length;
    const gestrichen = liegen.length - offen;
    const zahl = [
      offen || !gestrichen ? (offen ? `${offen} offen` : 'alles eingeplant') : null,
      gestrichen ? `${gestrichen} gestrichen` : null,
    ].filter(Boolean).join(' · ');
    const kern = liegen.filter((e) => !e.zusatz);
    const zusatz = liegen.filter((e) => e.zusatz);

    const zu = zugeklappteBloecke.has(block);

    teile.push(el('section', { class: `block${zu ? ' zu' : ''}`, style: `--i:${index}` },
      el('header', { class: 'block-kopf' },
        el('h3', {},
          el('button', { class: 'block-umschalten', type: 'button', 'aria-expanded': String(!zu), onclick: () => blockUmschalten(block) },
            el('span', { class: 'pfeil', 'aria-hidden': 'true', text: '▾' }),
            block || 'Ohne Block')),
        el('span', { class: 'zahl', text: zahl })),
      el('div', { class: 'block-inhalt', hidden: zu },
        kern.length ? el('ul', { class: 'liste' }, ...kern.map((e) => karte(e))) : null,
        zusatz.length ? el('p', { class: 'zusatz-titel', text: 'Zusatzmaterial' }) : null,
        zusatz.length ? el('ul', { class: 'liste' }, ...zusatz.map((e) => karte(e))) : null,
        zustand.bearbeiten
          ? el('button', { class: 'block-plus', type: 'button', text: '+ Eintrag', onclick: () => eintragDialog(null, { block }) })
          : null)));
  });

  $('#ablauf-inhalt').replaceChildren(...teile);
}

function blockUmschalten(block) {
  if (zugeklappteBloecke.has(block)) zugeklappteBloecke.delete(block);
  else zugeklappteBloecke.add(block);
  try { localStorage.setItem('planer-bloecke-zu', JSON.stringify([...zugeklappteBloecke])); } catch { /* gilt nur bis zum Neuladen */ }
  $('#ablauf-inhalt').classList.remove('einblenden');
  renderAblauf();
}

function renderTage() {
  const proTag = new Map();
  for (const eintrag of zustand.eintraege) {
    if (!eintrag.tag_id) continue;
    if (!proTag.has(eintrag.tag_id)) proTag.set(eintrag.tag_id, []);
    proTag.get(eintrag.tag_id).push(eintrag);
  }

  const heute = new Date();
  heute.setHours(0, 0, 0, 0);

  // Das Jahr nur zeigen, wenn es vom ersten Kurstag abweicht, zum Beispiel bei der Abgabe im Januar.
  const semesterJahr = zustand.tage.length ? datumAus(zustand.tage[0].datum).getFullYear() : null;

  // Eine Spalte pro Wochentag, an dem dieser Standort Kurstage hat, Montag links.
  const spalten = [...new Set(zustand.tage.map((tag) => wochentagVon(datumAus(tag.datum))))].sort((a, b) => a - b);

  const karten = zustand.tage.map((tag, index) => {
    // Ein zweites Datum heisst: Halbklassen machen dasselbe an zwei Tagen.
    const datum = datumAus(tag.datum);
    const datum2 = tag.datum2 ? datumAus(tag.datum2) : null;
    const daten = datum2 ? [datum, datum2] : [datum];
    const istHeute = daten.some((d) => +d === +heute);
    const istVorbei = daten.every((d) => d < heute);
    const monatVon = (d, laenge) => d.toLocaleDateString('de-CH', d.getFullYear() === semesterJahr ? { month: laenge } : { month: laenge, year: 'numeric' });
    const wochentag = datum2
      ? daten.map((d) => d.toLocaleDateString('de-CH', { weekday: 'short' })).join(' & ')
      : datum.toLocaleDateString('de-CH', { weekday: 'long' });
    let monat = monatVon(datum, 'long');
    if (datum2) {
      monat = `Halbklassen · ${datum.getMonth() === datum2.getMonth() ? monat : `${monatVon(datum, 'short')} / ${monatVon(datum2, 'short')}`}`;
    }
    const liste = (proTag.get(tag.id) || []).sort((a, b) => a.tag_pos - b.tag_pos || a.id - b.id);
    const inhalte = liste.filter((e) => e.typ === 'eintrag');
    const minuten = liste.reduce((summe, e) => summe + (e.dauer || 0), 0);

    return el('article', { class: ['tag', istHeute && 'heute', istVorbei && 'vorbei'].filter(Boolean).join(' '), style: `--i:${index}; --spalte:${spalten.indexOf(wochentagVon(datum)) + 1}` },
      el('header', { class: 'tag-kopf' },
        el('span', { class: 'tag-nummer' }, String(datum.getDate()), datum2 ? el('span', { class: 'zweite', text: `/${datum2.getDate()}` }) : null),
        el('div', { class: 'tag-name' },
          el('strong', { text: wochentag }),
          el('span', { text: monat })),
        el('div', { class: 'tag-meta' },
          istHeute ? el('span', { class: 'heute-marke', text: 'Heute' }) : null,
          minuten ? el('span', { class: 'pille', text: dauerText(minuten) }) : null,
          inhalte.length ? el('span', { class: 'pille', text: `${inhalte.filter((e) => e.erledigt).length}/${inhalte.length} ✓` }) : null,
          zustand.bearbeiten
            ? el('button', { class: 'knopf-icon', type: 'button', title: 'Kurstag bearbeiten', 'aria-label': 'Kurstag bearbeiten', text: '✎', onclick: () => tagDialog(tag) })
            : null,
          zustand.bearbeiten
            ? el('button', { class: 'knopf-icon nur-touch tag-plus', type: 'button', 'aria-label': 'Einträge hinzufügen', text: '+', onclick: () => hinzufuegenZu(tag) })
            : null)),
      personen(tag),
      tag.notiz ? el('p', { class: 'tag-notiz', text: tag.notiz }) : null,
      el('ul', {
        class: 'liste tag-liste',
        'data-tag-id': tag.id,
        'data-leer': zustand.bearbeiten ? (TOUCH.matches ? 'Mit + hinzufügen' : 'Hierher ziehen') : 'Noch nichts geplant',
      }, ...liste.map((e) => karte(e, true))));
  });

  // Jede Woche beginnt auf einer neuen Zeile. Die Kurstage kommen nach Datum sortiert vom Server.
  const wochen = new Map();
  zustand.tage.forEach((tag, index) => {
    const montag = datumAus(tag.datum);
    montag.setDate(montag.getDate() - wochentagVon(montag));
    if (!wochen.has(+montag)) wochen.set(+montag, { montag, karten: [] });
    wochen.get(+montag).karten.push(karten[index]);
  });

  const raster = [...wochen.values()].map(({ montag, karten: wochenKarten }) =>
    el('section', { class: 'woche' },
      el('h3', { class: 'woche-kopf' },
        el('strong', { text: `KW ${kalenderwoche(montag)}` }),
        el('span', { text: `ab ${montag.toLocaleDateString('de-CH', montag.getFullYear() === semesterJahr ? { day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long', year: 'numeric' })}` })),
      ...wochenKarten));

  if (zustand.bearbeiten) {
    raster.push(el('button', { class: 'neuer-tag', type: 'button', text: '+ Kurstag', onclick: () => tagDialog(null) }));
  }

  $('#tage-inhalt').replaceChildren(el('div', { class: 'tage-raster', style: `--spalten:${Math.max(spalten.length, 1)}` }, ...raster));
}

function personFarbe(name) {
  return PERSONEN_FARBEN[Math.max(zustand.dozierende.indexOf(name), 0) % PERSONEN_FARBEN.length];
}

function person(name) {
  return el('span', { class: 'person', style: `--p:${personFarbe(name)}` },
    el('span', { class: 'initial', 'aria-hidden': 'true', text: name[0] }), name);
}

function personen(tag) {
  if (tag.dozierende.length) return el('div', { class: 'dozierende' }, ...tag.dozierende.map(person));
  if (!zustand.bearbeiten) return null;
  return el('div', { class: 'dozierende' },
    el('button', { type: 'button', class: 'person-plus', text: '+ Dozierende', onclick: () => tagDialog(tag) }));
}

function karte(eintrag, aufTag = false) {
  const istEintrag = eintrag.typ === 'eintrag';
  const istTermin = eintrag.typ === 'termin';
  const gestrichen = !aufTag && Boolean(eintrag.gestrichen);
  const klassen = [
    'karte',
    (eintrag.typ === 'pause' || eintrag.typ === 'mittag') && 'pause',
    istTermin && 'termin',
    eintrag.erledigt && 'erledigt',
    gestrichen && 'gestrichen',
    ohneVariante(eintrag.emoji) === '✅' && 'meilenstein',
  ];
  const link = /^https?:\/\//i.test(eintrag.link || '') ? eintrag.link : null;

  return el('li', {
    class: klassen.filter(Boolean).join(' '),
    style: `--k:${farbe(eintrag.emoji)}`,
    'data-wert': eintrag.id,
    'data-typ': eintrag.typ,
    draggable: zustand.bearbeiten && !TOUCH.matches ? 'true' : null,
    onclick: (ereignis) => {
      if (!zustand.bearbeiten || ereignis.target.closest('input, a, button')) return;
      if (TOUCH.matches) aktionenFuer(eintrag);
      else eintragDialog(eintrag);
    },
  },
  aufTag && istEintrag
    ? el('input', {
      type: 'checkbox',
      class: 'haken',
      checked: Boolean(eintrag.erledigt),
      disabled: !zustand.bearbeiten,
      'aria-label': `${eintrag.titel} erledigt`,
      onchange: (ereignis) => senden('abhaken', { id: eintrag.id, erledigt: ereignis.target.checked }),
    })
    : null,
  el('span', { class: 'chip', 'aria-hidden': 'true', text: eintrag.emoji }),
  el('div', { class: 'inhalt' },
    istTermin ? el('span', { class: 'termin-label', text: 'Pflichttermin' }) : null,
    el('span', { class: 'titel', text: eintrag.titel }),
    link
      ? el('a', { class: 'link', href: link, target: '_blank', rel: 'noopener', draggable: 'false', title: 'Material öffnen', text: 'Link' })
      : null,
    eintrag.notiz ? el('p', { class: 'notiz', text: eintrag.notiz }) : null),
  eintrag.dauer ? el('span', { class: 'dauer', text: `${eintrag.dauer}'` }) : null,
  !aufTag && istEintrag && zustand.bearbeiten
    ? el('button', {
      class: 'streichen',
      type: 'button',
      title: gestrichen ? 'Wieder aufnehmen' : 'Durchstreichen',
      'aria-label': `${eintrag.titel} ${gestrichen ? 'wieder aufnehmen' : 'durchstreichen'}`,
      text: gestrichen ? '↺' : '✕',
      onclick: () => senden('streichen', { id: eintrag.id, gestrichen: !gestrichen }),
    })
    : null);
}

// --- Touch: Aktionsblatt statt Drag & Drop ---------------------------------

function tagesListe(tagId) {
  return zustand.eintraege.filter((e) => e.tag_id === tagId).sort((a, b) => a.tag_pos - b.tag_pos || a.id - b.id);
}

function aufTagLegen(tagId, werte) {
  const bleiben = tagesListe(tagId).map((e) => e.id).filter((id) => !werte.includes(id));
  return senden('platzieren', { tag_id: tagId, reihenfolge: [...bleiben, ...werte] });
}

function kurzerTag(tag) {
  const format = (text) => datumAus(text).toLocaleDateString('de-CH', { weekday: 'short', day: 'numeric', month: 'short' });
  return tag.datum2 ? `${format(tag.datum)} + ${format(tag.datum2)}` : format(tag.datum);
}

function blatt(titel, emoji, ...inhalt) {
  const chip = $('#aktion-chip');
  chip.hidden = !emoji;
  chip.textContent = emoji || '';
  chip.style.setProperty('--k', farbe(emoji));
  $('#aktion-titel').textContent = titel;
  $('#aktion-inhalt').replaceChildren(...inhalt.filter(Boolean));
  if (!$('#aktion-dialog').open) $('#aktion-dialog').showModal();
}

function aktion(text, ausfuehren) {
  return el('button', {
    type: 'button',
    class: 'aktion',
    text,
    onclick: () => {
      $('#aktion-dialog').close();
      ausfuehren();
    },
  });
}

function tagWahl(eintrag) {
  return el('div', { class: 'tag-wahl' }, ...zustand.tage
    .filter((tag) => tag.id !== eintrag.tag_id)
    .map((tag) => aktion(kurzerTag(tag), () => aufTagLegen(tag.id, [eintrag.id]))));
}

function aktionenFuer(eintrag) {
  const istEintrag = eintrag.typ === 'eintrag';

  if (!eintrag.tag_id) {
    blatt(eintrag.titel, eintrag.emoji,
      el('p', { class: 'blatt-titel', text: 'Auf Kurstag legen' }),
      tagWahl(eintrag),
      el('div', { class: 'aktionen-liste' },
        aktion(eintrag.gestrichen ? '↺ Wieder aufnehmen' : '✕ Durchstreichen', () => senden('streichen', { id: eintrag.id, gestrichen: !eintrag.gestrichen })),
        aktion('✎ Bearbeiten', () => eintragDialog(eintrag))));
    return;
  }

  const ids = tagesListe(eintrag.tag_id).map((e) => e.id);
  const pos = ids.indexOf(eintrag.id);
  const tauschen = (versatz) => {
    [ids[pos], ids[pos + versatz]] = [ids[pos + versatz], ids[pos]];
    return senden('platzieren', { tag_id: eintrag.tag_id, reihenfolge: ids });
  };

  blatt(eintrag.titel, eintrag.emoji,
    el('div', { class: 'aktionen-liste' },
      istEintrag ? aktion(eintrag.erledigt ? '○ Nicht mehr erledigt' : '✓ Erledigt', () => senden('abhaken', { id: eintrag.id, erledigt: !eintrag.erledigt })) : null,
      pos > 0 ? aktion('↑ Nach oben', () => tauschen(-1)) : null,
      pos < ids.length - 1 ? aktion('↓ Nach unten', () => tauschen(1)) : null,
      eintrag.typ !== 'termin' ? aktion(istEintrag ? '← Zurück in den Ablauf' : '✕ Entfernen', () => senden('zurueck', { id: eintrag.id })) : null,
      aktion('✎ Bearbeiten', () => eintragDialog(eintrag))),
    el('p', { class: 'blatt-titel', text: 'Auf anderen Kurstag' }),
    tagWahl(eintrag));
}

// Vom Kurstag aus hinzufügen. Das Blatt bleibt offen, damit man mehrere Einträge nacheinander wählen kann.
function hinzufuegenZu(tag) {
  const hinzufuegen = async (werte) => {
    if (await aufTagLegen(tag.id, werte)) hinzufuegenZu(tag);
  };

  const gruppen = new Map();
  for (const e of zustand.eintraege) {
    if (e.typ !== 'eintrag' || e.tag_id || e.gestrichen) continue;
    if (!gruppen.has(e.block)) gruppen.set(e.block, []);
    gruppen.get(e.block).push(e);
  }

  blatt(`Hinzufügen · ${kurzerTag(tag)}`, null,
    el('div', { class: 'baustein-wahl' },
      ...[['neu:pause', '☕ Pause'], ['neu:mittag', '🍽️ Mittag'], ['neu:termin', '📌 Termin']].map(([wert, text]) =>
        el('button', { type: 'button', class: 'baustein', text, onclick: () => hinzufuegen([wert]) }))),
    ...[...gruppen].flatMap(([block, liste]) => [
      el('p', { class: 'blatt-titel', text: block || 'Ohne Block' }),
      el('div', { class: 'liste' }, ...liste.map((e) => el('button', {
        type: 'button',
        class: 'karte wahl-karte',
        style: `--k:${farbe(e.emoji)}`,
        onclick: () => hinzufuegen([e.id]),
      },
      el('span', { class: 'chip', text: e.emoji }),
      el('span', { class: 'inhalt titel', text: e.titel }),
      e.dauer ? el('span', { class: 'dauer', text: `${e.dauer}'` }) : null))),
    ]),
    gruppen.size ? null : el('p', { class: 'hinweis', text: 'Alle Einträge sind eingeplant.' }),
    el('button', { type: 'button', class: 'knopf blatt-fertig', text: 'Fertig', onclick: () => $('#aktion-dialog').close() }));
}

// --- Drag & Drop -----------------------------------------------------------

function zoneAus(ziel) {
  return ziel instanceof Element ? ziel.closest('.tag, #ablauf') : null;
}

function markiere(zone) {
  if (markiert === zone) return;
  markiert?.classList.remove('drop-ziel');
  zone?.classList.add('drop-ziel');
  markiert = zone;
}

function aufraeumen() {
  platzhalter.remove();
  markiere(null);
  ziehen?.element.classList.remove('wird-gezogen');
}

document.addEventListener('dragstart', (ereignis) => {
  const quelle = ereignis.target instanceof Element ? ereignis.target.closest('[data-wert]') : null;
  if (!quelle || !zustand?.bearbeiten) return;
  ziehen = { wert: quelle.dataset.wert, typ: quelle.dataset.typ, element: quelle };
  ereignis.dataTransfer.effectAllowed = 'move';
  ereignis.dataTransfer.setData('text/plain', quelle.dataset.wert);
  requestAnimationFrame(() => quelle.classList.add('wird-gezogen'));
});

document.addEventListener('dragover', (ereignis) => {
  if (!ziehen) return;
  const zone = zoneAus(ereignis.target);
  const istNeu = ziehen.wert.startsWith('neu:');

  // Pflichttermine gehören zu einem Datum und wandern nie zurück in den Ablauf.
  if (!zone || (zone.id === 'ablauf' && (istNeu || ziehen.typ === 'termin'))) {
    platzhalter.remove();
    markiere(null);
    return;
  }

  ereignis.preventDefault();
  markiere(zone);

  if (zone.id === 'ablauf') {
    platzhalter.remove();
    return;
  }

  const liste = $('.tag-liste', zone);
  const karten = [...liste.children].filter((k) => k !== platzhalter && k !== ziehen.element);
  const davor = karten.find((k) => {
    const rechteck = k.getBoundingClientRect();
    return ereignis.clientY < rechteck.top + rechteck.height / 2;
  });
  if (davor) {
    if (platzhalter.nextElementSibling !== davor) liste.insertBefore(platzhalter, davor);
  } else if (liste.lastElementChild !== platzhalter) {
    liste.append(platzhalter);
  }
});

document.addEventListener('drop', (ereignis) => {
  if (!ziehen) return;
  const zone = zoneAus(ereignis.target);
  if (!zone) return;
  ereignis.preventDefault();

  const { wert, element } = ziehen;
  const istNeu = wert.startsWith('neu:');

  if (zone.id === 'ablauf') {
    aufraeumen();
    if (!istNeu && ziehen.typ !== 'termin' && element.closest('.tag-liste')) {
      element.remove();
      senden('zurueck', { id: Number(wert) });
    }
    return;
  }

  const liste = $('.tag-liste', zone);
  if (platzhalter.parentNode !== liste) liste.append(platzhalter);
  const reihenfolge = [...liste.children]
    .filter((k) => k !== element)
    .map((k) => (k === platzhalter ? (istNeu ? wert : Number(wert)) : Number(k.dataset.wert)));

  if (!istNeu) liste.replaceChild(element, platzhalter);
  aufraeumen();
  senden('platzieren', { tag_id: Number(liste.dataset.tagId), reihenfolge });
});

document.addEventListener('dragend', () => {
  aufraeumen();
  ziehen = null;
});

// --- Dialoge ---------------------------------------------------------------

function loeschKnopf(knopf) {
  knopf.dataset.sicher = '';
  knopf.textContent = 'Löschen';
}

function eintragDialog(eintrag, vorgaben = {}) {
  offenerEintrag = eintrag;
  const werte = eintrag ?? {
    typ: 'eintrag', emoji: '🎨', titel: '', block: '', zusatz: 0, link: '', dauer: null,
    notiz: '', tag_id: null, erledigt: 0, ...vorgaben,
  };
  const felder = $('#eintrag-form').elements;

  $('#eintrag-ueberschrift').textContent = eintrag ? 'Eintrag bearbeiten' : 'Neuer Eintrag';
  felder.emoji.value = werte.emoji;
  felder.titel.value = werte.titel;
  felder.block.value = werte.block;
  felder.zusatz.checked = Boolean(werte.zusatz);
  felder.link.value = werte.link || '';
  felder.dauer.value = werte.dauer ?? '';
  felder.notiz.value = werte.notiz || '';
  felder.tag_id.replaceChildren(
    el('option', { value: '', text: werte.typ === 'eintrag' ? 'Offen (im Ablauf)' : 'Entfernen' }),
    ...zustand.tage.map((tag) => el('option', { value: tag.id, text: tagName(tag) })));
  felder.tag_id.value = werte.tag_id ?? '';
  felder.erledigt.checked = Boolean(werte.erledigt);
  felder.erledigt.disabled = !werte.tag_id;

  $('#block-liste').replaceChildren(...[...bloecke().keys()].map((block) => el('option', { value: block })));
  for (const feld of document.querySelectorAll('#eintrag-form [data-nur-eintrag]')) feld.hidden = werte.typ !== 'eintrag';

  const loeschen = $('#eintrag-loeschen');
  loeschen.hidden = !eintrag;
  loeschKnopf(loeschen);

  $('#eintrag-dialog').showModal();
  felder.titel.focus();
}

function tagDialog(tag) {
  offenerTag = tag;
  const felder = $('#tag-form').elements;
  $('#tag-ueberschrift').textContent = tag ? 'Kurstag bearbeiten' : 'Neuer Kurstag';
  felder.datum.value = tag?.datum ?? '';
  felder.datum2.value = tag?.datum2 ?? '';
  felder.notiz.value = tag?.notiz ?? '';
  const gewaehlt = tag?.dozierende ?? [];
  $('#personen-wahl').replaceChildren(...zustand.dozierende.map((name) =>
    el('label', { class: 'person-wahl', style: `--p:${personFarbe(name)}` },
      el('input', { type: 'checkbox', name: 'dozierende', value: name, checked: gewaehlt.includes(name) }),
      el('span', { class: 'initial', 'aria-hidden': 'true', text: name[0] }),
      name)));
  const loeschen = $('#tag-loeschen');
  loeschen.hidden = !tag;
  loeschKnopf(loeschen);
  $('#tag-dialog').showModal();
}

$('#emoji-wahl').append(...[...KATEGORIEN.map(([emoji, , f]) => [emoji, f]), ...WEITERE].map(([emoji, f]) => el('button', {
  type: 'button',
  style: `--k:${f}`,
  text: emoji,
  'aria-label': `Emoji ${emoji}`,
  onclick: () => { $('#eintrag-form').elements.emoji.value = emoji; },
})));

$('#eintrag-form').elements.tag_id.addEventListener('change', (ereignis) => {
  const erledigt = $('#eintrag-form').elements.erledigt;
  erledigt.disabled = ereignis.target.value === '';
  if (erledigt.disabled) erledigt.checked = false;
});

$('#eintrag-form').addEventListener('submit', async (ereignis) => {
  ereignis.preventDefault();
  const f = ereignis.target.elements;
  const gespeichert = await senden('eintrag_speichern', {
    id: offenerEintrag?.id ?? null,
    emoji: f.emoji.value.trim(),
    titel: f.titel.value.trim(),
    block: f.block.value.trim(),
    zusatz: f.zusatz.checked,
    link: f.link.value.trim() || null,
    dauer: f.dauer.value === '' ? null : Number(f.dauer.value),
    tag_id: f.tag_id.value === '' ? null : Number(f.tag_id.value),
    erledigt: f.erledigt.checked,
    notiz: f.notiz.value.trim() || null,
  });
  if (gespeichert) $('#eintrag-dialog').close();
});

$('#tag-form').addEventListener('submit', async (ereignis) => {
  ereignis.preventDefault();
  const f = ereignis.target.elements;
  const gespeichert = await senden('tag_speichern', {
    id: offenerTag?.id ?? null,
    datum: f.datum.value,
    datum2: f.datum2.value || null,
    dozierende: [...ereignis.target.querySelectorAll('input[name="dozierende"]:checked')].map((feld) => feld.value),
    notiz: f.notiz.value.trim() || null,
  });
  if (gespeichert) $('#tag-dialog').close();
});

// Löschen braucht einen zweiten Klick, statt eines Browser-Dialogs.
for (const [knopfId, dialogId, aktion, aktuell] of [
  ['#eintrag-loeschen', '#eintrag-dialog', 'eintrag_loeschen', () => offenerEintrag],
  ['#tag-loeschen', '#tag-dialog', 'tag_loeschen', () => offenerTag],
]) {
  $(knopfId).addEventListener('click', async (ereignis) => {
    const knopf = ereignis.currentTarget;
    if (!knopf.dataset.sicher) {
      knopf.dataset.sicher = '1';
      knopf.textContent = 'Wirklich löschen?';
      return;
    }
    if (await senden(aktion, { id: aktuell().id })) $(dialogId).close();
  });
}

$('#login-form').addEventListener('submit', async (ereignis) => {
  ereignis.preventDefault();
  const feld = ereignis.target.elements.passwort;
  if (await senden('login', { passwort: feld.value })) {
    feld.value = '';
    $('#login-dialog').close();
  }
});

for (const knopf of document.querySelectorAll('[data-schliessen]')) {
  knopf.addEventListener('click', () => knopf.closest('dialog').close());
}

$('#modus').addEventListener('click', () => {
  if (zustand?.bearbeiten) senden('logout');
  else $('#login-dialog').showModal();
});

// --- Start -----------------------------------------------------------------

// Handy: unten zwischen offenem Ablauf und Stundenplan wechseln. Start ist der Stundenplan.
function ansichtSetzen(neu) {
  document.body.dataset.ansicht = neu;
  for (const knopf of document.querySelectorAll('.ansicht-leiste button')) {
    knopf.setAttribute('aria-pressed', String(knopf.dataset.ansicht === neu));
  }
}

for (const knopf of document.querySelectorAll('.ansicht-leiste button')) {
  knopf.addEventListener('click', () => {
    ansichtSetzen(knopf.dataset.ansicht);
    const oben = $('.layout').getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > oben) window.scrollTo({ top: oben - 8 });
  });
}

ansichtSetzen('tage');

// Breite Bildschirme: Die Spalte «Offen» lässt sich einklappen. Der Browser merkt sich die Wahl.
const BREIT = matchMedia('(min-width: 861px)');

function ablaufZuklappen(zu) {
  document.body.classList.toggle('ablauf-zu', zu);
  const knopf = $('#ablauf-umschalten');
  const text = zu ? 'Offen ausklappen' : 'Offen einklappen';
  knopf.setAttribute('aria-expanded', String(!zu));
  knopf.setAttribute('aria-label', text);
  knopf.title = text;
  try { localStorage.setItem('planer-ablauf-zu', zu ? '1' : ''); } catch { /* ohne Speicher gilt die Wahl nur bis zum Neuladen */ }
}

$('#ablauf-umschalten').addEventListener('click', (ereignis) => {
  ereignis.stopPropagation();
  ablaufZuklappen(!document.body.classList.contains('ablauf-zu'));
});

// Eingeklappt ist die ganze schmale Leiste ein Knopf zum Ausklappen.
$('#ablauf').addEventListener('click', () => {
  if (BREIT.matches && document.body.classList.contains('ablauf-zu')) ablaufZuklappen(false);
});

let ablaufWarZu = false;
try { ablaufWarZu = localStorage.getItem('planer-ablauf-zu') === '1'; } catch { /* kein Speicher */ }
ablaufZuklappen(ablaufWarZu);
TOUCH.addEventListener('change', () => { if (zustand) render(); });

window.addEventListener('hashchange', () => {
  if (location.hash.slice(1) === standort) return;
  standort = location.hash.slice(1);
  laden(true);
});

// Wer zurück in den Tab wechselt, sieht Änderungen anderer Dozierender.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !ziehen && !document.querySelector('dialog[open]')) laden();
});

laden(true);
