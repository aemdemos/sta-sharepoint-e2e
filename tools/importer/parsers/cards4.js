/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main <ul> within the cards block
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // <li> elements

  // Prepare the cells for the block table
  const rows = [];
  // Header row: must match the example exactly
  rows.push(['Cards (cards4)']);

  cards.forEach((li) => {
    // First cell: the image or <picture> element
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      const img = imageDiv.querySelector('img');
      if (picture) {
        imageCell = picture;
      } else if (img) {
        imageCell = img;
      } else {
        imageCell = '';
      }
    }

    // Second cell: all the text content (preserving strong etc.)
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Direct children to preserve block structure
      textCell = Array.from(bodyDiv.childNodes);
    }

    rows.push([imageCell, textCell]);
  });

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
