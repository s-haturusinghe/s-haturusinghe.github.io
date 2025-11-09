// On the News Page Functionality
document.addEventListener("DOMContentLoaded", function() {
  let featuredData = {};

  // Load featured articles data from JSON file
  async function loadFeaturedData() {
    try {
      const response = await fetch('../assets/data/featured-on.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      featuredData = await response.json();
      generateFeaturedCards();
    } catch (error) {
      console.error('Failed to load featured data:', error);
      // Fallback data in case JSON loading fails
      featuredData = {
        article1: {
          title: "Featured Articles Unavailable",
          description: "Unable to load featured articles data. Please try again later.",
          thumbnail: "../assets/images/place.webp",
          url: "#",
          source: "N/A",
          date: "N/A"
        }
      };
      generateFeaturedCards();
    }
  }

  // Generate featured article cards dynamically
  function generateFeaturedCards() {
    const featuredList = document.getElementById('featured-list');
    if (!featuredList) return;

    featuredList.innerHTML = ''; // Clear existing content

    Object.entries(featuredData).forEach(([articleId, article]) => {
      const featuredItem = document.createElement('li');
      featuredItem.className = 'featured-item';

      featuredItem.innerHTML = `
        <div class="featured-card">
          <figure class="featured-img">
            <img src="${article.thumbnail}" alt="${article.title}" loading="lazy">
          </figure>

          <div class="featured-content">
            <h3 class="featured-title">${article.title}</h3>
            <p class="featured-source">${article.source} • ${article.date}</p>
            <p class="featured-description">${article.description}</p>
            <a href="${article.url}" class="read-more-btn" target="_blank" rel="noopener noreferrer">
              Read Article <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      `;

      featuredList.appendChild(featuredItem);
    });
  }

  // Load data on page load
  loadFeaturedData();
});
