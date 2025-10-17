/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // Step 1: Find the cards block container
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Step 2: Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Step 3: Build the table rows
  const rows = [];

  // Header row as per spec
  rows.push(['Cards (cards4)']);

  // Step 4: For each card, extract image and text content
  cardItems.forEach((li) => {
    // Image cell: find the .cards-card-image element, use its <picture> or <img>
    const imgContainer = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imgContainer) {
      // Use the <picture> element if present, else fallback to <img>
      const picture = imgContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imgContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Text cell: find the .cards-card-body element
    const bodyContainer = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyContainer) {
      // Collect all children (usually <p> elements)
      const children = Array.from(bodyContainer.children);
      if (children.length) {
        textContent = children;
      } else {
        // Fallback: use the body container itself
        textContent = [bodyContainer];
      }
    }

    // Add row: [image, text]
    rows.push([
      imageEl || '',
      textContent.length === 1 ? textContent[0] : textContent,
    ]);
  });

  // Step 5: Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
