/* global WebImporter */
export default function parse(element, { document }) {
  // Get the <ul> containing cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children);
  // Build the header row as in the example
  const rows = [['Cards (cards4)']];
  // For each card, extract the image and text content
  cards.forEach((li) => {
    // The first column: image wrapper
    const imgDiv = li.querySelector('.cards-card-image');
    // The second column: text/body wrapper
    const bodyDiv = li.querySelector('.cards-card-body');
    // Only add row if both columns exist
    if (imgDiv && bodyDiv) {
      rows.push([imgDiv, bodyDiv]);
    }
  });
  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(table);
}
