const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuOverlay = document.querySelector("[data-menu-overlay]");

function openMenu() {
  if (!mobileMenu || !menuOverlay) return;
  mobileMenu.classList.add("open");
  menuOverlay.classList.add("show");
  mobileMenu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  if (!mobileMenu || !menuOverlay) return;
  mobileMenu.classList.remove("open");
  menuOverlay.classList.remove("show");
  mobileMenu.setAttribute("aria-hidden", "true");
}

if (menuToggle) menuToggle.addEventListener("click", openMenu);
if (menuClose) menuClose.addEventListener("click", closeMenu);
if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

const navLinks = document.querySelectorAll("[data-mobile-menu] a[href]");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const rawHref = link.getAttribute("href");
    if (!rawHref) return;

    const href = rawHref.trim();

    // ✅ CASE 1: Same page (#section)
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();

        const header = document.querySelector(".site-header");
        const headerOffset = header ? header.offsetHeight + 8 : 0;
        const targetTop =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset;

        window.scrollTo({ top: targetTop, behavior: "smooth" });
        history.replaceState(null, "", href);
      }

      closeMenu();
    }

    // ✅ CASE 2: Different page (about.html etc.)
    else {
      event.preventDefault(); // stop weird interruption

      closeMenu();

      // 🔥 Force navigation AFTER closing
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const filterButtons = document.querySelectorAll("[data-filter]");
const filterItems = document.querySelectorAll("[data-category]");

if (filterButtons.length && filterItems.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      filterItems.forEach((item) => {
        const itemCategory = item.dataset.category;
        const show = selected === "all" || itemCategory === selected;
        item.hidden = !show;
      });
    });
  });
}