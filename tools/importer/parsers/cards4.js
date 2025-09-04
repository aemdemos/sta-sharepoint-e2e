/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each <li> (card)
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image container
    const imgDiv = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imgDiv) {
      // Use the <picture> element directly if present
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // Fallback: use first <img> if no <picture>
        const img = imgDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Find body container
    const bodyDiv = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyDiv) {
      // Collect all children (usually <p> elements)
      textContent = Array.from(bodyDiv.childNodes).filter((node) => {
        // Only include elements and non-empty text nodes
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
    }

    // Defensive: ensure at least image and text
    if (imageEl && textContent.length) {
      rows.push([
        imageEl,
        textContent.length === 1 ? textContent[0] : textContent,
      ]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
