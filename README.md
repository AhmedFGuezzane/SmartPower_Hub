# ⚡ SmartPower Hub

SmartPower Hub est une application web moderne dédiée à la **gestion centralisée d'appareils électriques**. Elle permet d’ajouter, consulter, modifier et supprimer des appareils tout en visualisant leurs données de consommation énergétique.

---

## 🚀 Démo rapide

- Interface React moderne (clair/sombre)
- Visualisation des consommations (kWh, Watts)
- Recherche dynamique des appareils
- API REST complète (CRUD)
- Base de données MongoDB

---

## 📁 Structure du projet

SmartPower-Hub/ 
├── client
  / # Frontend React + TailwindCSS 
├── server
  / # Backend Node.js + Express + MongoDB 
├── docs/ # Documentation du projet 
  │ └── Rapport_Technique_SmartPower_Hub.docx 
  ├── README.md 
├── package.json # Contient le script de démarrage global 
└── .gitignore

yaml
Copy
Edit

---

## 🛠️ Technologies utilisées

- **Frontend** : React, TailwindCSS, React Router
- **Backend** : Node.js, Express.js, Mongoose
- **Base de données** : MongoDB (MongoDB Atlas ou local)
- **Dev tools** : Vite, concurrently, MongoDB Compass

---

## ▶️ Lancer le projet

> Exécute cette commande depuis la racine du projet :

```bash
npm run dev

---

##🔌 API REST
GET /api/devices : liste des appareils

GET /api/devices/:id : détails d’un appareil

POST /api/devices : création d’un appareil

PUT /api/devices/:id : modification

DELETE /api/devices/:id : suppression

##📄 Rapport technique
Consulte le document docs/Rapport_Technique_SmartPower_Hub.docx pour plus de détails sur :

L’architecture Express.js

La structure MongoDB/Mongoose

Les composants React et leurs rôles

Les suggestions d’amélioration future

##💡 À venir
Authentification JWT

Dashboard graphique

Export des données (CSV, PDF)

Interface admin avec filtres avancés

##👤 Auteur
Ahmed-Fateh Guezzane
Projet réalisé dans le cadre du cours 420-A17-BB

##📷 Aperçu (à ajouter)
