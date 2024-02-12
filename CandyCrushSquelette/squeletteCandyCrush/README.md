# Candy Crush - Rapport de Projet

## Introduction
Le projet Candy Crush est une implémentation d'un jeu où le joueur doit aligner des cookies de même type pour les faire disparaître et marquer des points. Ce rapport vise à documenter le travail réalisé, les fonctionnalités implémentées, ainsi que les difficultés rencontrées lors du développement.

## Fonctionnalités Implémentées

### 1. Grille de Cookies
- Mise en place d'une grille de cookies.
- Génération aléatoire des cookies au démarrage du jeu.

### 2. Sélection et Échange de Cookies
- Le joueur peut sélectionner deux cookies adjacents pour les échanger de position.
- Les cookies sont échangés si cela crée un alignement de trois cookies ou plus.

### 3. Détection des Alignements
- Le jeu détecte automatiquement les alignements de trois cookies ou plus horizontalement et verticalement.
- Les alignements sont supprimés de la grille après détection.

### 4. Comptage du Score, du Nombre de Coups et du Nombre d'Alignements
- Le jeu maintient un score qui est incrémenté à chaque alignement supprimé.
- Le nombre de coups réalisés est incrémenté à chaque action du joueur, que ce soit en click ou drag and drop.
- Le nombre total d'alignements supprimés est également comptabilisé et affiché.

### 5. Chute des Cookies
- Après la suppression des alignements, les cookies restants tombent vers le bas pour remplir les espaces vides (dans la théorie).

## Difficultés Rencontrées

### 1. Implémentation de la Chute des Cookies
- L'implémentation de la chute des cookies après la suppression des alignements a été une des tâches les plus complexes du projet. Malheureusement, malgré plusieurs tentatives, je n'ai pas réussi à mettre en œuvre cette fonctionnalité de manière satisfaisante.

#### Défis Rencontrés :
- Concevoir un algorithme capable de déplacer les cookies vers le bas tout en remplissant les cases vides a été une tâche complexe. Les cookies devaient être déplacés de manière à maintenir l'ordre des colonnes et à ne pas créer de nouveaux alignements involontaires.

- Assurer que les cookies tombent uniquement dans les cases vides et ne créent pas de chevauchement a été un défi supplémentaire. Il était nécessaire de déterminer les conditions dans lesquelles un cookie devait être déplacé vers le bas ou rester à sa position actuelle.

#### Solutions Envisagées :
- J'ai exploré plusieurs approches algorithmiques pour résoudre ce problème, y compris l'utilisation de récursivité et de boucles imbriquées pour parcourir la grille de cookies.

- J'ai effectué de nombreux tests pour vérifier le bon fonctionnement de l'algorithme de chute des cookies. Cependant, malgré mes efforts, je n'ai pas pu parvenir à une solution fonctionnelle dans les délais impartis. Je soupçonne mon code d'être un peu diabétique sur les bords, ce qui expliquerai de manière totalement rationnelle l'impossibilité pour moi de parvenir à implémenter cette fonction.

#### Leçons Tirées :
- Cette difficulté m'a permis de mieux comprendre la complexité de la gestion des mouvements et des interactions dans un jeu de type puzzle.
J'ai appris l'importance de la planification et de la conception préalable pour aborder efficacement des problèmes algorithmiques complexes.
Malgré les défis rencontrés, cette expérience m'a permis de développer mes compétences en résolution de problèmes et de mieux appréhender les défis techniques dans le développement de jeux interactifs.

### 2. Intégration avec l'Interface Utilisateur
- Mettre à jour les éléments HTML en fonction des actions du joueur a nécessité une gestion minutieuse des événements.

### 3. Débogage et Optimisation
- Identifier et résoudre les bugs, en particulier liés à la logique de jeu et aux interactions avec l'interface utilisateur, a été une tâche complexe.
- Optimiser les performances du jeu pour garantir une expérience fluide sur différentes plates-formes et navigateurs a été un défi supplémentaire.

## Conclusion
Le projet Candy Crush représente un effort significatif dans la mise en œuvre d'un jeu complet en utilisant des technologies web standard telles que HTML, CSS et JavaScript. Notamment concernant la chute des cookies que je n'ai malheureusement pas réussi à implémenter sans bug et problème.
