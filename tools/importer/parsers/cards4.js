/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards.block container inside the wrapper if present
  let block = element.querySelector('.cards.block');
  if (!block) block = element;

  // Find the <ul> with <li>s (each card)
  const ul = block.querySelector('ul');
  const lis = ul ? Array.from(ul.children) : [];

  const rows = [];
  // Header row as per the example
  rows.push(['Cards']);

  lis.forEach(li => {
    // Get image/icon (mandatory, first cell)
    let imageCell = null;
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Use the <picture> if present, else <img>
      const pic = imageDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Get text content (mandatory, second cell)
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      textCell = bodyDiv;
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
