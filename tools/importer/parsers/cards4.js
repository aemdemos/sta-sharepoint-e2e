/* global WebImporter */
export default function parse(element, { document }) {
  // Get the .cards.block (could be the element itself or a child)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block') || element;
  }
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(el => el.tagName === 'LI');

  // Table header matches example: 'Cards'
  const rows = [['Cards']];
  lis.forEach((li) => {
    // First cell: the image (picture or img) from .cards-card-image
    const imgDiv = li.querySelector('.cards-card-image');
    let imageCell = null;
    if (imgDiv) {
      // reference the <picture> element directly if it exists, otherwise <img>
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Second cell: the body content from .cards-card-body
    const bodyDiv = li.querySelector('.cards-card-body');
    // reference bodyDiv directly if present
    let textCell = null;
    if (bodyDiv) textCell = bodyDiv;

    // Only add row if at least one cell has content
    if (imageCell || textCell) {
      rows.push([imageCell, textCell]);
    }
  });

  // Only create/replace if we have more than just the header
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
