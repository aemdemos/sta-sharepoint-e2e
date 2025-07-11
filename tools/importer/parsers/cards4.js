/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the <ul> of cards. Assume only one relevant <ul>.
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // li elements

  // Header row as specified
  const rows = [['Cards']];

  // Process each card (li)
  cards.forEach((li) => {
    // Get image (picture or img)
    let imgCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Prefer picture, fallback to img
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imgCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // Get text content (all of body div, including markup)
    let bodyCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      bodyCell = bodyDiv;
    }

    // Add row (image cell, text cell)
    rows.push([imgCell, bodyCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
