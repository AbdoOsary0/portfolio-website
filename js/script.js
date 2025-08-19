// ===== PORTFOLIO JAVASCRIPT =====

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(15, 23, 42, 0.95)";
    nav.style.backdropFilter = "blur(25px)";
  } else {
    nav.style.background = "rgba(15, 23, 42, 0.9)";
    nav.style.backdropFilter = "blur(20px)";
  }
});

// ===== ANIMATE ELEMENTS ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// ===== CONTACT FORM HANDLING =====
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitButton = this.querySelector(".submit-button");
      const originalText = submitButton.textContent;

      // Form validation
      const requiredFields = this.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "#ef4444";
        } else {
          field.style.borderColor = "rgba(99, 102, 241, 0.3)";
        }
      });

      if (!isValid) {
        showNotification("Please fill in all required fields", "error");
        return;
      }

      // Email validation
      const emailField = this.querySelector('input[type="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        showNotification("Please enter a valid email address", "error");
        emailField.style.borderColor = "#ef4444";
        return;
      }

      // Show loading state
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;
      submitButton.style.opacity = "0.7";

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          // Success
          submitButton.textContent = "Message Sent!";
          submitButton.style.background =
            "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";

          this.reset();
          showNotification(
            "Thank you for reaching out! I'll get back to you soon.",
            "success"
          );

          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
            submitButton.style.background = "var(--gradient)";
          }, 3000);
        } else {
          throw new Error("Formspree error");
        }
      } catch (error) {
        console.error(error);
        showNotification("Failed to send message. Please try again.", "error");

        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
      }
    });
  }
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${
      type === "success" ? "#22c55e" : type === "error" ? "#ef4444" : "#6366f1"
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    font-family: inherit;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// ===== INTERACTIVE HOVER EFFECTS =====
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to cards
  const cards = document.querySelectorAll(
    ".skill-card, .project-card, .achievement-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add hover effects to contact methods
  const contactMethods = document.querySelectorAll(".contact-method");
  contactMethods.forEach((method) => {
    method.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(8px)";
    });

    method.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });
});

// ===== PARALLAX EFFECT FOR FLOATING ELEMENTS =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelectorAll(".floating-element");

  parallax.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const rotation = scrolled * 0.1;
    element.style.transform = `translateY(${
      scrolled * speed
    }px) rotate(${rotation}deg)`;
  });
});

// ===== TYPING EFFECT FOR HERO TEXT =====
function typeWriter(text, element, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// ===== MOBILE MENU TOGGLE =====
document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      this.classList.toggle("active");
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileToggle.classList.remove("active");
      });
    });
  }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Navbar background
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(15, 23, 42, 0.95)";
  } else {
    nav.style.background = "rgba(15, 23, 42, 0.9)";
  }

  // Parallax effect
  const scrolled = window.pageYOffset;
  const parallax = document.querySelectorAll(".floating-element");
  parallax.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
}, 16); // ~60fps

window.addEventListener("scroll", throttledScrollHandler);

// ===== INITIALIZE ON LOAD =====
window.addEventListener("load", () => {
  // Initialize typing effect
  const heroTitle = document.querySelector(".hero-content h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(originalText, heroTitle, 100);
  }

  // Initialize animations
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// ===== UTILITY FUNCTIONS =====
// Smooth scroll to element
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for interactive elements
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.classList.contains("cta-button")) {
    e.target.click();
  }
});

// Focus management for forms
document.querySelectorAll("input, textarea, select").forEach((field) => {
  field.addEventListener("focus", function () {
    this.style.outline = "2px solid var(--primary)";
  });

  field.addEventListener("blur", function () {
    this.style.outline = "none";
  });
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🚀 Welcome to Abdelrahman Mohammed's Portfolio!
📧 Email: AbdelrahmanMoahmmed27@gmail.com
🔗 GitHub: https://github.com/AbdoOsary0
💼 LinkedIn: https://www.linkedin.com/in/abdelrahman-mohammed-205281271

Built with ❤️ and clean code.
`);

// ===== ERROR HANDLING =====
window.addEventListener("error", function (e) {
  console.error("An error occurred:", e.error);
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);
});

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        console.log("ServiceWorker registration successful");
      },
      function (err) {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
