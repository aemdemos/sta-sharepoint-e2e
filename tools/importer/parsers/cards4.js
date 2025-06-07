/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block: it could be the element itself or a descendant
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock && element.classList.contains('cards') && element.classList.contains('block')) {
    cardsBlock = element;
  }
  if (!cardsBlock) return;

  // Get all <li> elements (cards)
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Prepare table structure: header first
  const rows = [['Cards (cards4)']];

  lis.forEach((li) => {
    // Extract image cell: .cards-card-image > picture (or whatever is inside)
    const imageDiv = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageDiv) {
      // Reference the existing picture or image div
      imageCell = imageDiv;
    }

    // Extract text cell: .cards-card-body content
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) {
      // If there are multiple <p> or elements, put them all in an array, preserving structure
      const nodes = Array.from(bodyDiv.childNodes).filter(n => (n.nodeType === 1 && n.textContent.trim()) || (n.nodeType === 3 && n.textContent.trim()));
      textCell = nodes.length > 1 ? nodes : (nodes[0] || '');
    }

    rows.push([imageCell, textCell]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
