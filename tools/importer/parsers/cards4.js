/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Get all <li> elements (each is a card)
  const cards = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Prepare the table rows
  const rows = [];
  // Header row as per spec
  rows.push(['Cards (cards4)']);

  // For each card, extract image and body
  cards.forEach((li) => {
    // Image: find the image inside .cards-card-image
    const imageContainer = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageContainer) {
      // Use the <picture> or <img> directly (prefer <picture> for responsive)
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imageContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Body: find the text content inside .cards-card-body
    const bodyContainer = li.querySelector('.cards-card-body');
    let bodyContent = [];
    if (bodyContainer) {
      // Collect all children (usually <p> elements)
      bodyContent = Array.from(bodyContainer.childNodes).filter(node => {
        // Only keep elements and non-empty text nodes
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
    }

    // Add the row: [image, text]
    rows.push([
      imageEl || '',
      bodyContent.length === 1 ? bodyContent[0] : bodyContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
