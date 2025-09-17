/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Process each card <li>
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image/icon cell
    const imgDiv = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imgDiv) {
      // Use the whole image div (contains <picture> and <img>)
      imageCell = imgDiv;
    }

    // Find text content cell
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) {
      // Use the body div directly (contains <p><strong>...</strong></p> and description <p>)
      textCell = bodyDiv;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
