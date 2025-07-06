# 🚀 Smart Energy Hub Demo

Eine moderne Cloud-Plattform zur intelligenten Steuerung von Energiesystemen im Haushalt. Entwickelt mit Next.js 15, React 18, TypeScript und Ant Design.

![Smart Energy Hub](https://img.shields.io/badge/version-1.0.0-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.26.3-red)

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

## 🚀 Quick Start

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn
- Git

### Installation

```bash
# Repository klonen
git clone https://github.com/yourusername/smart-energy-hub-demo.git
cd smart-energy-hub-demo

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die App läuft nun auf [http://localhost:3000](http://localhost:3000)

### Demo-Zugänge

#### Admin Dashboard
- **Username**: admin
- **Password**: admin
- **Features**: Vollzugriff auf Admin-Panel + Enterprise User Features

#### User Dashboard
- **Username**: user
- **Password**: user
- **Features**: Professional Tier Features

## 🏗️ Projektstruktur

```
smart-energy-hub-demo/
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── (auth)/            # Auth-geschützte Routen
│   │   ├── admin/             # Admin Dashboard
│   │   ├── dashboard/         # User Dashboard
│   │   ├── login/             # Login Page
│   │   └── page.tsx           # Landing Page
│   ├── components/            # React Komponenten
│   ├── contexts/              # React Contexts
│   ├── hooks/                 # Custom Hooks
│   ├── lib/                   # Utility Functions
│   ├── services/              # API Services
│   ├── store/                 # Zustand Store
│   └── types/                 # TypeScript Types
├── public/                    # Statische Assets
└── package.json              # Dependencies
```

## 🛠️ Technologie-Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: Ant Design 5
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Zustand
- **API Client**: Axios
- **Animationen**: Framer Motion
- **Charts**: Ant Design Charts

### Entwicklung
- **Sprache**: TypeScript 5
- **Linting**: ESLint
- **Formatting**: Prettier (empfohlen)
- **Package Manager**: npm/yarn

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
- ✅ Live-Monitoring
- ✅ Alarme & Benachrichtigungen
- ✅ 7 Tage Historie
- ✅ Basis-Statistiken

### Professional (44.90 CHF/Monat)
- ✅ Alles aus Basic
- ✅ Gerätesteuerung
- ✅ 20 Automatisierungen
- ✅ 30 Tage Historie
- ✅ Wetterbasierte Optimierung

### Enterprise (119.90 CHF/Monat)
- ✅ Alles aus Professional
- ✅ KI-Optimierung
- ✅ Unbegrenzte Features
- ✅ Persönlicher Support
- ✅ Erweiterte Analytics

## 🐛 Bekannte Probleme

- Chart-Komponenten zeigen TypeScript-Warnungen (funktioniert trotzdem)
- WebSocket-Verbindung ist noch Mock-Implementierung
- Einige API-Endpoints sind noch nicht mit echtem Backend verbunden

## 🤝 Contributing

Beiträge sind willkommen! Bitte erstellen Sie einen Fork und senden Sie einen Pull Request.

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## 🙏 Credits

Entwickelt für die Smart Energy Hub Plattform - Ihre Energie. Intelligent gesteuert.

---

**Hinweis**: Dies ist eine Demo-Version. Für die Produktionsversion kontaktieren Sie bitte das Entwicklungsteam.
