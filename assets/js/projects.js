// Project Modal Functionality
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  
  let projectData = {};
  
  // Load project data from JSON file
  async function loadProjectData() {
    try {
      const response = await fetch('../assets/data/projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      projectData = await response.json();
      generateProjectCards();
    } catch (error) {
      console.error('Failed to load project data:', error);
      // Fallback data in case JSON loading fails
      projectData = {
        project1: {
          title: "Project Data Unavailable",
          category: "Error",
          tech: "N/A",
          image: "../assets/images/place.webp",
          shortDescription: "Unable to load project data. Please try again later.",
          description: "Unable to load project data. Please try again later.",
          features: ["Project data loading failed"],
          github: "#",
          demo: "#"
        }
      };
      generateProjectCards();
    }
  }

  // Generate project cards dynamically
  function generateProjectCards() {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;

    projectList.innerHTML = ''; // Clear existing content

    Object.entries(projectData).forEach(([projectId, project]) => {
      const projectItem = document.createElement('li');
      projectItem.className = 'project-item active';
      projectItem.setAttribute('data-filter-item', '');
      projectItem.setAttribute('data-category', project.category.toLowerCase());

      projectItem.innerHTML = `
        <div class="project-card">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <i class="fas fa-eye"></i>
            </div>
            <img src="${project.image}" alt="${project.title}" loading="lazy">
          </figure>

          <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-category">${project.category}</p>
            <p class="project-description">${project.shortDescription}</p>
            <button class="read-more-btn" data-project="${projectId}">Read More</button>
          </div>
        </div>
      `;

      projectList.appendChild(projectItem);
    });

    // Re-initialize event listeners for the new buttons
    initializeEventListeners();
  }

  // Initialize event listeners for dynamically created elements
  function initializeEventListeners() {
    const readMoreBtns = document.querySelectorAll(".read-more-btn");
    
    readMoreBtns.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const projectId = this.getAttribute("data-project");
        openModal(projectId);
      });
    });
  }
  
  // Open modal function
  function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    // Populate modal content
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-category").textContent = project.category;
    
    // Format tech stack as a styled list
    const techElement = document.getElementById("modal-tech");
    const techItems = project.tech.split(",").map(tech => tech.trim());
    techElement.innerHTML = techItems.map(tech => `<span class="tech-tag">${tech}</span>`).join("");
    
    document.getElementById("modal-description").textContent = project.description;
    
    // Populate features list
    const featuresList = document.getElementById("modal-features-list");
    featuresList.innerHTML = "";
    project.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresList.appendChild(li);
    });
    
    // Update links
    document.getElementById("modal-github-link").href = project.github;
    
    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
  
  // Close modal function
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }
  
  // Initialize the project modal functionality
  async function initProjectModal() {
    await loadProjectData();
    
    // Close modal when clicking close button
    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }
    
    // Close modal when clicking outside the modal content
    if (modal) {
      modal.addEventListener("click", function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
    
    // Close modal with Escape key
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }
  
  // Initialize everything
  initProjectModal();
  
  // Enhanced filter functionality for projects page
  const select = document.querySelector("[data-select]");
  if (select) {
    select.addEventListener("click", function () { 
      elementToggleFunc(this); 
    });
  }

  // Update filter functionality to work with dynamic content
  function updateFilterFunctionality() {
    const filterBtns = document.querySelectorAll("[data-filter-btn]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectValue = document.querySelector("[data-selecct-value]");
    
    // Enhanced filter function
    const filterFunc = function (selectedValue) {
      const filterItems = document.querySelectorAll("[data-filter-item]");
      
      for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
          filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
          filterItems[i].classList.add("active");
        } else {
          filterItems[i].classList.remove("active");
        }
      }
    };

    // Add event listeners to filter buttons for large screen
    let lastClickedBtn = filterBtns[0];
    
    filterBtns.forEach((btn, i) => {
      btn.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) {
          selectValue.innerText = this.innerText;
        }
        filterFunc(selectedValue);

        if (lastClickedBtn) {
          lastClickedBtn.classList.remove("active");
        }
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });

    // Add event listeners to select items for mobile
    selectItems.forEach(item => {
      item.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) {
          selectValue.innerText = this.innerText;
        }
        if (select) {
          elementToggleFunc(select);
        }
        filterFunc(selectedValue);
      });
    });
  }

  // Call updateFilterFunctionality after projects are loaded
  window.addEventListener('load', function() {
    setTimeout(updateFilterFunctionality, 100); // Small delay to ensure projects are rendered
  });
});