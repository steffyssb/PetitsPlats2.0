# Les Petits Plats — Moteur de Recherche Haute Performance

Ce projet est réalisé dans le cadre d’un défi de développement front-end. L'objectif est de construire un **site de recettes** performant pour "Les Petits Plats", incluant un **moteur de recherche personnalisé** développé entièrement en JavaScript (sans bibliothèques externes).

## 🎯 Objectif du projet

Développer un moteur de recherche capable de :
- Rechercher parmi les recettes (nom, description, ingrédients)
- Filtrer les recettes à l’aide de tags (ingrédients, appareils, ustensiles)
- Gérer des volumes de données importants (jusqu’à plusieurs milliers de recettes)

---

## 🌐 Démo en ligne

👉 Voir le site en ligne : [Les Petits Plats](https://steffyssb.github.io/PetitsPlats2.0/)

---

## 🔍 Algorithmes de recherche

Ce projet contient **deux implémentations distinctes** du moteur de recherche :

| Branche GitHub | Description |
|----------------|-------------|
| [`main`](https://github.com/Steffyssb/PetitsPlats2.0/tree/main) | Contient la version **fonctionnelle** utilisant `filter`, `some`, etc. — claire et performante |
| [`loopversion`](https://github.com/Steffyssb/PetitsPlats2.0/tree/loopversion) | Contient une version **avec boucles `for`** — plus traditionnelle |

### 🔁 Tester les deux versions
- Sur GitHub, sélectionne la branche souhaitée dans le menu déroulant.
- Le HTML et le style sont identiques ; seule la logique de recherche change.

---

## 🛠️ Technologies utilisées

- HTML5 / CSS3
- JavaScript (ES6+)
- Aucune bibliothèque externe (100% JavaScript natif)
- Figma (pour suivre la maquette)
- jsben.ch (comparaison de performances)

---

## 📁 Structure du projet
📂 PetitsPlats2.0/
├── 📄 index.html
├── 📁 scripts/
│ ├── render.js # Rendu visuel des recettes
│ ├── search.js # Version fonctionnelle (branche main)
│ ├── loop.js # Version boucle (branche loopversion)
├── 📁 styles/
│ └── style.css # Feuille de style principale
├── 📁 assets/ # Images et icônes
└── 📄 README.md # Ce fichier de documentation


---

## 🌱 Branches disponibles

Pour changer de version :
1. Va sur la page du dépôt GitHub
2. Utilise le menu déroulant des branches :
   - `main` pour la version fonctionnelle
   - `loopversion` pour la version boucle

Ou bien, en ligne de commande :

```bash
git clone https://github.com/Steffyssb/PetitsPlats2.0.git
cd PetitsPlats2.0
git checkout loopversion   # ou git checkout main



