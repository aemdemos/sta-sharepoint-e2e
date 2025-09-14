/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header as specified
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each <li> (card)
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Defensive: get image container and body container
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Find the image or icon (mandatory)
    let imageEl = null;
    if (imgDiv) {
      // Use the entire picture element if present, else the image
      imageEl = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
    }

    // For text content, use the entire bodyDiv (contains title and description)
    let textContent = bodyDiv;

    // Defensive: only add row if both image and text exist
    if (imageEl && textContent) {
      rows.push([imageEl, textContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
