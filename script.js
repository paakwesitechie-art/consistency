
/* ========================================
   ÉLAN BOUTIQUE
   Product filtering and shopping bag demo
======================================== */

"use strict";

// Replace these sample products and prices
// with the boutique's real inventory before launch.

const products = [
  {
    id: 1,
    name: "The Everyday Blazer",
    category: "women",
    price: 450,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80",
    alt: "Tailored neutral blazer"
  },
  {
    id: 2,
    name: "The Modern Shirt",
    category: "men",
    price: 280,
    tag: "ESSENTIAL",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80",
    alt: "Modern men's shirt"
  },
  {
    id: 3,
    name: "The Weekend Bag",
    category: "accessories",
    price: 320,
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
    alt: "Contemporary fashion handbag"
  },
  {
    id: 4,
    name: "The Signature Dress",
    category: "women",
    price: 390,
    tag: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
    alt: "Elegant contemporary dress"
  },
  {
    id: 5,
    name: "The Essential Knit",
    category: "men",
    price: 260,
    tag: "",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80",
    alt: "Minimal everyday knitwear"
  },
  {
    id: 6,
    name: "The Classic Shades",
    category: "accessories",
    price: 180,
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
    alt: "Classic sunglasses"
  },
  {
    id: 7,
    name: "The Evening Edit",
    category: "women",
    price: 520,
    tag: "",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80",
    alt: "Elegant evening fashion"
  },
  {
    id: 8,
    name: "The Refined Jacket",
    category: "men",
    price: 480,
    tag: "LIMITED EDIT",
    image:
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=700&q=80",
    alt: "Refined men's outerwear"
  }
];

// Format sample prices in Ghana cedis.
const formatPrice = (price) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 2
  }).format(price);

const productGrid = document.querySelector("#product-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

let activeFilter = "all";
let shoppingBag = [];

// Render products safely using DOM elements.
function renderProducts() {
  if (!productGrid) return;

  const visibleProducts =
    activeFilter === "all"
      ? products
      : products.filter(
          (product) => product.category === activeFilter
        );

  productGrid.replaceChildren();

  if (visibleProducts.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "No products found in this collection.";
    productGrid.append(message);
    return;
  }

  visibleProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "product-image";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.alt;
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", () => {
      image.alt = "Product image unavailable";
      image.style.display = "none";
    }, { once: true });

    imageWrapper.append(image);

    if (product.tag) {
      const tag = document.createElement("span");
      tag.className = "product-tag";
      tag.textContent = product.tag;
      imageWrapper.append(tag);
    }

    const details = document.createElement("div");
    details.className = "product-details";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const addButton = document.createElement("button");
    addButton.className = "add-to-bag";
    addButton.type = "button";
    addButton.textContent = "+";
    addButton.setAttribute(
      "aria-label",
      `Add ${product.name} to demo bag`
    );

    addButton.addEventListener("click", () => {
      addToBag(product.id);
    });

    bottom.append(price, addButton);
    details.append(category, name, bottom);
    card.append(imageWrapper, details);
    productGrid.append(card);
  });
}

// Product category filtering.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive =
        filterButton.dataset.filter === activeFilter;

      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });

    renderProducts();
  });
});

// Demo shopping bag.
// This does not process payments or save orders.
function addToBag(productId) {
  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) return;

  shoppingBag.push(product);

  const total = shoppingBag.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const message =
    `${product.name} added to your demo bag. ` +
    `Items: ${shoppingBag.length}. ` +
    `Sample total: ${formatPrice(total)}.`;

  announce(message);
}

// Provide accessible feedback for user actions.
function announce(message) {
  let status = document.querySelector("#shop-status");

  if (!status) {
    status = document.createElement("p");
    status.id = "shop-status";
    status.className = "shop-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    const productsSection = document.querySelector("#products");

    if (productsSection) {
      productsSection.append(status);
    }
  }

  status.textContent = message;
}

// Mobile navigation.
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Collection cards select their matching category.
document.querySelectorAll("[data-category-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const category = link.dataset.categoryLink;

    activeFilter = category;

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === category;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    renderProducts();
  });
});

// Initialise the storefront.
renderProducts();