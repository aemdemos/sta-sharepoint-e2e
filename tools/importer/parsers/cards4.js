/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the inner .cards.block (the real block container)
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Find all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Header row as per block requirements
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cardItems.forEach((li) => {
    // Defensive: get image container and body container
    const imageDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Get the image element (use the <picture> or <img>)
    let imageCell = '';
    if (imageDiv) {
      // Prefer the <picture> element for full source support
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // fallback to img if picture is missing
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Get the text content (title + description)
    let textCell = '';
    if (bodyDiv) {
      // Defensive: clone so we don't move the original nodes
      textCell = Array.from(bodyDiv.childNodes);
    }

    rows.push([
      imageCell,
      textCell,
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
