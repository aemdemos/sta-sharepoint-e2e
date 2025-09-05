/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Prepare the header row as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each <li> (card)
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Defensive: find image container and body
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Defensive: get the image (as <picture> or <img>)
    let imageEl = null;
    if (imgDiv) {
      // Prefer <picture> if present, else <img>
      imageEl = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
    }

    // Defensive: get the text content (body)
    // We'll use the entire bodyDiv as the text cell
    let textEl = null;
    if (bodyDiv) {
      textEl = bodyDiv;
    }

    // Only add the row if at least image and text are present
    if (imageEl && textEl) {
      rows.push([imageEl, textEl]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
