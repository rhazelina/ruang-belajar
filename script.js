function initMobileNav() {
  const toggles = document.querySelectorAll("[data-menu-toggle]");

  toggles.forEach((toggle) => {
    const targetId = toggle.getAttribute("data-menu-toggle");
    const menu = document.getElementById(targetId);
    if (!menu) return;

    const closeMenu = () => {
      menu.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.dataset.open === "true";
      menu.dataset.open = isOpen ? "false" : "true";
      toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) {
        closeMenu();
      }
    });
  });
}

function initActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = (link.getAttribute("href") || "").replace(/^\.\//, "");
    const isCurrent = href === path;
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveNav();
});
