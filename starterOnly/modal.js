// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const input = document.querySelectorAll("input");
const submit = document.getElementsByClassName("btn-submit")[0];

/*** --- Events --- ***/
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeModalBtn.addEventListener("click", closeModal);

// Detect validity input
input.forEach((ipt) =>
  ipt.addEventListener(
    "input",
    () => {
      // Chaque fois que l'utilisateur saisit quelque chose
      // on vérifie la validité.
      handleError(ipt);
    },
    false
  )
);

// Detect validity form on
submit.addEventListener(
  "click",
  (e) => {
    // Chaque fois que l'utilisateur tente d'envoyer les données
    // on vérifie que les champs sont valides.
    input.forEach((ipt) => handleError(ipt));
    e.preventDefault();
  },
  false
);

/*** --- Functions --- ***/
// display nav (mobile)
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// check validity of an input and handle error
function handleError(ipt) {
  if (ipt.validity.valid) {
    // Si l'input est valide on retire l'erreur
    ipt.parentElement.setAttribute("data-error-visible", "false");
  } else {
    // Sinon on l'affiche
    ipt.parentElement.setAttribute("data-error-visible", "true");
  }
}
