const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");

  // change icon
  if (mobileMenu.classList.contains("hidden")) {
    menuBtn.textContent = "☰";
  } else {
    menuBtn.textContent = "✕";
  }
});

// close menu when link clicked
const menuLinks = mobileMenu.querySelectorAll("a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuBtn.textContent = "☰";
  });
});
