/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header as per requirements
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Defensive: find image container and body container
    const imageDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Defensive: if missing, skip this card
    if (!imageDiv || !bodyDiv) return;

    // First cell: image (use the whole imageDiv for resilience)
    // Second cell: text content (use the whole bodyDiv for resilience)
    rows.push([
      imageDiv,
      bodyDiv
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
