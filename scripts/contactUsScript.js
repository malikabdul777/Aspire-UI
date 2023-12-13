"use Strict";

const contactUsForm = document.querySelector(".contactUsForm");

contactUsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Your Query is submitted!");
});
