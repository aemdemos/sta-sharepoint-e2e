/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the block root: either .cards or a .cards-wrapper containing .cards
  let block = element.querySelector('.cards');
  if (!block) {
    if (element.classList.contains('cards')) {
      block = element;
    } else if (element.classList.contains('cards-wrapper')) {
      block = element.querySelector('.cards');
    } else {
      // Fallback: check for data-block-name
      block = element.querySelector('[data-block-name="cards"]');
    }
  }
  if (!block) return;

  // Get card list
  const ul = block.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.nodeName === 'LI');

  // Prepare rows
  const rows = [];
  rows.push(['Cards (cards4)']);

  lis.forEach(li => {
    // IMAGE CELL: Find .cards-card-image
    let imgCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // reference the <picture> or <img> directly
      const pic = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
      imgCell = pic || imgDiv;
    }
    // TEXT CELL: Find .cards-card-body
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      textCell = bodyDiv;
    }
    rows.push([imgCell, textCell]);
  });

  // Create the table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
