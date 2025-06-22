// Render each card
filtered.forEach((watch, index) => {
  const card = document.createElement("div");
  card.className = "watches__card";

  const detailId = `${containerId}-detail-${index}`;

  // Extract just the filename from watch.image and prepend the correct path
  const imageFilename = watch.image.split('/').pop();
  const imagePath = `assets/images/${imageFilename}`;

  card.innerHTML = `
    ${watch.new ? `<span>NEW</span>` : ''}
    <img src="${imagePath}" alt="${watch.title}" />
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
 