# Lösungen Chart-Werkstatt

Jede Karte hat eine vollständige Lösung als eigene Datei. Zum Ausprobieren den
Inhalt in `start/script.js` kopieren und die Seite neu laden. Karte 11 braucht
zusätzlich zwei Knöpfe im HTML und hat deshalb eine eigene Seite
`karte-11.html`.

Alle Zielbilder auf den Karten sind Screenshots genau dieser Dateien.

| Karte | Datei | Was sich gegenüber dem Start ändert |
| --- | --- | --- |
| 1 Linie statt Balken | [`karte-01.js`](karte-01.js) | `type: 'line'` |
| 2 Eine andere Stadt | [`karte-02.js`](karte-02.js) | `?city=Zürich` in der URL und im `label` |
| 3 Eine eigene Farbe | [`karte-03.js`](karte-03.js) | `backgroundColor: '#b5723a'` im Dataset |
| 4 Titel statt Legende | [`karte-04.js`](karte-04.js) | `options.plugins.title` und `options.plugins.legend.display: false` |
| 5 Achsen beschriften | [`karte-05.js`](karte-05.js) | `options.scales.x.title` und `options.scales.y.title` |
| 6 Nur ab 1980 | [`karte-06.js`](karte-06.js) | `rows.filter((row) => row.year >= 1980)` vor den beiden `map()` |
| 7 Heisse Sommer hervorheben | [`karte-07.js`](karte-07.js) | `backgroundColor` als Liste: `data.map((wert) => (wert >= 10 ? … : …))` |
| 8 Tooltip mit Einheit | [`karte-08.js`](karte-08.js) | `options.plugins.tooltip.callbacks.label` gibt `` `${context.parsed.y} Hitzetage` `` zurück |
| 9 Die zehn heissesten Sommer | [`karte-09.js`](karte-09.js) | `[...rows].sort(…).slice(0, 10)` und `indexAxis: 'y'` |
| 10 Zwei Städte | [`karte-10.js`](karte-10.js) | URL ohne `?city`, zweimal `filter()`, zwei Datasets |
| 11 Per Knopf wechseln | [`karte-11.js`](karte-11.js) + [`karte-11.html`](karte-11.html) | Chart einmal erzeugen, danach `chart.data` ändern und `chart.update()` |

## Die Lügen-Karte

Hier gibt es keine einzelne Lösung. Diese Tricks tauchen erfahrungsgemäss auf
und lassen sich in der Galerie benennen:

| Trick | Code | Was er bewirkt |
| --- | --- | --- |
| Abgeschnittene Achse | `scales: { y: { min: 8 } }` | Kleine Unterschiede wirken riesig |
| Rosinenpicken | `filter()` auf wenige, passende Jahre | Ein Trend entsteht, der in den ganzen Daten nicht da ist |
| Falscher Diagrammtyp | `type: 'pie'` | Jahre werden zu «Anteilen an einem Ganzen» – sinnlos |
| Gestauchte oder gestreckte Fläche | feste Höhe im CSS, `maintainAspectRatio: false` | Der Anstieg wirkt steiler oder flacher |
| Umgedrehte Achse | `scales: { y: { reverse: true } }` | Mehr Hitzetage sehen aus wie weniger |
| Logarithmische Achse ohne Hinweis | `scales: { y: { type: 'logarithmic' } }` | Die Sommer ohne Hitzetage verschwinden, 2026 wirkt weniger extrem |
| Suggestiver Titel | `title: { text: 'Bern glüht!' }` | Der Titel behauptet mehr, als die Daten zeigen |
| Farbe als Wertung | alle Balken rot | Alarm, obwohl die meisten Sommer null Hitzetage haben |

Die Frage für die Galerie lautet jedes Mal: **Ist die Grafik falsch – oder nur
irreführend?** Fast immer ist sie technisch korrekt. Genau deshalb sind die
Entscheidungen in `type` und `options` journalistische Entscheidungen.
