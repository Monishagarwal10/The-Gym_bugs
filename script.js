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

document.querySelectorAll("[data-close-menu]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href") || "";
    const hasHash = href.includes("#");

    if (hasHash) {
      const hash = `#${href.split("#")[1]}`;
      const target = document.querySelector(hash);

      // Keep mobile navigation reliable for all section links.
      if (target) {
        event.preventDefault();
        closeMenu();

        const header = document.querySelector(".site-header");
        const headerOffset = header ? header.offsetHeight + 8 : 0;
        const targetTop =
          target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({ top: targetTop, behavior: "smooth" });
        history.replaceState(null, "", hash);
        return;
      }
    }

    closeMenu();
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
