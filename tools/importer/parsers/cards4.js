/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Header row as per spec
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image container and body container
    const imageDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Defensive: ensure both exist
    if (!imageDiv || !bodyDiv) return;

    // Image cell: use the entire imageDiv (contains <picture> and <img>)
    const imageCell = imageDiv;

    // Text cell: use the entire bodyDiv (contains <p><strong>...</strong></p> and description)
    const textCell = bodyDiv;

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
