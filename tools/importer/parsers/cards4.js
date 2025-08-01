/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // Prepare the table rows, starting with the header
  const rows = [['Cards']];

  lis.forEach(li => {
    // IMAGE CELL
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Use the existing <picture> if present, else <img> if that's all there is
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // TEXT CELL
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Gather all children, retaining structure (e.g., <p>, <strong>)
      // Place all children in the cell in order
      textCell = Array.from(bodyDiv.childNodes);
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
