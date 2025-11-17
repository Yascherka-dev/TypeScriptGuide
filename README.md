# Guide TypeScript - Application Interactive

Une application web interactive pour apprendre TypeScript avec des exemples de code exécutables dans des sandbox.

## 🚀 Fonctionnalités

- **Sandbox interactifs** : Chaque concept TypeScript dispose d'un sandbox avec le code source
- **Exécution de code** : Exécutez les exemples de code et voyez les résultats en temps réel
- **Logs détaillés** : Affichage des logs avec coloration syntaxique
- **Syntax highlighting** : Mise en évidence du code TypeScript
- **Interface moderne** : Design sombre et responsive

## 📋 Prérequis

- Node.js >= 20.0.0 < 25.0.0
- npm ou yarn

## 🛠️ Installation

```bash
# Installer les dépendances
npm install
```

## 🏃 Développement

```bash
# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🏗️ Build pour la production

```bash
# Construire l'application
npm run build

# Prévisualiser la build de production
npm run preview
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 📦 Déploiement

### Vercel

1. Installez Vercel CLI : `npm i -g vercel`
2. Déployez : `vercel`
3. Suivez les instructions

### Netlify

1. Installez Netlify CLI : `npm i -g netlify-cli`
2. Déployez : `netlify deploy --prod`
3. Configurez le build command : `npm run build`
4. Configurez le publish directory : `dist`

### GitHub Pages

1. Ajoutez dans `vite.config.ts` :
```typescript
export default defineConfig({
  base: '/votre-repo-name/',
  // ...
})
```

2. Créez un workflow GitHub Actions (`.github/workflows/deploy.yml`) :
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Autres plateformes

L'application génère des fichiers statiques dans `dist/` qui peuvent être servis par n'importe quel serveur web statique.

## 🧪 Tests

```bash
# Exécuter les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec UI
npm run test:ui

# Coverage
npm run coverage
```

## 📝 Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser la build de production
- `npm test` - Exécuter les tests
- `npm run test:watch` - Tests en mode watch
- `npm run lint` - Linter le code
- `npm run lint:fix` - Corriger automatiquement les erreurs de linting
- `npm run format` - Formater le code
- `npm run typecheck` - Vérifier les types TypeScript
- `npm run verify` - Exécuter tous les checks (typecheck, lint, test)

## 📁 Structure du projet

```
stack-ts/
├── src/
│   ├── cours-ts/          # Fichiers de cours TypeScript
│   │   ├── inference.ts
│   │   ├── generic.ts
│   │   └── ...
│   ├── lib/
│   │   ├── sandbox.ts     # Système de sandbox
│   │   └── utils.ts
│   ├── main.ts            # Point d'entrée de l'application
│   └── style.css          # Styles CSS
├── test/                  # Tests
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Concepts couverts

- Inférence de Type
- Fonctions Génériques
- Void et Never
- Enums
- Types d'Objets
- Dictionnaires
- Fonctions
- Types Utilitaires
- Readonly
- Pick et Omit

## 🔧 Technologies utilisées

- **TypeScript** - Langage de programmation
- **Vite** - Build tool et serveur de développement
- **Vitest** - Framework de tests
- **ESLint** - Linter
- **Prettier** - Formateur de code

## 📄 Licence

Ce projet est un projet éducatif.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Contact

Pour toute question, n'hésitez pas à ouvrir une issue sur GitHub.

# TypeScriptGuide
# TypeScriptGuide
# TypeScriptGuide
