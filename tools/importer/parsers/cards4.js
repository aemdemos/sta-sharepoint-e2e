/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Header row as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card (li)
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image/icon (first cell)
    let imageCell = '';
    const imgWrapper = li.querySelector('.cards-card-image');
    if (imgWrapper) {
      // Use the <picture> element if present, else the <img>
      const picture = imgWrapper.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgWrapper.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Find text content (second cell)
    let textCell = '';
    const body = li.querySelector('.cards-card-body');
    if (body) {
      // Use the entire body div, which contains <p><strong>...</strong></p> and <p>...</p>
      textCell = body;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
