/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual 'cards' block if a wrapper is present
  let block = element;
  if (!block.classList.contains('block')) {
    block = element.querySelector('.cards.block');
  }
  if (!block) return;
  // Locate the <ul> containing all cards
  const ul = block.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // <li> elements

  // Prepare the header row exactly as in the example
  const rows = [['Cards (cards4)']];

  cards.forEach(card => {
    // Extract image or icon for the first cell
    let imageCell = '';
    const imageDiv = card.querySelector('.cards-card-image');
    if (imageDiv) {
      // Use the <picture> if present, else <img>
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Extract text content for the second cell
    let textCell = '';
    const textDiv = card.querySelector('.cards-card-body');
    if (textDiv) {
      textCell = textDiv;
    } else {
      // Fallback: aggregate all non-imageDiv children
      const tempDiv = document.createElement('div');
      Array.from(card.children).forEach(child => {
        if (child !== imageDiv) tempDiv.appendChild(child);
      });
      textCell = tempDiv.childNodes.length ? tempDiv : '';
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
