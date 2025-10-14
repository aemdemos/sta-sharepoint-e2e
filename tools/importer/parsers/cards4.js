/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (the direct child with class 'cards block')
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Prepare the table rows
  const rows = [];
  // Header row as per spec
  const headerRow = ['Cards (cards4)'];
  rows.push(headerRow);

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Image cell: find the image inside .cards-card-image
    const imgContainer = li.querySelector('.cards-card-image');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Text cell: get the .cards-card-body content, but only the inner HTML (not the wrapper)
    const bodyContainer = li.querySelector('.cards-card-body');
    let textContent = null;
    if (bodyContainer) {
      // Only use element children (no merging, no skipping)
      const frag = document.createDocumentFragment();
      Array.from(bodyContainer.childNodes).forEach((node) => {
        frag.appendChild(node.cloneNode(true));
      });
      textContent = frag;
    }

    // Only add row if both image and text are present
    if (imgEl && textContent) {
      rows.push([imgEl, textContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
