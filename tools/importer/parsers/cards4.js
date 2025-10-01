/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the actual cards block (not wrapper)
  let block = element;
  if (!block.classList.contains('block')) {
    block = element.querySelector('.block');
    if (!block) return;
  }

  // Find all cards (li elements)
  const list = block.querySelector('ul');
  if (!list) return;
  const items = Array.from(list.children);

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card, extract image and body
  items.forEach((li) => {
    // Defensive: get image container and body container
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Get image element (prefer <img> inside <picture>)
    let imgEl = null;
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        // Use the <img> inside <picture>
        imgEl = picture.querySelector('img');
      }
    }

    // Defensive: if no image, skip this card
    if (!imgEl) return;

    // For text content: use all children of bodyDiv
    let textEls = [];
    if (bodyDiv) {
      textEls = Array.from(bodyDiv.children);
    }

    // Compose row: image in first cell, text in second
    rows.push([
      imgEl,
      textEls
    ]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(table);
}
