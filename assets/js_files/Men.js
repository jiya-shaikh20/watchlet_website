let watchesData = []; // Global array to store fetched data

// Function to render cards based on filters
function renderCards(containerId, category, watches, brandFilter = 'all', sort = 'default') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ""; // Clear previous cards

  // Filter by category
  let filtered = watches.filter(watch => watch.category === category);

  // Optional filter by brand
  if (brandFilter !== 'all') {
    filtered = filtered.filter(watch =>
      watch.brand?.toLowerCase() === brandFilter.toLowerCase()
    );
  }

  // Optional sort
  if (sort === 'asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  // If no results
  if (filtered.length === 0) {
    container.innerHTML = `<p>No watches found for selected filters.</p>`;
    return;
  }

  // Render each card
  filtered.forEach((watch, index) => {
    const card = document.createElement("div");
    card.className = "watches__card";

    const detailId = `${containerId}-detail-${index}`;

    card.innerHTML = `
      ${watch.new ? `<span>NEW</span>` : ''}
      <img src="assets/images/${watch.image.replace(/^.*[\/]/, '')}" alt="${watch.title}" />
      <h4>${watch.title}</h4>
      <p>$${watch.price}</p>
      <a href="#" class="learn-more btn" data-id="${detailId}">Learn More →</a>
      <div id="${detailId}" class="extra-details" style="display: none; margin-top: 0.5rem; color: #374151;">
        ${watch.details}
      </div>
      <button class="btn add__cart">ADD TO CART</button>
    `;

    container.appendChild(card);
  });

  // Toggle "Learn More" content
  container.querySelectorAll('.learn-more').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const detailBox = document.getElementById(this.dataset.id);
      if (detailBox) {
        const isVisible = detailBox.style.display === 'block';
        detailBox.style.display = isVisible ? 'none' : 'block';
        this.textContent = isVisible ? 'Learn More →' : 'Show Less ←';
      }
    });
  });
}

// Function to bind filter/sort events
function bindFilters() {
  const brandFilter = document.getElementById('brandFilter');
  const sortPrice = document.getElementById('sortPrice');

  function update() {
    const selectedBrand = brandFilter?.value || 'all';
    const selectedSort = sortPrice?.value || 'default';
    renderCards("mensContainer", "men", watchesData, selectedBrand, selectedSort);
  }

  if (brandFilter) brandFilter.addEventListener('change', update);
  if (sortPrice) sortPrice.addEventListener('change', update);
}

// Load data and initialize everything
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("watches.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    watchesData = await response.json();

    renderCards("mensContainer", "men", watchesData);
    bindFilters();
  } catch (error) {
    console.error("Error loading watches.json:", error);
  }
});
