/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (could be element itself or a child)
  let block = element.querySelector('.cards.block');
  if (!block) block = element;
  const ul = block.querySelector('ul');
  if (!ul) return;

  // Table header exactly as example
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Each card is a row with 2 cells: image | text content
  ul.querySelectorAll('li').forEach((li) => {
    // Image cell: use <picture> directly when present
    let imgCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imgCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // Text cell: use the .cards-card-body block
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use bodyDiv directly to preserve formatting (strong, p, etc)
      textCell = bodyDiv;
    }

    rows.push([imgCell, textCell]);
  });

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
