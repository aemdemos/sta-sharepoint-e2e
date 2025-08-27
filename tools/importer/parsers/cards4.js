/* global WebImporter */
export default function parse(element, { document }) {
  // Get the block root: look for the .cards.block inside the wrapper
  let block = element.querySelector('.cards.block');
  if (!block) {
    // Maybe the element itself is the block
    if (element.classList.contains('cards') && element.classList.contains('block')) {
      block = element;
    } else {
      // Maybe it's a <ul> directly
      block = element.querySelector('ul');
    }
  }
  if (!block) return;

  // The cards are li inside the <ul>
  const list = block.querySelector('ul');
  if (!list) return;
  const cards = Array.from(list.children);

  // Header row as in the example
  const headerRow = ['Cards'];

  // Build rows for each card
  const rows = cards.map((li) => {
    // Image/icon in first cell: preserve <picture> or <img>
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text content in second cell: preserve all formatting
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use the entire bodyDiv, preserving all its elements
      textCell = bodyDiv;
    }
    // If missing image or body, set as empty string to preserve cell
    return [imageCell || '', textCell || ''];
  });

  // Compose the table: header + card rows
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
