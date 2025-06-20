/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards block (it's either the element itself or a descendant)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('block')) {
    cardsBlock = element.querySelector('.block');
  }
  if (!cardsBlock) return; // Defensive: nothing to parse
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = ul.querySelectorAll(':scope > li');

  const rows = [];
  rows.push(['Cards']); // Header exactly as in the example

  lis.forEach(li => {
    const imageDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');
    // Defensive: skip if either part is missing
    if (!imageDiv || !bodyDiv) return;
    // Reference the existing child elements directly
    rows.push([imageDiv, bodyDiv]);
  });

  // Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
