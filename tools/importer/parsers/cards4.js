/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual .cards.block - may be wrapped in a .cards-wrapper
  let cardsBlock = element.classList.contains('cards-wrapper')
    ? element.querySelector('.cards.block')
    : element;
  if (!cardsBlock) return;

  // Get all <li> cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.nodeName === 'LI');

  // Table header
  const rows = [['Cards']];

  // Each card: [image/icon, text content]
  lis.forEach((li) => {
    // IMAGE or ICON (first cell)
    let imageCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Find the <picture> element if present
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture; // keep reference to DOM element
      }
    }
    // TEXT CONTENT (second cell)
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Retain all child nodes (including <p>, <strong>, etc.)
      // Remove empty text nodes
      const children = Array.from(bodyDiv.childNodes).filter(
        node => node.nodeType !== Node.TEXT_NODE || node.textContent.trim()
      );
      textCell = children;
    }
    rows.push([imageCell, textCell]);
  });

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
