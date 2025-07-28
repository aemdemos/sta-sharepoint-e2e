/* global WebImporter */
export default function parse(element, { document }) {
  // Find the UL within the cards block
  // The input HTML always contains a .cards.block > ul
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header
  const rows = [['Cards']];

  // Process each LI (card)
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // First cell: image/icon
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Use the <picture> element directly if present
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else if (imageDiv.firstElementChild) {
        imageCell = imageDiv.firstElementChild;
      } else if (imageDiv.textContent.trim()) {
        imageCell = document.createTextNode(imageDiv.textContent);
      }
    }
    // Second cell: text content
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use the body div directly to preserve <p>/<strong> structure
      textCell = bodyDiv;
    }
    rows.push([imageCell, textCell]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
