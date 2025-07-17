/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct descendant with class 'cards block' (sometimes element itself)
  let block = element.querySelector(':scope > .cards.block') || element;
  // Get the <ul> containing the cards
  const ul = block.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Header row should have two cells, to match the data rows
  const rows = [['Cards', '']];

  for (const li of cards) {
    const imgDiv = li.querySelector(':scope > .cards-card-image');
    const bodyDiv = li.querySelector(':scope > .cards-card-body');
    const imgCell = imgDiv || document.createElement('div');
    const bodyCell = bodyDiv || document.createElement('div');
    rows.push([imgCell, bodyCell]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
