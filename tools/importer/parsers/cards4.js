/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // <li> elements
  const cells = [['Cards']]; // Header row matches the example exactly

  cards.forEach(card => {
    // IMAGE CELL
    let imgCell = null;
    const imgWrapper = card.querySelector('.cards-card-image');
    if (imgWrapper) {
      // Use the full <picture>, not just <img>
      const picture = imgWrapper.querySelector('picture');
      if (picture) {
        imgCell = picture;
      } else {
        // fallback: use <img>
        const img = imgWrapper.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // TEXT CELL
    let textCell = null;
    const bodyWrapper = card.querySelector('.cards-card-body');
    if (bodyWrapper) {
      // Put all direct children in array; this preserves semantic meaning
      textCell = Array.from(bodyWrapper.childNodes);
    }

    // If either cell missing, still push row with whatever is present
    cells.push([imgCell, textCell]);
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
