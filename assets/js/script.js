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



// page navigation variables (legacy - now using regular links)
// Keeping this section for compatibility but navigation is now handled by HTML links
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Legacy navigation functionality - no longer needed for multi-page setup
// Keeping for any remaining data-nav-link elements if they exist
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // This is now handled by HTML links, but keeping for backwards compatibility
    console.log("Navigation handled by HTML links");
  });
}

// Secret Section functionality
document.addEventListener("DOMContentLoaded", function() {
  const secretTrigger = document.getElementById("secret-trigger");
  const secretTriggerContainer = document.querySelector(".secret-trigger-container");
  const secretSection = document.getElementById("secret-section");
  const aboutPage = document.querySelector(".about");
  const particles = document.querySelectorAll(".particle");

  // Only run secret section functionality if elements exist (i.e., on About page)
  if (!secretTrigger || !secretTriggerContainer || !secretSection || !aboutPage) {
    return;
  }

  // Particle animation functionality
  function initParticles() {
    // Initial positioning of particles
    particles.forEach(particle => {
      resetParticle(particle);
      
      // Start with random animations
      animateParticle(particle);
    });
  }

  function resetParticle(particle) {
    // Random position within the container
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 4 + 2; // Random size between 2-6px
    const delay = Math.random() * 3;
    
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = Math.random() * 0.5 + 0.2; // Random opacity between 0.2-0.7
    particle.style.animationDelay = `${delay}s`;
  }

  function animateParticle(particle) {
    // Apply animations
    particle.style.animation = `
      particle-glow ${Math.random() * 3 + 2}s infinite alternate,
      float-upward ${Math.random() * 5 + 10}s forwards
    `;
    
    // When animation ends, reset and restart
    particle.addEventListener('animationend', function() {
      resetParticle(particle);
      setTimeout(() => {
        animateParticle(particle);
      }, Math.random() * 100);
    });
  }

  // Initialize particles
  initParticles();

  // Mouse move effect for particles
  secretTriggerContainer.addEventListener('mousemove', function(e) {
    const rect = secretTriggerContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    particles.forEach(particle => {
      const particleRect = particle.getBoundingClientRect();
      const particleCenterX = particleRect.left + particleRect.width/2 - rect.left;
      const particleCenterY = particleRect.top + particleRect.height/2 - rect.top;
      
      // Calculate distance from mouse to particle
      const dx = mouseX - particleCenterX;
      const dy = mouseY - particleCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If mouse is close to particle, make it move away
      if (distance < 40) {
        const angle = Math.atan2(dy, dx);
        const moveX = -Math.cos(angle) * (40 - distance) / 2;
        const moveY = -Math.sin(angle) * (40 - distance) / 2;
        
        // Add transform with slight easing
        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
        particle.style.filter = 'blur(2px)';
        particle.style.opacity = '0.8';
      } else {
        particle.style.transform = '';
        particle.style.filter = '';
      }
    });
  });
  
  // Reset particles when mouse leaves
  secretTriggerContainer.addEventListener('mouseleave', function() {
    particles.forEach(particle => {
      particle.style.transform = '';
      particle.style.filter = '';
    });
  });

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
    // Since we're now on a dedicated About page, the aboutPage always has "active" class
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
});

// // Project Modal Functionality
// document.addEventListener("DOMContentLoaded", function() {
//   const modal = document.getElementById("project-modal");
//   const modalClose = document.getElementById("modal-close");
  
//   let projectData = {};
  
//   // Load project data from JSON file
//   async function loadProjectData() {
//     try {
//       const response = await fetch('../assets/data/projects.json');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       projectData = await response.json();
//       generateProjectCards();
//     } catch (error) {
//       console.error('Failed to load project data:', error);
//       // Fallback data in case JSON loading fails
//       projectData = {
//         project1: {
//           title: "Project Data Unavailable",
//           category: "Error",
//           tech: "N/A",
//           image: "../assets/images/my-avatar.png",
//           shortDescription: "Unable to load project data. Please try again later.",
//           description: "Unable to load project data. Please try again later.",
//           features: ["Project data loading failed"],
//           github: "#",
//           demo: "#"
//         }
//       };
//       generateProjectCards();
//     }
//   }

//   // Generate project cards dynamically
//   function generateProjectCards() {
//     const projectList = document.getElementById('project-list');
//     if (!projectList) return;

//     projectList.innerHTML = ''; // Clear existing content

//     Object.entries(projectData).forEach(([projectId, project]) => {
//       const projectItem = document.createElement('li');
//       projectItem.className = 'project-item active';
//       projectItem.setAttribute('data-filter-item', '');
//       projectItem.setAttribute('data-category', project.category.toLowerCase());

//       projectItem.innerHTML = `
//         <div class="project-card">
//           <figure class="project-img">
//             <div class="project-item-icon-box">
//               <i class="fas fa-eye"></i>
//             </div>
//             <img src="${project.image}" alt="${project.title}" loading="lazy">
//           </figure>

//           <div class="project-content">
//             <h3 class="project-title">${project.title}</h3>
//             <p class="project-category">${project.category}</p>
//             <p class="project-description">${project.shortDescription}</p>
//             <button class="read-more-btn" data-project="${projectId}">Read More</button>
//           </div>
//         </div>
//       `;

//       projectList.appendChild(projectItem);
//     });

//     // Re-initialize event listeners for the new buttons
//     initializeEventListeners();
//   }

//   // Initialize event listeners for dynamically created elements
//   function initializeEventListeners() {
//     const readMoreBtns = document.querySelectorAll(".read-more-btn");
    
//     readMoreBtns.forEach(btn => {
//       btn.addEventListener("click", function(e) {
//         e.preventDefault();
//         const projectId = this.getAttribute("data-project");
//         openModal(projectId);
//       });
//     });
//   }
  
//   // Open modal function
//   function openModal(projectId) {
//     const project = projectData[projectId];
//     if (!project) return;
    
//     // Populate modal content
//     document.getElementById("modal-title").textContent = project.title;
//     document.getElementById("modal-category").textContent = project.category;
//     document.getElementById("modal-tech").textContent = project.tech;
//     document.getElementById("modal-description").textContent = project.description;
    
//     // Populate features list
//     const featuresList = document.getElementById("modal-features-list");
//     featuresList.innerHTML = "";
//     project.features.forEach(feature => {
//       const li = document.createElement("li");
//       li.textContent = feature;
//       featuresList.appendChild(li);
//     });
    
//     // Update links
//     document.getElementById("modal-github-link").href = project.github;
//     document.getElementById("modal-demo-link").href = project.demo;
    
//     // Show modal
//     modal.classList.add("active");
//     document.body.style.overflow = "hidden"; // Prevent background scrolling
//   }
  
//   // Close modal function
//   function closeModal() {
//     modal.classList.remove("active");
//     document.body.style.overflow = ""; // Restore scrolling
//   }
  
//   // Initialize the project modal functionality
//   async function initProjectModal() {
//     await loadProjectData();
    
//     // Close modal when clicking close button
//     if (modalClose) {
//       modalClose.addEventListener("click", closeModal);
//     }
    
//     // Close modal when clicking outside the modal content
//     if (modal) {
//       modal.addEventListener("click", function(e) {
//         if (e.target === modal) {
//           closeModal();
//         }
//       });
//     }
    
//     // Close modal with Escape key
//     document.addEventListener("keydown", function(e) {
//       if (e.key === "Escape" && modal && modal.classList.contains("active")) {
//         closeModal();
//       }
//     });
//   }
  
//   // Initialize everything
//   initProjectModal();
  
//   // Enhanced filter functionality for projects page
//   const select = document.querySelector("[data-select]");
//   if (select) {
//     select.addEventListener("click", function () { 
//       elementToggleFunc(this); 
//     });
//   }

//   // Update filter functionality to work with dynamic content
//   function updateFilterFunctionality() {
//     const filterBtns = document.querySelectorAll("[data-filter-btn]");
//     const selectItems = document.querySelectorAll("[data-select-item]");
//     const selectValue = document.querySelector("[data-selecct-value]");
    
//     // Enhanced filter function
//     const filterFunc = function (selectedValue) {
//       const filterItems = document.querySelectorAll("[data-filter-item]");
      
//       for (let i = 0; i < filterItems.length; i++) {
//         if (selectedValue === "all") {
//           filterItems[i].classList.add("active");
//         } else if (selectedValue === filterItems[i].dataset.category) {
//           filterItems[i].classList.add("active");
//         } else {
//           filterItems[i].classList.remove("active");
//         }
//       }
//     };

//     // Add event listeners to filter buttons for large screen
//     let lastClickedBtn = filterBtns[0];
    
//     filterBtns.forEach((btn, i) => {
//       btn.addEventListener("click", function () {
//         let selectedValue = this.innerText.toLowerCase();
//         if (selectValue) {
//           selectValue.innerText = this.innerText;
//         }
//         filterFunc(selectedValue);

//         if (lastClickedBtn) {
//           lastClickedBtn.classList.remove("active");
//         }
//         this.classList.add("active");
//         lastClickedBtn = this;
//       });
//     });

//     // Add event listeners to select items for mobile
//     selectItems.forEach(item => {
//       item.addEventListener("click", function () {
//         let selectedValue = this.innerText.toLowerCase();
//         if (selectValue) {
//           selectValue.innerText = this.innerText;
//         }
//         if (select) {
//           elementToggleFunc(select);
//         }
//         filterFunc(selectedValue);
//       });
//     });
//   }

//   // Call updateFilterFunctionality after projects are loaded
//   window.addEventListener('load', function() {
//     setTimeout(updateFilterFunctionality, 100); // Small delay to ensure projects are rendered
//   });
// });