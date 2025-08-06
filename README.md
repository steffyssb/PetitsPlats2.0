# PetitsPlats2.0
P7 JS 2.0 Les petits plats
# Les Petits Plats - Moteur de recherche performant

## Présentation du projet

Ce projet a été réalisé dans le cadre d'une mission freelance pour l'entreprise **Les Petits Plats**, dans le but de développer un site de recettes avec un **moteur de recherche rapide et efficace**, inspiré de Marmiton ou 750g.

L’objectif principal était d’implémenter une fonctionnalité de recherche performante, tout en respectant les maquettes Figma fournies, les bonnes pratiques de développement, ainsi que la conformité W3C.

---

## Fonctionnalités principales

- Barre de recherche principale (active après 3 caractères)
- Filtres dynamiques par **ingrédients**, **appareils**, **ustensiles**
- Affichage en temps réel des recettes filtrées
- Système de **tags cliquables** avec suppression individuelle
- Highlight des options filtrées
- Accessibilité UX (icônes d’effacement, navigation fluide)
- **Deux versions** du moteur de recherche implémentées :
  - Une version **boucles classiques** (`loop-search.js`)
  - Une version **programmation fonctionnelle** (utilisée dans le projet final)

---

## Arborescence du projet

📁 les-petits-plats/
├── index.html
├── style.css
├── render.js
├── search.js
├── loop-search.js # Version alternative pour la fiche d’investigation
├── data/
│ └── recipes.js # Fichier JSON avec 50 recettes
├── assets/ # Images des recettes
├── diagrams/ # Algorigrammes réalisés sur draw.io
└── fiche-investigation.pdf
---

## Lancer le projet

1. Cloner ou télécharger ce dépôt.
2. Ouvrir le fichier `index.html` dans votre navigateur.
3. Aucun serveur nécessaire (100% client-side).

---

## Comparaison des algorithmes

Une **fiche d’investigation de fonctionnalité** est incluse dans le projet (`fiche-investigation.pdf`) avec :

- Une analyse des deux versions du moteur de recherche
- Diagrammes explicatifs
- Tests de performance réalisés avec [jsben.ch](https://jsben.ch)
- Recommandation finale basée sur la lisibilité et les performances

---

## Stack technique

- HTML5 / CSS3
- JavaScript Vanilla (pas de framework JS)
- Responsive et design respecté selon Figma
- Bonne pratique : Green code, composants modulaires, sécurité (protection contre injection HTML)

---
##  Structure des branches

Ce dépôt contient plusieurs branches, chacune correspondant à une version spécifique du moteur de recherche :

- `main` → Branche principale contenant la version finale du site en production (celle utilisée par GitHub Pages)
- `functional` → Version utilisant une approche fonctionnelle (avec `.filter()`, `.some()`, etc.) pour le moteur de recherche
- `loopversion` → Version procédurale utilisant uniquement des boucles `for` et sans méthodes fonctionnelles, conformément aux critères de validation

Chaque branche est indépendante pour permettre la comparaison des performances et des logiques de recherche.


## Auteur

Projet réalisé par steffy suma babu - Développeur Front-End freelance.
