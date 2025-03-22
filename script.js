// Ensure logo is hidden on page load
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo");
  logo.classList.add("opacity-0"); // Hide the logo initially
});

// Slide Logo on Scroll
window.addEventListener("scroll", () => {
  const logo = document.getElementById("logo");
  const mainSection = document.querySelector("section#about");
  const mainStart = mainSection.offsetTop; // Get the section's position

  if (window.scrollY > mainStart) {
    // Show logo after scrolling past "About" section
    logo.classList.add("opacity-100", "transition-all");
    logo.classList.remove("opacity-0");
    mainSection.classList.add("translate-y-[-100%]", "transition-all");
  } else {
    // Hide logo when at the top or before reaching "About"
    logo.classList.add("opacity-0");
    logo.classList.remove("opacity-100");
    mainSection.classList.remove("translate-y-[-100%]");
  }
});


// Typing Effect
const words = ["Welcome to my website!!!"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150;
const erasingSpeed = 150;
const delayBetweenWords = 1000;
const typingElement = document.getElementById("typing");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex);
    charIndex++;
  }

  // Ensure the element always has content
  if (charIndex === 0 && isDeleting) {
    typingElement.innerHTML = "&nbsp;";
  }

  let timing = isDeleting ? erasingSpeed : typingSpeed;

  // Add delay when a word is fully typed or fully erased
  if (!isDeleting && charIndex === currentWord.length) {
    timing = delayBetweenWords; // Pause before starting to delete
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length; // Move to the next word
    timing = delayBetweenWords; // Pause before typing the next word
  }

  setTimeout(typeEffect, timing);
}

window.onload = () => {
  typeEffect();
};

function startTypingEffect() {
  setTimeout(typeEffect, 1000);
}

// Toggle menu for small screens
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");

  // Open menu
  menuToggle.addEventListener("click", () => {
    menu.classList.add("active");
    menuToggle.style.display = "none"; // Hide the hamburger icon
  });

  // Close menu
  menuClose.addEventListener("click", () => {
    menu.classList.remove("active");
    menuToggle.style.display = "block"; // Show the hamburger icon
  });

  // Reset menu and toggle states on screen resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      menu.classList.remove("active"); // Ensure menu is not active
      menuToggle.style.display = "none"; // Hide the hamburger icon
    } else {
      menuToggle.style.display = "block"; // Show the hamburger icon for small screens
    }
  });
});

// // Function to detect scroll and navigate to the next section
// if (window.innerWidth >= 1024) { // Only apply to large screens
//   const sections = Array.from(document.querySelectorAll("section")); // Ensure sections are in an array
//   let currentIndex = 0;
//   let isScrolling = false; // Prevent multiple scroll events during transition

//   // Scroll to the next or previous section
//   function scrollToSection(index) {
//     if (index >= 0 && index < sections.length) {
//       isScrolling = true;
//       sections[index].scrollIntoView({ behavior: "smooth" });
//       currentIndex = index;

//       // Add a delay to prevent rapid scrolling
//       setTimeout(() => {
//         isScrolling = false;
//       }, 1000); // Adjust delay as needed (1000ms = 1 second)
//     }
//   }

//   // Listen for wheel scroll event
//   window.addEventListener("wheel", (event) => {
//     if (!isScrolling) {
//       if (event.deltaY > 0) {
//         // Scroll down
//         if (currentIndex < sections.length - 1) {
//           scrollToSection(currentIndex + 1);
//         }
//       } else {
//         // Scroll up
//         if (currentIndex > 0) {
//           scrollToSection(currentIndex - 1);
//         }
//       }
//     }
//   });

//   // Listen for keyboard arrow keys
//   window.addEventListener("keydown", (event) => {
//     if (!isScrolling) {
//       if (event.key === "ArrowDown") {
//         if (currentIndex < sections.length - 1) {
//           scrollToSection(currentIndex + 1);
//         }
//       } else if (event.key === "ArrowUp") {
//         if (currentIndex > 0) {
//           scrollToSection(currentIndex - 1);
//         }
//       }
//     }
//   });

//   // Update currentIndex on page load to match the visible section
//   window.addEventListener("load", () => {
//     const scrollPosition = window.scrollY;
//     sections.forEach((section, index) => {
//       if (
//         scrollPosition >= section.offsetTop &&
//         scrollPosition < section.offsetTop + section.offsetHeight
//       ) {
//         currentIndex = index;
//       }
//     });
//   });
// }

// Initialize EmailJS
(function () {
  emailjs.init("M5IBtD_JOO0mSH5-7"); // Replace with your EmailJS public key
})();

// Handle form submission
document.getElementById("sendMessageBtn").addEventListener("click", (event) => {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  // Send email using EmailJS
  emailjs
    .send("service_vdtr03u", "template_fmamau8", {
      from_name: name,
      from_email: email,
      message: message,
    })
    .then(
      (response) => {
        alert("Message sent successfully!");
        console.log("SUCCESS:", response);
        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
      },
      (error) => {
        alert("Failed to send message. Please try again later.");
        console.log("FAILED:", error);
      }
    );
});
