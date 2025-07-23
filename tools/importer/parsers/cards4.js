/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  const rows = [];
  // Header row as in the example
  rows.push(['Cards']);

  lis.forEach(li => {
    // Find image or icon in the first column
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Use entire <picture> element for best browser compatibility
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // fallback: use the img
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Find the card body
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Reference the entire body (to preserve headings, formatting, etc)
      textCell = bodyDiv;
    }
    // Only add row if both image and text exist
    if (imageCell && textCell) {
      rows.push([imageCell, textCell]);
    }
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
