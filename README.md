# Dashboard Multi-API

Dashboard personnel agrégeant des données de plusieurs services externes (GitHub, Steam + RAWG, Spotify à venir).

## Stack

- **Frontend** : React, Vite, Tailwind CSS, React Router
- **Backend** : Node.js, Express
- **Base de données** : MariaDB
- **Authentification** : JWT + bcrypt

## Prérequis

- Node.js 18+
- MariaDB installé et lancé
- Une clé API Steam ([obtenir ici](https://steamcommunity.com/dev/apikey))
- Une clé API RAWG ([obtenir ici](https://rawg.io/apidocs))

## Installation

1. Cloner le repo :
```bash
   git clone https://github.com/MGMidas/dashboard-multi-api.git
   cd dashboard-multi-api
```

2. Installer les dépendances :
```bash
   cd client && npm install
   cd ../server && npm install
```

3. Configurer les variables d'environnement :
```bash
   cd server
   cp .env.example .env
```
   Puis remplir `.env` avec tes propres identifiants (mot de passe MariaDB, JWT_SECRET, clés API).

4. Créer la base de données :
```bash
   mysql -u root -p < docs/schema.sql
```
   (ou exécute le contenu de `docs/schema.sql` directement dans DBeaver)

5. Lancer le backend :
```bash
   cd server
   npm run dev
```

6. Lancer le frontend (dans un autre terminal) :
```bash
   cd client
   npm run dev
```

7. Ouvrir `http://localhost:5173`

## Fonctionnalités

- Authentification (inscription / connexion)
- Liaison de comptes externes (GitHub, Steam)
- Dashboard affichant repositories GitHub et bibliothèque de jeux Steam enrichie via RAWG
- Cache serveur avec fallback en cas d'indisponibilité d'une API externe