/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // <li>s

  // Header row as per example
  const headerRow = ['Cards'];
  const tableRows = [headerRow];

  cards.forEach(card => {
    // Image cell
    let imageEl = null;
    const imgContainer = card.querySelector('.cards-card-image');
    if (imgContainer) {
      // Use <picture> if present for robustness, else <img>
      const picture = imgContainer.querySelector('picture');
      if (picture) imageEl = picture;
      else {
        const img = imgContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Text cell
    let textEls = [];
    const bodyContainer = card.querySelector('.cards-card-body');
    if (bodyContainer) {
      // Grab all block children (to preserve structure: <p>, <strong>, etc)
      textEls = Array.from(bodyContainer.children);
    }
    // edge case: if it's empty, don't break the structure
    if (textEls.length === 0) textEls = [''];

    tableRows.push([
      imageEl || '',
      textEls.length === 1 ? textEls[0] : textEls
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
