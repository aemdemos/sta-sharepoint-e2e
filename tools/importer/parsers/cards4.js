/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards (there should be one ul in the selected block)
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children).filter((li) => li.tagName === 'LI');

  // Build the header row per requirements (must match exactly)
  const rows = [['Cards']];

  // Each card becomes a table row with two cells: image, then text content
  cards.forEach((li) => {
    // Image cell: reference the <picture> element (which contains <img> and <source>)
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const pic = imgDiv.querySelector('picture');
      if (pic) imageCell = pic;
    }

    // Text cell: collect all elements in the .cards-card-body div
    let textCell = [];
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use all children nodes in order (to preserve strong, p, etc.)
      textCell = Array.from(bodyDiv.childNodes).filter(
        (node) => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      );
      // If only one element, don't wrap in array
      if (textCell.length === 1) textCell = textCell[0];
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
