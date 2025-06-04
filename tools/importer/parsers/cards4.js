/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block that contains the <ul>
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // Prepare the header row exactly as per requirements
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  lis.forEach((li) => {
    // Each li should have .cards-card-image and .cards-card-body as direct children
    const imageDiv = li.querySelector('.cards-card-image') || document.createElement('div');
    const bodyDiv = li.querySelector('.cards-card-body') || document.createElement('div');
    // Reference the elements directly (do not clone)
    rows.push([imageDiv, bodyDiv]);
  });

  // Create table with the proper structure
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
