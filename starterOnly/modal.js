// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const formBody = document.querySelector(".form-body");
const form = document.querySelector("form");
const input = document.querySelectorAll("input");
const labelTournament = document.getElementById("tournament");
const submit = document.getElementsByClassName("btn-submit")[0];

// Media Mobile
if (window.matchMedia("(max-width: 768px)").matches) {
  labelTournament.innerText =
    "À combien de tournois avez-vous déjà participé ?";
}

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
      // Each time user types somtehing
      // we check the validity and display error messages
      handleError(ipt);
      // and we reset animation on submit button
      submit.style.animation = "";
    },
    false
  )
);

// Detect validity form on submit
submit.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    // if submit button value is "C'est parti"
    if (submit.value === "C'est parti") {
      // and if the form is not valide
      if (form.checkValidity() === false) {
        // we display error messages
        input.forEach((ipt) => handleError(ipt));
        // and we add animation on submit button
        submit.style.animation =
          "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both";
      } else {
        // else if we save the name
        let name = document.getElementById("first").value;
        // we change HTML of the formBody
        // for a message with the name
        formBody.innerHTML = `<h2 class='validation'>Merci pour votre inscription ${name}</h2>`;
        formBody.className = "form-body form-body-validation";
        // we keep the background of submit in red
        submit.style.background = "var(--color-primary)";
        // and we change it's value for "Fermer"
        submit.value = "Fermer";
      }
    } else {
      // if submit button value is "Fermer"
      // we close the modal
      closeModal();
    }
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
