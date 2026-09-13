'use strict';

// IM3 Planer: links der offene Ablauf, rechts die Kurstage eines Standorts.

const LEGENDE = [
  ['📕', 'Theorie'], ['🧑‍🏫', 'Code-Along'], ['💻', 'Digitale Übung'], ['📝', 'Analoge Übung'],
  ['🛠️', 'Tooling'], ['🎨', 'Projektarbeit'], ['🃏', 'Story-Karten'], ['✅', 'Meilenstein'],
];
const EMOJIS = [...LEGENDE.map(([emoji]) => emoji), '🎲', '☕', '🍽️', '⭐', '❗', '🎤'];

const $ = (selektor, wurzel = document) => wurzel.querySelector(selektor);

let zustand = null;
let standort = location.hash.slice(1);
let ziehen = null;
let markiert = null;
let offenerEintrag = null;
let offenerTag = null;

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

function kalenderwoche(datum) {
  const d = new Date(Date.UTC(datum.getFullYear(), datum.getMonth(), datum.getDate()));
  const wochentag = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - wochentag);
  const jahresanfang = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return { jahr: d.getUTCFullYear(), woche: Math.ceil(((d - jahresanfang) / 86400000 + 1) / 7) };
}

function datumText(datum) {
  return datum.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function tagName(tag) {
  const datum = datumAus(tag.datum);
  return `${datum.toLocaleDateString('de-CH', { weekday: 'short' })} ${datumText(datum)}`;
}

function dauerText(minuten) {
  if (minuten < 60) return `${minuten}'`;
  const rest = minuten % 60;
  return `${Math.floor(minuten / 60)} h${rest ? ` ${rest}'` : ''}`;
}

let meldungTimer = null;
function meldung(text, istFehler = false) {
  const box = $('#meldung');
  box.textContent = text;
  box.classList.toggle('fehler', istFehler);
  box.hidden = false;
  clearTimeout(meldungTimer);
  meldungTimer = setTimeout(() => { box.hidden = true; }, istFehler ? 5000 : 1800);
}

// --- Server ----------------------------------------------------------------

async function laden() {
  try {
    const antwort = await fetch(`api.php?standort=${encodeURIComponent(standort)}`, { cache: 'no-store' });
    const daten = await antwort.json();
    if (!antwort.ok) throw new Error(daten.fehler || antwort.statusText);
    zustand = daten;
    render();
  } catch (fehler) {
    meldung(`Laden fehlgeschlagen: ${fehler.message}`, true);
  }
}

async function senden(aktion, daten = {}) {
  meldung('Speichert …');
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

function render() {
  standort = zustand.standort;
  if (location.hash.slice(1) !== standort) history.replaceState(null, '', `#${standort}`);
  document.title = `IM3 Planer · ${zustand.standorte[standort]}`;
  document.body.classList.toggle('bearbeiten', zustand.bearbeiten);
  $('#modus').textContent = zustand.bearbeiten ? 'Bearbeiten beenden' : 'Bearbeiten';

  renderTabs();
  renderFortschritt();
  renderAblauf();
  renderTage();
}

function renderTabs() {
  $('#tabs').replaceChildren(...Object.entries(zustand.standorte).map(([slug, name]) =>
    el('a', { class: 'tab', href: `#${slug}`, 'aria-current': slug === standort ? 'page' : null, text: name })));
}

function renderFortschritt() {
  const eintraege = zustand.eintraege.filter((e) => e.typ === 'eintrag');
  const erledigt = eintraege.filter((e) => e.erledigt).length;
  const geplant = eintraege.filter((e) => e.tag_id && !e.erledigt).length;
  const offen = eintraege.length - erledigt - geplant;
  const anteil = (zahl) => `${eintraege.length ? (zahl / eintraege.length) * 100 : 0}%`;

  $('#fortschritt').replaceChildren(
    el('div', { class: 'balken', 'aria-hidden': 'true' },
      el('span', { class: 'erledigt', style: `width:${anteil(erledigt)}` }),
      el('span', { class: 'geplant', style: `width:${anteil(geplant)}` })),
    el('div', { class: 'fortschritt-text' },
      el('b', { text: erledigt }), ' erledigt · ',
      el('b', { text: geplant }), ' geplant · ',
      el('b', { text: offen }), ` offen von ${eintraege.length}`));
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
  $('#legende').replaceChildren(...LEGENDE.map(([emoji, name]) => el('span', { text: `${emoji} ${name}` })));

  const teile = [];
  if (zustand.bearbeiten) {
    teile.push(el('div', { class: 'palette' },
      el('span', { text: 'Ziehen:' }),
      el('span', { class: 'baustein', draggable: 'true', 'data-wert': 'neu:pause', text: '☕ Pause' }),
      el('span', { class: 'baustein', draggable: 'true', 'data-wert': 'neu:mittag', text: '🍽️ Mittag' }),
      el('span', { class: 'luecke' }),
      el('button', { class: 'knopf-leise', type: 'button', text: '+ Eintrag', onclick: () => eintragDialog(null) })));
  }

  for (const [block, alle] of bloecke()) {
    const offen = alle.filter((e) => !e.tag_id);
    const kern = offen.filter((e) => !e.zusatz);
    const zusatz = offen.filter((e) => e.zusatz);
    teile.push(el('section', { class: 'block' },
      el('header', { class: 'block-kopf' },
        el('h3', { text: block || 'Ohne Block' }),
        el('span', { class: 'zahl', text: offen.length ? `${offen.length} offen` : 'alles eingeplant' })),
      kern.length ? el('ul', { class: 'liste' }, ...kern.map((e) => karte(e))) : null,
      zusatz.length ? el('p', { class: 'zusatz-titel', text: 'Zusatzmaterial' }) : null,
      zusatz.length ? el('ul', { class: 'liste' }, ...zusatz.map((e) => karte(e))) : null,
      zustand.bearbeiten
        ? el('button', { class: 'knopf-leise', type: 'button', text: '+ Eintrag', onclick: () => eintragDialog(null, { block }) })
        : null));
  }

  $('#ablauf-inhalt').replaceChildren(...teile);
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

  const wochen = new Map();
  for (const tag of zustand.tage) {
    const datum = datumAus(tag.datum);
    const { jahr, woche } = kalenderwoche(datum);
    const schluessel = `${jahr}-${woche}`;
    if (!wochen.has(schluessel)) wochen.set(schluessel, { woche, tage: [] });

    const liste = (proTag.get(tag.id) || []).sort((a, b) => a.tag_pos - b.tag_pos || a.id - b.id);
    const inhalte = liste.filter((e) => e.typ === 'eintrag');
    const minuten = liste.reduce((summe, e) => summe + (e.dauer || 0), 0);
    const info = [
      minuten ? dauerText(minuten) : null,
      inhalte.length ? `${inhalte.filter((e) => e.erledigt).length}/${inhalte.length} ✓` : null,
    ].filter(Boolean).join(' · ');

    wochen.get(schluessel).tage.push(el('article', { class: `tag${+datum === +heute ? ' heute' : ''}` },
      el('header', { class: 'tag-kopf' },
        el('h3', {},
          el('span', { text: datum.toLocaleDateString('de-CH', { weekday: 'long' }) }), ' ',
          el('span', { class: 'datum', text: datumText(datum) })),
        el('span', { class: 'tag-info', text: info }),
        zustand.bearbeiten
          ? el('button', { class: 'knopf-icon', type: 'button', title: 'Kurstag bearbeiten', 'aria-label': 'Kurstag bearbeiten', text: '✎', onclick: () => tagDialog(tag) })
          : null),
      tag.notiz ? el('p', { class: 'tag-notiz', text: tag.notiz }) : null,
      el('ul', {
        class: 'liste tag-liste',
        'data-tag-id': tag.id,
        'data-leer': zustand.bearbeiten ? 'Einträge hierher ziehen' : 'Noch nichts geplant',
      }, ...liste.map((e) => karte(e, true)))));
  }

  $('#tage-inhalt').replaceChildren(
    ...[...wochen.values()].map(({ woche, tage }) =>
      el('section', { class: 'kw' }, el('h3', { class: 'kw-titel', text: `KW ${woche}` }), el('div', { class: 'kw-tage' }, ...tage))),
    zustand.bearbeiten ? el('button', { class: 'knopf-leise', type: 'button', text: '+ Kurstag', onclick: () => tagDialog(null) }) : null);
}

function karte(eintrag, aufTag = false) {
  const istPause = eintrag.typ !== 'eintrag';
  const klassen = ['karte', istPause && 'pause', eintrag.erledigt && 'erledigt', eintrag.emoji === '✅' && 'meilenstein'];
  const link = /^https?:\/\//i.test(eintrag.link || '') ? eintrag.link : null;

  return el('li', {
    class: klassen.filter(Boolean).join(' '),
    'data-wert': eintrag.id,
    draggable: zustand.bearbeiten ? 'true' : null,
    onclick: (ereignis) => {
      if (!zustand.bearbeiten || ereignis.target.closest('input, a')) return;
      eintragDialog(eintrag);
    },
  },
  aufTag && !istPause
    ? el('input', {
      type: 'checkbox',
      class: 'haken',
      checked: Boolean(eintrag.erledigt),
      disabled: !zustand.bearbeiten,
      'aria-label': `${eintrag.titel} erledigt`,
      onchange: (ereignis) => senden('abhaken', { id: eintrag.id, erledigt: ereignis.target.checked }),
    })
    : null,
  el('span', { class: 'emoji', 'aria-hidden': 'true', text: eintrag.emoji }),
  el('div', { class: 'inhalt' },
    el('span', { class: 'titel', text: eintrag.titel }),
    link ? el('a', { class: 'link', href: link, target: '_blank', rel: 'noopener', draggable: 'false', title: 'Material öffnen', text: '↗' }) : null,
    eintrag.notiz ? el('p', { class: 'notiz', text: eintrag.notiz }) : null),
  eintrag.dauer ? el('span', { class: 'dauer', text: `${eintrag.dauer}'` }) : null);
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
  ziehen = { wert: quelle.dataset.wert, element: quelle };
  ereignis.dataTransfer.effectAllowed = 'move';
  ereignis.dataTransfer.setData('text/plain', quelle.dataset.wert);
  requestAnimationFrame(() => quelle.classList.add('wird-gezogen'));
});

document.addEventListener('dragover', (ereignis) => {
  if (!ziehen) return;
  const zone = zoneAus(ereignis.target);
  const istNeu = ziehen.wert.startsWith('neu:');

  if (!zone || (zone.id === 'ablauf' && istNeu)) {
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
    if (!istNeu && element.closest('.tag-liste')) {
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
  felder.notiz.value = tag?.notiz ?? '';
  const loeschen = $('#tag-loeschen');
  loeschen.hidden = !tag;
  loeschKnopf(loeschen);
  $('#tag-dialog').showModal();
}

$('#emoji-wahl').append(...EMOJIS.map((emoji) => el('button', {
  type: 'button',
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

window.addEventListener('hashchange', () => {
  if (location.hash.slice(1) === standort) return;
  standort = location.hash.slice(1);
  laden();
});

// Wer zurück in den Tab wechselt, sieht Änderungen anderer Dozierender.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !ziehen && !document.querySelector('dialog[open]')) laden();
});

new ResizeObserver(([eintrag]) => {
  document.documentElement.style.setProperty('--kopf-hoehe', `${eintrag.target.offsetHeight}px`);
}).observe($('.kopf'));

laden();
