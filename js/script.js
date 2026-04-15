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

// ================= BOOKING FORM =================
const bookingForm = document.getElementById("booking-form");
const successMsg = document.getElementById("success-msg");

// ================= DATE DEFAULT =================
const datetimeInput = document.getElementById("datetime");

if (datetimeInput) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);

  const formatted = now.toISOString().slice(0, 16);

  datetimeInput.value = formatted;
  datetimeInput.min = formatted;
}

// ================= PICKUP LOCATION =================
const pickupBtn = document.getElementById("pickup-btn");
const pickupInput = document.getElementById("pickup");

if (pickupBtn) {
  pickupBtn.addEventListener("click", () => {
    if (!navigator.geolocation) return;

    pickupBtn.textContent = "Fetching location...";

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
          );
          const data = await res.json();

          if (pickupInput) {
            pickupInput.value = data.display_name || "Current Location";
          }

          pickupBtn.textContent = "📍 Location Added";
        } catch {
          pickupBtn.textContent = "❌ Try again";
        }
      },
      () => {
        pickupBtn.textContent = "❌ Permission denied";
      },
    );
  });
}

// reset pickup button when user edits
if (pickupInput && pickupBtn) {
  pickupInput.addEventListener("input", () => {
    pickupBtn.textContent = "📍 Use Current Location";
  });
}

// ================= FORM SUBMIT =================
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const trip = document.getElementById("trip").value;
    const vehicle = document.getElementById("vehicle").value;
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const rawDateTime = document.getElementById("datetime").value;

    // format date
    let formattedDateTime = "";
    if (rawDateTime) {
      const d = new Date(rawDateTime);
      formattedDateTime = d.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // ================= OPTIONAL EMAIL =================
    let emailText = "";
    if (email.trim() !== "") {
      emailText = "Email: " + email + "\n";
    }

    // ================= WHATSAPP MESSAGE =================
    const message =
      "*Gatha Travels Booking*\n\n" +
      "Name: " +
      name +
      "\n" +
      "Phone: " +
      phone +
      "\n" +
      emailText +
      "\n" +
      "Trip: " +
      trip +
      "\n" +
      "Vehicle: " +
      vehicle +
      "\n\n" +
      "Pickup: " +
      pickup +
      "\n" +
      "Drop: " +
      drop +
      "\n\n" +
      "Date & Time: " +
      formattedDateTime;

    const url = `https://wa.me/918591509146?text=${encodeURIComponent(message)}`;

    successMsg.classList.remove("hidden");

    setTimeout(() => {
      window.open(url, "_blank");
      bookingForm.reset();
      successMsg.classList.add("hidden");
    }, 800);
  });
}
