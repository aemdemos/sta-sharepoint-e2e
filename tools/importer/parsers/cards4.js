/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards block
  const cardsBlock = element.querySelector('.cards.block, [data-block-name="cards"]');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const cardItems = ul.querySelectorAll(':scope > li');
  const rows = [];
  // Header row: a single cell (will visually span both columns in rendering)
  rows.push(['Cards']);
  // Each card row: [image/icon, text content]
  cardItems.forEach((li) => {
    let imageCell = null;
    const imgDiv = li.querySelector(':scope > .cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      const img = imgDiv.querySelector('img');
      imageCell = picture || img || null;
    }
    let textCell = null;
    const bodyDiv = li.querySelector(':scope > .cards-card-body');
    if (bodyDiv) {
      textCell = bodyDiv;
    }
    rows.push([imageCell, textCell]);
  });
  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Ensure the header cell spans two columns if table has more than one column
  const headerRow = table.querySelector('tr');
  if (headerRow && headerRow.children.length === 1 && rows.length > 1 && rows[1].length === 2) {
    headerRow.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
