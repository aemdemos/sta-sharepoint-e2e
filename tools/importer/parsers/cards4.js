/* global WebImporter */
export default function parse(element, { document }) {
  // The block name header matches exactly: 'Cards'
  const rows = [['Cards']];

  // Get the card elements (li elements under ul)
  const ul = element.querySelector('ul');
  if (!ul) return;

  ul.querySelectorAll(':scope > li').forEach((li) => {
    // First column: image/icon
    let imageCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Prefer the <picture> element directly
      const picture = imgDiv.querySelector('picture');
      imageCell = picture || imgDiv;
    }
    // Second column: text content
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Reference the body div directly (contains all text for the card)
      textCell = bodyDiv;
    }
    rows.push([imageCell, textCell]);
  });

  // Create the Cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
