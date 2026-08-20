const images = [
  { title: "Morning in the mountains", category: "Nature", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85", alt: "Sunlit mountain peaks under a clear sky" },
  { title: "The quiet forest", category: "Nature", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85", alt: "Tall green trees in a peaceful forest" },
  { title: "A perfect coastline", category: "Travel", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85", alt: "Turquoise water meeting a sandy tropical beach" },
  { title: "Desert road trip", category: "Travel", url: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=900&q=85", alt: "A road winding through a golden desert landscape" },
  { title: "Wild and free", category: "Animals", url: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=85", alt: "Brown horse standing in a grassy field" },
  { title: "Ocean wanderer", category: "Animals", url: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=900&q=85", alt: "Sea turtle swimming through blue ocean water" },
  { title: "Lines of the city", category: "Travel", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=85", alt: "City skyline with modern buildings at twilight" },
  { title: "Ideas in motion", category: "Technology", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85", alt: "Close-up of a glowing circuit board" },
  { title: "A new perspective", category: "Technology", url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=85", alt: "Laptop computer displaying colorful code" },
  { title: "Among the wildflowers", category: "Nature", url: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85", alt: "Bright green leaves and plants in natural light" },
  { title: "Alpine reflections", category: "Nature", url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85", alt: "Mountain reflected in a calm blue lake" },
  { title: "Golden hour companion", category: "Animals", url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=85", alt: "Happy dog enjoying a sunny outdoor walk" },
  { title: "Into the blue", category: "Travel", url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=85", alt: "Person looking across a bright blue sea" },
  { title: "Future flora", category: "Technology", url: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=900&q=85", alt: "Robot hand reaching toward a green plant" }
];

const galleryGrid = document.querySelector("#gallery-grid");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const filterButtons = document.querySelectorAll(".filter-button");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxCategory = document.querySelector("#lightbox-category");
const lightboxCount = document.querySelector("#lightbox-count");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");

let activeCategory = "All";
let visibleImages = [...images];
let currentIndex = 0;

function renderGallery() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  visibleImages = images.filter((image) => {
    const matchesCategory = activeCategory === "All" || image.category === activeCategory;
    const matchesSearch = `${image.title} ${image.category}`.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  galleryGrid.innerHTML = visibleImages.map((image, index) => `
    <article class="gallery-card" style="animation-delay: ${index * 35}ms">
      <button class="card-button" type="button" data-index="${index}" aria-label="Open ${image.title} image">
        <div class="card-image-wrap">
          <img class="card-image" src="${image.url}" alt="${image.alt}" loading="lazy">
        </div>
        <div class="card-copy">
          <div>
            <span class="card-category">${image.category}</span>
            <h3 class="card-title">${image.title}</h3>
          </div>
          <span class="card-arrow" aria-hidden="true">↗</span>
        </div>
      </button>
    </article>
  `).join("");

  emptyState.hidden = visibleImages.length > 0;
  galleryGrid.hidden = visibleImages.length === 0;
  galleryGrid.querySelectorAll(".card-button").forEach((button) => {
    button.addEventListener("click", () => openLightbox(Number(button.dataset.index)));
  });
}

function openLightbox(index) {
  if (!visibleImages.length) return;
  currentIndex = index;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  const image = visibleImages[currentIndex];
  lightboxImage.src = image.url;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = image.title;
  lightboxCategory.textContent = image.category;
  lightboxCount.textContent = `${currentIndex + 1} / ${visibleImages.length}`;
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  updateLightbox();
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  updateLightbox();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((filter) => filter.classList.toggle("active", filter === button));
    renderGallery();
  });
});

searchInput.addEventListener("input", renderGallery);
previousButton.addEventListener("click", showPreviousImage);
nextButton.addEventListener("click", showNextImage);
lightbox.querySelectorAll("[data-close-lightbox]").forEach((element) => element.addEventListener("click", closeLightbox));

document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNextImage();
  if (event.key === "ArrowLeft") showPreviousImage();
});

renderGallery();
