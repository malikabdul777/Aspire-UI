"use strict";

const hamburgerMenu = document.querySelector(".hamburgerMenu");
const sideNavMenu = document.querySelector(".sideNavMenu");

// Side bar open & close for small Screens
hamburgerMenu.addEventListener("click", () => {
  sideNavMenu.classList.toggle("visible");
  hamburgerMenu.classList.toggle("cross");
});
