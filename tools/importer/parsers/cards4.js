/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Prepare header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all <li> card items
  const cards = ul.querySelectorAll(':scope > li');
  cards.forEach((card) => {
    // Defensive: find image container and body container
    const imgDiv = card.querySelector(':scope > .cards-card-image');
    const bodyDiv = card.querySelector(':scope > .cards-card-body');

    // Get image (use <picture> if present, else fallback to <img>)
    let imageEl = null;
    if (imgDiv) {
      imageEl = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
    }

    // Get text content (body)
    let textEls = [];
    if (bodyDiv) {
      // Get all children of bodyDiv (usually <p> elements)
      textEls = Array.from(bodyDiv.childNodes).filter((node) => {
        // Only include elements and non-empty text nodes
        return (
          (node.nodeType === 1) ||
          (node.nodeType === 3 && node.textContent.trim())
        );
      });
    }

    // Compose row: [image, text content]
    rows.push([
      imageEl,
      textEls
    ]);
  });

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
