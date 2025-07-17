document.addEventListener("DOMContentLoaded", function () {
  console.log("Robin landing page initialized.");

  // =============================
  // Hero Slider
  // =============================
  const slides = document.querySelectorAll(".hero-slider .slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  if (slides.length) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // =============================
  // Product Zoom
  // =============================
  document.querySelectorAll(".product-block").forEach((block) => {
    const mainImage = block.querySelector(".main-image img");
    const overlay = block.querySelector(".zoom-overlay");
    const thumbnails = block.querySelectorAll(".side-gallery img");
    const imageContainer = block.querySelector(".main-image");

    if (!mainImage || !overlay || !imageContainer) return;

    // Setup overlay styles
    Object.assign(overlay.style, {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      display: "none",
      zIndex: "10",
      pointerEvents: "none",
      borderRadius: "12px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "300%",
    });

    // Handle thumbnail click
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
        overlay.style.backgroundImage = `url(${thumb.src})`;
      });
    });

    // Mouse zoom
    imageContainer.addEventListener("mousemove", (e) => {
      mainImage.style.visibility = "hidden";
      const rect = imageContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      overlay.style.display = "block";
      overlay.style.backgroundImage = `url(${mainImage.src})`;
      overlay.style.backgroundPosition = `${x}% ${y}%`;
    });

    imageContainer.addEventListener("mouseleave", () => {
      mainImage.style.visibility = "visible";
      overlay.style.display = "none";
    });
  });

  // =============================
  // Show Contact Popup
  // =============================
  const contactLink = document.getElementById("contactLink");
  if (contactLink) {
    contactLink.addEventListener("click", function (e) {
      e.preventDefault();
      const popup = document.getElementById("appointmentPopup");
      if (popup) popup.style.display = "block";
    });
  }

  // =============================
  // Handle Appointment Form Submit
  // =============================
  const form = document.getElementById("appointmentForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const phone = document.getElementById("phone")?.value.trim();
      const date = document.getElementById("date")?.value;

      if (!name || !email || !phone || !date) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      if (confirm("Bạn có chắc chắn về lịch hẹn này?")) {
        const data = [
          ["Họ tên", "Email", "Số điện thoại", "Ngày hẹn"],
          [name, email, phone, date],
        ];
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Lịch hẹn");

        const filename = `${name.replace(/\s+/g, "_")}_${date}.xlsx`;
        XLSX.writeFile(wb, filename);

        alert(
          "Lịch hẹn đã được lưu, chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất."
        );
        closePopup();
      }
    });
  }
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
  const images = [
    "./assets/images/machine/machine_1/2.png",
    "./assets/images/machine/machine_1/3.png",
    "./assets/images/machine/machine_1/4.png",
    "./assets/images/machine/machine_1/5.png",
  ];

  let currentIndex = 0;
  const imgElement = document.getElementById("mainProductImage");

  function switchImage() {
    currentIndex = (currentIndex + 1) % images.length;
    imgElement.src = images[currentIndex];
  }

  if (window.innerWidth <= 768 && imgElement) {
    setInterval(switchImage, 5000);
  }
});

// =============================
// Global function (for cancel button)
// =============================
window.closePopup = function () {
  const popup = document.getElementById("appointmentPopup");
  if (popup) popup.style.display = "none";
};
