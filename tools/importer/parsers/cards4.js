/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing the cards
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children);

  // Start the table with the block name header
  const tableRows = [['Cards']];

  // Process each card (li element)
  cards.forEach((card) => {
    // Image cell: use <picture> if present, otherwise <img>
    let imageCell = '';
    const imageDiv = card.querySelector('.cards-card-image');
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text cell: gather <strong> and other <p> elements from .cards-card-body
    const bodyDiv = card.querySelector('.cards-card-body');
    const bodyElements = [];
    if (bodyDiv) {
      // Title row (strong)
      const strong = bodyDiv.querySelector('strong');
      if (strong) {
        // Use the parent <p> if possible for the title
        const strongParent = strong.parentElement;
        if (
          strongParent.tagName === 'P' &&
          strongParent.parentElement === bodyDiv
        ) {
          bodyElements.push(strongParent);
        } else {
          // Otherwise, wrap strong in <p>
          const p = document.createElement('p');
          p.appendChild(strong);
          bodyElements.push(p);
        }
      }
      // Description rows
      Array.from(bodyDiv.children).forEach((child) => {
        // Skip <p> that only contains <strong> (already included)
        if (
          child.tagName === 'P' &&
          child.querySelector('strong') &&
          child.childNodes.length === 1
        ) {
          return;
        }
        // Add any other <p> or element
        if (child.tagName === 'P') {
          bodyElements.push(child);
        }
      });
    }

    // Add the row: image cell and text cell
    tableRows.push([
      imageCell || '',
      bodyElements.length === 1 ? bodyElements[0] : bodyElements
    ]);
  });

  // Create and insert the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
