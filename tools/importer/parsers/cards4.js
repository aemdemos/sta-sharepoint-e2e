/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Find the <ul> that contains the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Each <li> is a card
  ul.querySelectorAll('li').forEach((li) => {
    // Find image (first cell)
    const imgDiv = li.querySelector('.cards-card-image');
    let imgEl = null;
    if (imgDiv) {
      // Prefer the <img> inside <picture>
      const img = imgDiv.querySelector('img');
      if (img) imgEl = img;
    }

    // Find text (second cell)
    const bodyDiv = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyDiv) {
      // Collect all children (usually <p> elements)
      bodyDiv.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          textContent.push(node);
        }
      });
    }

    // Defensive: fallback if no text found
    if (textContent.length === 0 && bodyDiv) {
      textContent.push(document.createTextNode(bodyDiv.textContent.trim()));
    }

    // Add the card row: [image, text content]
    rows.push([
      imgEl || '',
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
