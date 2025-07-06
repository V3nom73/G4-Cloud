# 🌟 Smart Energy Hub - Cloud Platform

Eine intelligente, herstellerunabhängige Cloud-Plattform für Smart-Home-Energiemanagement mit KI-Integration.

## 🚀 Was ist Smart Energy Hub?

Smart Energy Hub ist Ihre persönliche Energiezentrale, die alle Ihre Smart-Home-Geräte in einer übersichtlichen App vereint. Überwachen und steuern Sie Ihre Solaranlage, Batteriespeicher, Wallbox und Wärmepumpe - alles an einem Ort.

### 💡 Ihre Vorteile
- **Alles im Blick**: Live-Überwachung Ihrer gesamten Energieanlage
- **Geld sparen**: Bis zu 40% weniger Stromkosten durch intelligente Steuerung
- **Herstellerunabhängig**: Funktioniert mit Fronius, Tesla, SMA und vielen mehr
- **KI-Optimierung**: Automatische Anpassung an Ihre Gewohnheiten
- **Einfache Bedienung**: Intuitive App für Smartphone und Tablet

### 💰 Faire Preise
- **Basic (14.90 CHF/Monat)**: Monitoring und Benachrichtigungen
- **Professional (44.90 CHF/Monat)**: + Gerätesteuerung und Automatisierung
- **Enterprise (119.90 CHF/Monat)**: + KI-Optimierung und unbegrenzte Features

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI Framework**: Ant Design 5 + Pro Components
- **State Management**: Zustand
- **API Client**: Axios + React Query
- **Charts**: @ant-design/charts
- **Real-time**: Socket.io Client
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS

## 📁 Projektstruktur

```
G4-Cloud/
├── smart-energy-hub-demo/     # Next.js Demo-Anwendung
│   ├── src/
│   │   ├── app/              # App Router Pages
│   │   │   ├── page.tsx      # Landing Page
│   │   │   ├── login/        # Login Page
│   │   │   ├── admin/        # Admin Dashboard
│   │   │   └── dashboard/    # Client Dashboard
│   │   ├── components/       # Wiederverwendbare Komponenten
│   │   └── lib/             # Utilities und Helpers
│   ├── public/              # Statische Assets
│   └── package.json         # Dependencies
└── smart-energy-hub-konzept.md  # Detailliertes Konzept-Dokument
```

## 🚀 Quick Start

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn

### Installation & Start

```bash
# In das Projekt-Verzeichnis wechseln
cd smart-energy-hub-demo

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die Anwendung läuft dann auf [http://localhost:3000](http://localhost:3000)

### Demo-Zugänge

- **Admin Dashboard**: 
  - Username: `admin`
  - Password: `admin`
  
- **Client Dashboard**: 
  - Username: `user`
  - Password: `user`

## 📱 Features nach Tier

### Basic (14.90 CHF/Monat)
- ✅ Echtzeitdaten-Anzeige
- ✅ Benachrichtigungen bei Störungen
- ✅ Basis-Dashboard
- ✅ 7 Tage Historie
- ✅ Mobile App

### Professional (44.90 CHF/Monat)
- ✅ Alle Basic Features
- ✅ Gerätesteuerung
- ✅ Automatisierung (bis 20 Regeln)
- ✅ Wetterintegration
- ✅ 30 Tage Historie
- ✅ API-Zugang

### Enterprise (119.90 CHF/Monat)
- ✅ Alle Professional Features
- ✅ KI-basierte Optimierung
- ✅ Predictive Analytics
- ✅ Unbegrenzte Automatisierung
- ✅ Vollständige Historie
- ✅ Priority Support
- ✅ White-Label Option

## 🔧 Unterstützte Hardware

- **Wechselrichter**: Fronius, SMA, SolarEdge, Huawei
- **Batteriespeicher**: Tesla Powerwall, BYD, Sonnen, LG Chem
- **Wallboxen**: go-eCharger, Wallbe, ABL, Keba
- **Wärmepumpen**: Viessmann, Vaillant, Daikin
- **Smart Meter**: Verschiedene Hersteller via SML Protocol

## 🎯 Roadmap

- [x] Demo-Platform mit Ant Design
- [ ] Backend API mit Node.js/Express
- [ ] Datenbank-Integration (PostgreSQL)
- [ ] Echte Hardware-Integration
- [ ] KI-Modelle implementieren
- [ ] Mobile Apps (iOS/Android)
- [ ] White-Label Funktionalität

## 📄 Lizenz

Proprietär - Alle Rechte vorbehalten

---

**Für Investoren**: Detaillierte Informationen finden Sie im [Konzept-Dokument](./smart-energy-hub-konzept.md)