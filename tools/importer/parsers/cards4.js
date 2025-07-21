/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 'cards block' root
  let block = element.querySelector('.cards.block');
  if (!block) block = element;

  // Find the <ul> containing the cards
  const ul = block.querySelector('ul');
  if (!ul) return;

  // Find all direct <li> as cards
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  const rows = [ ['Cards'] ]; // Header row as in example

  lis.forEach((li) => {
    // Image cell: get the <picture> or <img> in .cards-card-image
    let imgCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      imgCell = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
    }

    // Text/body cell: get the .cards-card-body contents
    let bodyCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use the div itself, as it contains <p> and <strong> preserving structure
      bodyCell = bodyDiv;
    }

    // Edge case: always put a cell, even if image or body is missing
    rows.push([
      imgCell || '',
      bodyCell || ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
