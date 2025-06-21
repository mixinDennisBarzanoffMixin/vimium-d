# Vimium-D Chrome Extension

Eine grundlegende Chrome-Extension für Vimium-ähnliche Navigation.

## 📁 Projektstruktur

```
vimium-d/
├── manifest.json          # Extension-Konfiguration
├── content.js            # Content Script (TODO: implementieren)
├── popup.html           # Popup-Benutzeroberfläche (TODO: erweitern)
├── popup.js             # Popup-Logik (TODO: implementieren)
└── README.md            # Diese Datei
```

## 🛠️ Installation

1. **Chrome öffnen** und zu `chrome://extensions/` navigieren
2. **Entwicklermodus aktivieren** (oben rechts)
3. **"Entpackte Extension laden"** klicken und den Projektordner auswählen

## 🎯 TODO: Implementieren

### content.js
- [ ] Tastatur-Event-Listener hinzufügen
- [ ] Vim-ähnliche Befehle implementieren (j, k, h, l)
- [ ] Link-Hints-System erstellen
- [ ] Scroll-Funktionen implementieren

### popup.html & popup.js
- [ ] Popup-Design erweitern
- [ ] Einstellungen hinzufügen
- [ ] Status der Extension anzeigen

## 📚 Lernressourcen

- [Chrome Extension API](https://developer.chrome.com/docs/extensions/)
- [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

## 🚀 Nächste Schritte

1. Implementieren Sie die grundlegenden Scroll-Befehle in `content.js`
2. Erweitern Sie das Popup mit nützlichen Funktionen
3. Testen Sie die Extension auf verschiedenen Webseiten
4. Fügen Sie weitere Vimium-ähnliche Funktionen hinzu 