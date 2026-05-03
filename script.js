const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const header = document.querySelector(".site-header");

function getHeaderOffset() {
  return header ? header.offsetHeight + 8 : 0;
}

function openMenu() {
  if (!mobileMenu || !menuOverlay) return;
  mobileMenu.classList.add("open");
  menuOverlay.classList.add("show");
  mobileMenu.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  if (!mobileMenu || !menuOverlay) return;
  mobileMenu.classList.remove("open");
  menuOverlay.classList.remove("show");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
}

if (menuToggle) {
  menuToggle.addEventListener("click", openMenu);
}

if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

const navLinks = document.querySelectorAll("[data-mobile-menu] a[href]");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const rawHref = link.getAttribute("href");
    if (!rawHref) return;

    const href = rawHref.trim();
    const linkUrl = new URL(href, window.location.href);
    const isSamePage =
      linkUrl.origin === window.location.origin &&
      linkUrl.pathname === window.location.pathname;

    if (isSamePage && linkUrl.hash) {
      const target = document.querySelector(linkUrl.hash);
      if (!target) {
        closeMenu();
        return;
      }

      event.preventDefault();
      closeMenu();

      setTimeout(() => {
        const targetTop =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          getHeaderOffset();

        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });

        history.replaceState(null, "", linkUrl.hash);
      }, 250);
      return;
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