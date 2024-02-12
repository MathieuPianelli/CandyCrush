export default class Cookie {
  ligne=0;
  colone=0;
  type=0;
  htmlImage=undefined;

  static urlsImagesNormales = [
    "./assets/images/Croissant@2x.png",
    "./assets/images/Cupcake@2x.png",
    "./assets/images/Danish@2x.png",
    "./assets/images/Donut@2x.png",
    "./assets/images/Macaroon@2x.png",
    "./assets/images/SugarCookie@2x.png",
  ];
  static urlsImagesSurlignees = [
    "./assets/images/Croissant-Highlighted@2x.png",
    "./assets/images/Cupcake-Highlighted@2x.png",
    "./assets/images/Danish-Highlighted@2x.png",
    "./assets/images/Donut-Highlighted@2x.png",
    "./assets/images/Macaroon-Highlighted@2x.png",
    "./assets/images/SugarCookie-Highlighted@2x.png",
  ];

  constructor(type, ligne, colonne) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;

    // On récupère l'URL de l'image correspondant au type
    // qui est un nombre entre 0 et 5
    const url = Cookie.urlsImagesNormales[type];

    // On crée une image HTML avec l'API du DOM
    let img = document.createElement("img");
    img.src = url;
    img.width = 80;
    img.height = 80;
    // pour pouvoir récupérer la ligne et la colonne
    // quand on cliquera sur une image et donc à partir
    // de cette ligne et colonne on pourra récupérer le cookie
    // On utilise la dataset API du DOM, qui permet de stocker
    // des données arbitraires dans un élément HTML
    img.dataset.ligne = ligne;
    img.dataset.colonne = colonne;

    // On stocke l'image dans l'objet cookie
    this.htmlImage = img;
  }

  selectionnee() {
    if (!this.selected) {
        // Modification de l'image
        // Changement de classe CSS et source de l'image
        this.htmlImage.classList.add('cookies-selected');
        this.htmlImage.src = Cookie.urlsImagesSurlignees[this.type];

        this.selected = true;
    }
}


deselectionnee() {
  if (this.selected) {
      // Suppression de la classe CSS
      this.htmlImage.classList.remove('cookies-selected');
      
      // Rétablissement de la source de l'image normale
      this.htmlImage.src = Cookie.urlsImagesNormales[this.type];

      this.selected = false;
  }
}

static swapCookies(c1, c2) {
  console.log("SWAP C1 C2");
  // On échange leurs images et types
  if (Cookie.distance(c1, c2) === 1) {
    [c1.htmlImage.src, c2.htmlImage.src] = [c2.htmlImage.src, c1.htmlImage.src];
    [c1.type, c2.type] = [c2.type, c1.type];
  }
  // et on remet les désélectionne
  c1.deselectionnee();
  c2.deselectionnee();
}

CookieSupprimee() {
  this.htmlImage.classList.add("cookieASupprimer");
  this.type = null;
}

/** renvoie la distance entre deux cookies */
static distance(cookie1, cookie2) {
  let l1 = cookie1.ligne;
  let c1 = cookie1.colonne;
  let l2 = cookie2.ligne;
  let c2 = cookie2.colonne;

  return Math.sqrt((c2 - c1) * (c2 - c1) + (l2 - l1) * (l2 - l1));
}

}
