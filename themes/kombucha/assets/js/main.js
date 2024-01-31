// handle navigation menu
var el = document.querySelector(".hamburger");
var menu = document.querySelector(".mobile-nav");

el.onclick = function () {
  el.classList.toggle("is-active");
  menu.classList.toggle("open");
  // login.classList.toggle("open");
};