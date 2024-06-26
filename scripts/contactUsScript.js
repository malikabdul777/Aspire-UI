"use Strict";

const contactUsForm = document.querySelector(".contactUsForm");
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const sideNavMenu = document.querySelector(".sideNavMenu");

// Side bar open & close for small Screens
hamburgerMenu.addEventListener("click", () => {
  sideNavMenu.classList.toggle("visible");
  hamburgerMenu.classList.toggle("cross");
});

contactUsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Your Query is submitted!");
});
