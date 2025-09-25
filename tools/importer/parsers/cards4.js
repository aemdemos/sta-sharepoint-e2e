/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the UL containing all cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  lis.forEach((li) => {
    // Find image container and body container
    const imageDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Defensive: get the image (picture or img)
    let imageEl = null;
    if (imageDiv) {
      // Use the <picture> element directly if present
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // Fallback: use <img> if no <picture>
        const img = imageDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Defensive: get the card text content
    let textEls = [];
    if (bodyDiv) {
      // Get all <p> elements (usually first is title, second is description)
      const paragraphs = Array.from(bodyDiv.querySelectorAll('p'));
      paragraphs.forEach(p => {
        textEls.push(p);
      });
    }

    // Build row: [image, text content]
    const row = [imageEl, textEls];
    rows.push(row);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
