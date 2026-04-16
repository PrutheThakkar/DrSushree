(function () {
  "use strict";

  // ── Obstetrics-top: Accordion + Image Crossfade ─────────
  const section = document.querySelector(".Obstetrics-top");
  if (!section) return;

  const items  = section.querySelectorAll(".philosophy-labels__item");
  const images = section.querySelectorAll(".philosophy-img");
  let current  = 0;

  function switchTo(index) {
    if (index === current) return;

    // Close current accordion
    items[current].classList.remove("philosophy-labels__item--active");

    // Crossfade image
    images[current].classList.remove("philosophy-img--active");
    images[index].classList.add("philosophy-img--active");

    // Open new accordion
    items[index].classList.add("philosophy-labels__item--active");

    current = index;
  }

  items.forEach(function (item) {
    item.querySelector(".expand-btn").addEventListener("click", function () {
      switchTo(Number(item.dataset.index));
    });
  });

})();