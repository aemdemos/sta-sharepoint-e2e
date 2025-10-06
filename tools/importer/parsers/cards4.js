/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block (may be wrapped)
  let cardsBlock = element;
  // If this is a wrapper, find the inner block
  if (cardsBlock.classList.contains('cards-wrapper')) {
    const inner = cardsBlock.querySelector('.cards.block');
    if (inner) cardsBlock = inner;
  }

  // Find all card items
  const list = cardsBlock.querySelector('ul');
  if (!list) return;
  const items = Array.from(list.children);

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  items.forEach((li) => {
    // Defensive: get image cell
    const imageDiv = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageDiv) {
      // Find the <img> inside <picture>
      const img = imageDiv.querySelector('img');
      if (img) {
        imageCell = img;
      } else {
        // fallback: use whole picture if no img
        const pic = imageDiv.querySelector('picture');
        if (pic) imageCell = pic;
      }
    }

    // Defensive: get text cell
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) {
      // Use all children (usually two <p>s, first is title)
      const ps = Array.from(bodyDiv.children);
      if (ps.length) {
        textCell = ps;
      } else {
        textCell = bodyDiv;
      }
    }

    rows.push([imageCell, textCell]);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
