/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards.block inside the wrapper
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Get all direct <li> children, each representing a card
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // Prepare the rows array for the table
  const rows = [];
  // First row: table header, matching example exactly
  rows.push(['Cards (cards4)']);

  cardItems.forEach((li) => {
    // Image cell
    let imageCell = null;
    const imageDiv = li.querySelector(':scope > .cards-card-image');
    if (imageDiv) {
      // Use the <picture> if present, otherwise <img>
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text cell
    const bodyDiv = li.querySelector(':scope > .cards-card-body');
    let textCell = [];
    if (bodyDiv) {
      // Only include element nodes (e.g., <p>, <strong>)
      const children = Array.from(bodyDiv.childNodes).filter(n => n.nodeType === 1);
      if (children.length) {
        textCell = children;
      } else {
        // fallback: just use the div if no children
        textCell = [bodyDiv];
      }
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
