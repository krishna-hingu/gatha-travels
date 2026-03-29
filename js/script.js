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

//hero section slider
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

setInterval(() => {
  slides[currentSlide].classList.remove("opacity-100");
  slides[currentSlide].classList.add("opacity-0");

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.remove("opacity-0");
  slides[currentSlide].classList.add("opacity-100");
}, 3000);

//about section slider
const aboutSlides = document.querySelectorAll(".about-slide");
let aboutIndex = 0;

setInterval(() => {
  aboutSlides[aboutIndex].classList.remove("opacity-100");
  aboutSlides[aboutIndex].classList.add("opacity-0");

  aboutIndex = (aboutIndex + 1) % aboutSlides.length;

  aboutSlides[aboutIndex].classList.remove("opacity-0");
  aboutSlides[aboutIndex].classList.add("opacity-100");
}, 3500);