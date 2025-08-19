/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing all cards, robust to variations
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Prepare table rows: header and card rows
  const rows = [['Cards']];

  lis.forEach((li) => {
    // Get the image/icon cell
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Prefer picture if available, else img
      let picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        let img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Get the text cell
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use existing bodyDiv (contains <p> with <strong>, etc.)
      textCell = bodyDiv;
    }
    rows.push([imageCell, textCell]);
  });

  // Create the block table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
