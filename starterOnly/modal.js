// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const formBody = document.querySelector(".form-body");
const inputs = document.querySelectorAll("input");
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
inputs.forEach((ipt) =>
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
      if (formIsValidate() === false) {
        // error messages are displayed with verification
        // we add animation on submit button
        submit.style.animation =
          "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both";
      } else {
        // we save the name
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
  let valid = true;
  let regex;

  switch (ipt.id) {
    case "first":
    case "last":
      // Regex to limit text to alphabet with accent
      // lowercase or uppercase with the i
      // min 2 and max 24 characters
      // and the ability to add a space or a dash
      // followed by a text respecting the same constraints
      regex = /^([a-zÜ-ü]{2,24}([ -]{1}[a-zÜ-ü]{2,24})?)$/i;
      break;
    case "email":
      // Regex for mail with limits
      // 30 alphanumeric characters for each part
      // min 2 and max 4 for the domain
      regex = /^[\w-\.]{1,30}@[\w-]{1,30}\.[\w-]{2,4}$/;
      break;
    case "birthdate":
      // Check if date is empty
      if (ipt.value === "") {
        valid = false;
      }
      break;
    case "quantity":
      // Regex for quantity of tournament
      // number min 0 max 99
      regex = /^\d{1,2}$/;
      break;
    case "checkbox1":
      // Check if box is not checked
      if (ipt.checked === false) {
        valid = false;
      }
      break;
  }

  switch (ipt.id) {
    case "first":
    case "last":
    case "email":
    case "quantity":
      // Check if test of regex return false;
      if (regex.test(ipt.value) === false) {
        valid = false;
      }
      break;
  }

  if (ipt.name === "location") {
    valid = false;
    for (let i = 1; i < 7; i++) {
      // Check if a location is checked
      if (document.getElementById(`location${i}`).checked === true) {
        valid = true;
      }
    }
  }

  if (valid) {
    // If input is valid we hide the error
    ipt.parentElement.setAttribute("data-error-visible", "false");
  } else {
    // Else we show it
    ipt.parentElement.setAttribute("data-error-visible", "true");
  }

  // Return valid for use it into formIsValidate()
  return valid;
}

// check validity of the form
function formIsValidate() {
  let valid = true;
  inputs.forEach((ipt) => {
    if (handleError(ipt) === false) {
      valid = false;
      return;
    }
  });
  return valid;
}
