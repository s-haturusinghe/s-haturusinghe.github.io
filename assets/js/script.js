'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// theme variables
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const htmlElement = document.documentElement;

// Function to set the theme
const setTheme = function(isDark) {
  if (isDark) {
    document.body.classList.remove("light-theme");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.add("light-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  }
}

// Check for saved theme preference or use device preference as default
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  setTheme(false);
} else if (currentTheme === "dark") {
  setTheme(true);
} else {
  // If no preference set, use the system preference
  setTheme(prefersDarkScheme.matches);
}

// Theme toggle functionality
themeBtn.addEventListener("click", function() {
  // If currently not in light mode, switch to light theme
  if (!document.body.classList.contains("light-theme")) {
    setTheme(false);
  } else {
    setTheme(true);
  }
});



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Secret Section functionality
document.addEventListener("DOMContentLoaded", function() {
  const secretTrigger = document.getElementById("secret-trigger");
  const secretTriggerContainer = document.querySelector(".secret-trigger-container");
  const secretSection = document.getElementById("secret-section");
  const aboutPage = document.querySelector(".about");

  // Show the secret trigger button rarely and randomly
  let secretTimeout;
  let hasShownSecretToday = false;
  let isHovered = false;
  
  // Check if we've already shown the secret today using localStorage
  const lastShownDate = localStorage.getItem("secretLastShown");
  const today = new Date().toDateString();
  
  if (lastShownDate === today) {
    hasShownSecretToday = true;
  }

  // Add event listeners for hover state
  secretTriggerContainer.addEventListener("mouseenter", function() {
    isHovered = true;
  });

  secretTriggerContainer.addEventListener("mouseleave", function() {
    isHovered = false;
    
    // Only hide if section is not showing and not being explicitly shown
    if (!secretSection.classList.contains("show") && !hasShownSecretToday) {
      setTimeout(() => {
        if (!isHovered) {
          secretTriggerContainer.classList.remove("show");
        }
      }, 1000);
    }
  });

  function checkAndSetupSecretSection() {
    // Clear any existing timeout
    if (secretTimeout) {
      clearTimeout(secretTimeout);
    }

    // Only show if about page is active and we haven't shown it today
    // Also add randomness - only show 20% of the time even if eligible
    if (aboutPage.classList.contains("active") && !hasShownSecretToday && Math.random() < 0.2) {
      secretTimeout = setTimeout(() => {
        secretTriggerContainer.classList.add("show");
        
        // Remember that we've shown it today
        localStorage.setItem("secretLastShown", today);
        hasShownSecretToday = true;
        
        // Auto-hide after 10 seconds if not clicked or hovered
        setTimeout(() => {
          if (!secretSection.classList.contains("show") && !isHovered) {
            secretTriggerContainer.classList.remove("show");
          }
        }, 10000);
      }, 3000);
    } else if (!aboutPage.classList.contains("active")) {
      // Hide the secret trigger if navigating away
      secretTriggerContainer.classList.remove("show");
      secretSection.classList.remove("show");
    }
  }

  // Check when page loads
  checkAndSetupSecretSection();

  // Add click event for the secret trigger button
  secretTrigger.addEventListener("click", function() {
    secretSection.classList.toggle("show");
    
    // Change button text based on section state
    const buttonText = secretSection.classList.contains("show") 
      ? "Hide Hobbies and Interests"
      : "Show Hobbies and Interests"; 
    
    secretTrigger.querySelector(".gradient-text").textContent = buttonText;
    
    // Scroll to section when showing
    if (secretSection.classList.contains("show")) {
      setTimeout(() => {
        secretSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  });

  // Set up listeners for page navigation
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", checkAndSetupSecretSection);
  }
});