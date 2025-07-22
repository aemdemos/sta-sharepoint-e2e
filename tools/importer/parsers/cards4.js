/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Locate the cards block. The given element is the wrapper div, so get the block inside it
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  // 2. Get all card li elements
  const lis = ul.querySelectorAll(':scope > li');

  // 3. Build rows for the table: header, then one row for each card with image and content
  const rows = [['Cards']];

  lis.forEach((li) => {
    // Left cell: picture (image)
    let imageCell = '';
    const imgContainer = li.querySelector('.cards-card-image');
    if (imgContainer) {
      // Use the <picture> element directly if present
      const pic = imgContainer.querySelector('picture');
      if (pic) imageCell = pic;
      else {
        // fallback, just in case
        const img = imgContainer.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Right cell: card body content (preserve all block-level nodes, maintain order)
    let bodyCell;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Collect all direct children: if multiple, send as array, else the node
      const nodes = Array.from(bodyDiv.childNodes).filter(
        n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())
      );
      if (nodes.length > 1) bodyCell = nodes;
      else if (nodes.length === 1) bodyCell = nodes[0];
      else bodyCell = '';
    } else {
      bodyCell = '';
    }
    rows.push([imageCell, bodyCell]);
  });

  // 4. Create the table with the rows
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace the wrapper element with the table
  element.replaceWith(table);
}
