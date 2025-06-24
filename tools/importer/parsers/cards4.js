/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (may be wrapped)
  let block = element;
  if (!block.classList.contains('cards')) {
    block = element.querySelector('.cards.block');
  }
  if (!block) return;

  // Cards are in a <ul><li>...</li></ul>
  const ul = block.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Build the rows for the table
  const rows = [];
  rows.push(['Cards']); // Header matches example exactly

  lis.forEach(li => {
    // Each li has .cards-card-image and .cards-card-body
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');
    if (!imgDiv || !bodyDiv) return;

    // Use the picture or img element for the image cell
    let imgEl = imgDiv.querySelector('picture,img');
    if (!imgEl) imgEl = imgDiv;

    // Use the bodyDiv directly for the text cell
    rows.push([imgEl, bodyDiv]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
