/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Header row as per block guidelines
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image/icon (mandatory)
    const imageDiv = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageDiv) {
      // Use the <picture> or <img> directly
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // fallback: try img
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Find text content (mandatory)
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) {
      // Use the entire bodyDiv as the cell content
      textCell = bodyDiv;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
