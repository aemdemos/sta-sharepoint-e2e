/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual cards block (in case 'element' is a wrapper)
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) {
    // Maybe element itself is the block
    if (element.classList.contains('cards') && element.classList.contains('block')) {
      cardsBlock = element;
    } else {
      return;
    }
  }

  const cells = [];
  // Header row as in the example
  cells.push(['Cards']);

  // Find all <li> card items
  const lis = cardsBlock.querySelectorAll('ul > li');
  lis.forEach(li => {
    // IMAGE CELL
    let imageCell = null;
    const imageDiv = Array.from(li.children).find(child => child.classList.contains('cards-card-image'));
    if (imageDiv) {
      // Use the <picture> or <img> directly from the DOM
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // TEXT CELL
    let textCell = null;
    const bodyDiv = Array.from(li.children).find(child => child.classList.contains('cards-card-body'));
    if (bodyDiv) {
      // Use the bodyDiv directly; it contains the <p><strong>...</strong></p> and second <p> description
      textCell = bodyDiv;
    } else {
      // Fallback to empty div if not found
      textCell = document.createElement('div');
    }

    cells.push([imageCell, textCell]);
  });

  // Create the table and replace the block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
