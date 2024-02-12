import Cookie from "./cookie.js";
import { create2DArray } from "./utils.js";

/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
export default class Grille {
  /**
   * Constructeur de la grille
   * @param {number} l nombre de lignes
   * @param {number} c nombre de colonnes
   */

  tabcookieSelection = [];
  score = 0;
  
  constructor(l, c) {
    this.c = c;
    this.l = l;
    this.nombreAlignements = 0; // Initialisation du nombre d'alignements
    this.nombreDeCoups = 0;
    this.tabcookies = this.remplirTableauDeCookies(6)
  }

  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies() {
    let caseDivs = document.querySelectorAll("#grille div");

    caseDivs.forEach((div, index) => {
      let ligne = Math.floor(index / this.l);
      let colonne = index % this.c; 

      console.log("Index de la case : " + index + ", Ligne : " + ligne + ", Colonne : " + colonne);

      // Récupération du cookie correspondant à cette case
      let cookie = this.tabcookies[ligne][colonne];
      let img = cookie.htmlImage;

      img.onclick = (event) => {
        console.log("Clic sur la ligne " + ligne + " et la colonne " + colonne);
        
        if (cookie.selected) {
          cookie.deselectionnee();
          this.tabcookieSelection.push(cookie);
        } else {
          cookie.selectionnee();
          this.tabcookieSelection.push(cookie);
          if (this.tabcookieSelection.length === 2) {
            Cookie.swapCookies(this.tabcookieSelection[0], this.tabcookieSelection[1]);
            this.tabcookieSelection = [];
            this.testAlignementGeneral(ligne, colonne);
            this.nombreDeCoups++;
      // Mise à jour de l'affichage du nombre de coups dans le document HTML
      let CoupsElement = document.getElementById("coups");
      if (CoupsElement) {
        CoupsElement.innerText = this.nombreDeCoups;
      }
          }
        }
        if (this.tabcookieSelection[0] === this.tabcookieSelection[1]) {
          this.tabcookieSelection = [];
        }
      }

      img.ondragstart = (event) => {
        let cookieDragged = cookie;
        cookieDragged.selectionnee();
        this.tabcookieSelection = [];
        this.tabcookieSelection.push(cookieDragged);
      }

      img.ondragenter = (event) => {
        const imgElement = event.target;
        imgElement.classList.add("imgDragStart");
      }

      img.ondragleave = (event) => {
        const imgElement = event.target;
        imgElement.classList.remove("imgDragStart");
      }

      img.ondrop = (event) => {
        let cookieDragged = cookie;
        cookieDragged.selectionnee();
        this.tabcookieSelection.push(cookieDragged);
        
        Cookie.swapCookies(this.tabcookieSelection[0], this.tabcookieSelection[1]);
        
        this.tabcookieSelection = [];
        img.classList.remove("imgDragStart");
        cookieDragged.deselectionnee();
        this.testAlignementGeneral(ligne, colonne);
        this.nombreDeCoups++;
      // Mise à jour de l'affichage du nombre de coups dans le document HTML
      let CoupsElement = document.getElementById("coups");
      if (CoupsElement) {
        CoupsElement.innerText = this.nombreDeCoups;
      }
      }
      
      img.ondragover = (event) => {
        return false;
      }

      // Affichage de l'image dans le div pour l'afficher à l'écran.
      div.appendChild(img);
    });
  }


  // inutile ?
  getCookieFromLC(ligne, colonne) {
    return this.tabcookies[ligne][colonne];
  }
  
  /**
   * Initialisation du niveau de départ. Le paramètre est le nombre de cookies différents
   * dans la grille. 4 types (4 couleurs) = facile de trouver des possibilités de faire
   * des groupes de 3. 5 = niveau moyen, 6 = niveau difficile
   *
   * Améliorations : 1) s'assurer que dans la grille générée il n'y a pas déjà de groupes
   * de trois. 2) S'assurer qu'il y a au moins 1 possibilité de faire un groupe de 3 sinon
   * on a perdu d'entrée. 3) réfléchir à des stratégies pour générer des niveaux plus ou moins
   * difficiles.
   *
   * On verra plus tard pour les améliorations...
   */
  remplirTableauDeCookies(CookiesDiff) {
    // Création d'un tableau 2D pour stocker les cookies
    let CookiesTab = create2DArray(this.l);

    // Remplissage du tableau
    for (let ligne = 0; ligne < this.l; ligne++) {
        CookiesTab[ligne] = []; // Initialisation de la ligne

        for (let colonne = 0; colonne < this.c; colonne++) {
            // Génération aléatoire du type de cookie
            const type = Math.floor(Math.random() * CookiesDiff);
            CookiesTab[ligne][colonne] = new Cookie(type, ligne, colonne);
        }
    }

    return CookiesTab;
}

TestAlignementHorizontal(ligne, colonne) {
  let tabL = this.tabcookies[ligne];
  let cookiesASupprimer = [];

  // Parcours des cookies sur la ligne
  for (let c = 0; c < this.c - 2; c++) {
      let cookie1 = tabL[c];
      let cookie2 = tabL[c + 1];
      let cookie3 = tabL[c + 2];

      // Vérification d'alignement de trois cookies consécutifs
      if ((cookie1.type === cookie2.type) && (cookie2.type === cookie3.type)) {
          // Ajout des cookies à supprimer
          cookiesASupprimer.push(cookie1, cookie2, cookie3);
          
          // Recherche de cookies consécutifs identiques
          let index = c + 3;
          while (index < this.c && tabL[index].type === cookie1.type) {
              cookiesASupprimer.push(tabL[index]);
              index++;
          }
      }
  }
  return cookiesASupprimer;
}

testAlignementVertical(ligne, colonne) {
  // Récupération des cookies dans la colonne spécifiée
  let tabC = [];
  for (let i = 0; i < this.l; i++) {
      tabC.push(this.tabcookies[i][colonne]);
  }

  let cookiesASupprimer = [];

  // Parcours des cookies dans la colonne
  for (let l = 0; l < this.l - 2; l++) {
      let cookie1 = tabC[l];
      let cookie2 = tabC[l + 1];
      let cookie3 = tabC[l + 2];

      // Vérification de l'alignement de trois cookies consécutifs
      if ((cookie1.type === cookie2.type) && (cookie2.type === cookie3.type)) {
          // Ajout des cookies à supprimer
          cookiesASupprimer.push(cookie1, cookie2, cookie3);
          
          // Recherche de cookies consécutifs identiques
          let index = l + 3;
          while (index < this.l && tabC[index].type === cookie1.type) {
              cookiesASupprimer.push(tabC[index]);
              index++;
          }
      }
  }
  return cookiesASupprimer;
}

testAlignementGeneral(ligne, colonne) {
  // Test des alignements horizontaux
  let cookiesASupprimerL = this.TestAlignementHorizontal(ligne, colonne);
  // Test des alignements verticaux
  let cookiesASupprimerC = this.testAlignementVertical(ligne, colonne);

  // Fusion des deux ensembles de cookies alignés
  let alignementsGlobal = cookiesASupprimerL.concat(cookiesASupprimerC);

  // Suppression des cookies alignés
  this.supprimerCookiesAlignes(alignementsGlobal);
}


supprimerCookiesAlignes(cookies) {
  // Vérifie s'il y a des cookies à supprimer
  if (cookies.length > 0) {
      // Parcours des cookies à supprimer
      cookies.forEach(cookie => {
          // Appel de la méthode de suppression sur chaque cookie
          cookie.CookieSupprimee();
      });

      // Mise à jour du score en fonction du nombre de cookies supprimés
      this.score += cookies.length;
      // Mise à jour de l'affichage du score dans le document HTML
      let scoreElement = document.getElementById("score");
      if (scoreElement) {
        scoreElement.innerText = this.score;
      }

      this.nombreAlignements++;
      // Mise à jour de l'affichage du nombre de coups dans le document HTML
      let AlignementElement = document.getElementById("alignements");
      if (AlignementElement) {
        AlignementElement.innerText = this.nombreAlignements;
      }
  }
}


detecterEtSupprimerAlignements() {
  // Vérification des alignements en ligne
  for (let y = 0; y < this.l; y++) {
      for (let x = 0; x < this.c - 2; x++) {
          // Vérification de l'alignement de trois cookies consécutifs
          if ((this.tabcookies[y][x].type === this.tabcookies[y][x + 1].type) && 
              (this.tabcookies[y][x + 1].type === this.tabcookies[y][x + 2].type)) {
              // Sélection des cookies alignés
              this.tabcookies[y][x].selectionnee();
              this.tabcookies[y][x + 1].selectionnee();
              this.tabcookies[y][x + 2].selectionnee();
              console.log(this.tabcookies[y][x].type, this.tabcookies[y][x + 1].type, this.tabcookies[y][x + 2].type);
          }
      }
  } 
}

/**
 * Fait tomber les cookies lorsqu'il y a un espace vide en dessous d'eux.
 */
// chuteCookies() {
//   let cookiesEnMouvement = false;
//   for (let colonne = 0; colonne < this.c; colonne++) {
//       for (let ligne = this.l - 1; ligne >= 0; ligne--) {
//           let cookie = this.tabcookies[ligne][colonne];
//           if (cookie && !cookie.type) {
//               for (let k = ligne; k >= 0; k--) {
//                   let cookieEnDessous = this.tabcookies[k][colonne];
//                   let cookieActuel = this.tabcookies[k + 1][colonne];
//                   if (cookieActuel && !cookieActuel.type && cookieEnDessous.type) {
//                       [cookieActuel.type, cookieEnDessous.type] = [cookieEnDessous.type, cookieActuel.type];
//                       cookiesEnMouvement = true;
//                   }
//               }
//           }
//       }
//   }

//   return cookiesEnMouvement;
// }


}
