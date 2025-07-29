/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the cards block (could be wrapped by another container)
  let block = element;
  if (!block.classList.contains('cards')) {
    block = element.querySelector('.cards.block');
  }
  if (!block) return;
  const ul = block.querySelector('ul');
  if (!ul) return;

  const lis = Array.from(ul.children);
  const cells = [['Cards']]; // Header row as in example

  lis.forEach(li => {
    // Image cell
    let imageCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Prefer picture, else whatever is inside (robust for future variants)
      const picture = imgDiv.querySelector('picture');
      imageCell = picture || imgDiv;
    }
    // Text cell
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use the bodyDiv as-is for resilience
      textCell = bodyDiv;
    }
    // Only add if at least one cell has content
    if (imageCell || textCell) {
      cells.push([imageCell, textCell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
