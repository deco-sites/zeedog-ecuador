export const menuItemHover = () => `
  if (globalThis.window && document) {
    const menuMother = document.querySelectorAll(".menu-mother");
    [...menuMother].forEach(item => {
      const menuImg = item.querySelector('.menuimg-banner');
      const menuLinks = item.querySelectorAll('.menu-link-dk');
      [...menuLinks, item].forEach(link => {
        if (menuImg && link.hasAttribute('data-imgsrc')) {
          link.addEventListener('mouseenter', () => {
            menuImg.src = link.dataset.imgsrc;
            menuImg.alt = "Menu " + link.innerText + " - Zee.Dog";
          });
        }
      });
    });
  }
`;

export const menuNewsItemHover = () => `
  if (globalThis.window && document) {
    const newsSections = document.querySelectorAll(".news-submenu-section");
    if (newsSections && newsSections.length > 0) {
      [...newsSections].forEach(section => {
        const newsMenuDivisions = section.querySelectorAll(".news-menu-division-dk");
        const newsSubmenus = section.querySelectorAll(".news-submenu-columns-dk");
        const arrow = section.querySelector(".menu-news-arrow");
        arrow.style.top = "8px";
        [...newsMenuDivisions].forEach((division, index) => {
          division.addEventListener("mouseenter", (event) => {
            const menuDivisionId = division.dataset.menuDivisionId;
            arrow.style.top = (index * 46) + 8 +"px";
            [...newsSubmenus].forEach((submenu) => {
              if (menuDivisionId === submenu.dataset.submenuNewsId) {
                submenu.classList.remove("hidden");
                submenu.classList.add("flex");
              } else {
                submenu.classList.remove("flex");
                submenu.classList.add("hidden");
              }
            });
          });
        });
      });
    }
  }
`;
