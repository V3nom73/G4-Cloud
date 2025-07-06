# 🌟 Smart Energy Hub - Cloud Platform

Eine intelligente, herstellerunabhängige Cloud-Plattform für Smart-Home-Energiemanagement mit KI-Integration.

![Smart Energy Hub](https://img.shields.io/badge/version-1.0.0-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.26.3-red)

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

## 🌟 Features

### Für Endnutzer
- **Echtzeit-Energiefluss-Visualisierung**: Sehen Sie live, wie Ihre Energie fließt
- **Gerätesteuerung**: Steuern Sie Wallbox, Wärmepumpe und mehr
- **Automatisierungen**: Erstellen Sie intelligente Regeln
- **KI-Optimierung** (Enterprise): Maximale Einsparungen durch Machine Learning
- **Multi-Tier System**: Basic (14.90 CHF), Professional (44.90 CHF), Enterprise (119.90 CHF)

### Für Administratoren
- **Kunden-Management**: Verwalten Sie alle Kunden zentral
- **Hardware-Konfiguration**: Einfache Geräte-Integration
- **Auto-Discovery**: Automatische Geräteerkennung
- **Revenue-Analytics**: Umsatz- und Wachstumsmetriken
- **Support-System**: Integriertes Ticket-Management

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI Framework**: Ant Design 5 + Pro Components
- **State Management**: Zustand
- **API Client**: Axios + React Query
- **Charts**: @ant-design/charts
- **Real-time**: Socket.io Client
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS

## 🚀 Quick Start

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn
- Git

### Installation & Start

```bash
# Repository klonen
git clone https://github.com/yourusername/smart-energy-hub-demo.git
cd G4-Cloud

# In das Demo-Verzeichnis wechseln
cd smart-energy-hub-demo

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die Anwendung läuft dann auf [http://localhost:3000](http://localhost:3000)

### Demo-Zugänge

#### Admin Dashboard
- **Username**: admin
- **Password**: admin
- **Features**: Vollzugriff auf Admin-Panel + Enterprise User Features

#### User Dashboard
- **Username**: user
- **Password**: user
- **Features**: Professional Tier Features

## 📁 Projektstruktur

```
G4-Cloud/
├── smart-energy-hub-demo/     # Next.js Demo-Anwendung
│   ├── src/
│   │   ├── app/              # App Router Pages
│   │   │   ├── (auth)/       # Auth-geschützte Routen
│   │   │   ├── page.tsx      # Landing Page
│   │   │   ├── login/        # Login Page
│   │   │   ├── admin/        # Admin Dashboard
│   │   │   └── dashboard/    # Client Dashboard
│   │   ├── components/       # React Komponenten
│   │   ├── contexts/         # React Contexts
│   │   ├── hooks/           # Custom Hooks
│   │   ├── lib/             # Utility Functions
│   │   ├── services/        # API Services
│   │   ├── store/           # Zustand Store
│   │   └── types/           # TypeScript Types
│   ├── public/              # Statische Assets
│   └── package.json         # Dependencies
├── smart-energy-hub-konzept.md  # Detailliertes Konzept-Dokument
└── README.md                # Diese Datei
```

## 🎨 Design-System

### Farben
- **Primary**: #52c41a (Grün)
- **Secondary**: #1890ff (Blau)
- **Success**: #52c41a
- **Warning**: #faad14
- **Error**: #f5222d

### Komponenten
- Glassmorphism-Effekte
- Smooth Animations
- Responsive Design
- Dark Mode vorbereitet

## 📱 Responsive Design

Die App ist vollständig responsive und optimiert für:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (320px+)

## 🔒 Sicherheit

- JWT-basierte Authentifizierung
- Role-Based Access Control (RBAC)
- Sichere API-Kommunikation
- Session-Management

## 🌍 Internationalisierung

- Deutsche Sprache als Standard
- Vorbereitet für Mehrsprachigkeit
- Locale-spezifische Formatierung (CHF)

## 📊 Features nach Tier

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

## 🐛 Bekannte Probleme

- Chart-Komponenten zeigen TypeScript-Warnungen (funktioniert trotzdem)
- WebSocket-Verbindung ist noch Mock-Implementierung
- Einige API-Endpoints sind noch nicht mit echtem Backend verbunden

## 🎯 Roadmap

- [x] Demo-Platform mit Ant Design
- [ ] Backend API mit Node.js/Express
- [ ] Datenbank-Integration (PostgreSQL)
- [ ] Echte Hardware-Integration
- [ ] KI-Modelle implementieren
- [ ] Mobile Apps (iOS/Android)
- [ ] White-Label Funktionalität

## 🤝 Contributing

Beiträge sind willkommen! Bitte erstellen Sie einen Fork und senden Sie einen Pull Request.

## 📄 Lizenz

Proprietär - Alle Rechte vorbehalten

---

**Für Investoren**: Detaillierte Informationen finden Sie im [Konzept-Dokument](./smart-energy-hub-konzept.md)

**Hinweis**: Dies ist eine Demo-Version. Für die Produktionsversion kontaktieren Sie bitte das Entwicklungsteam.