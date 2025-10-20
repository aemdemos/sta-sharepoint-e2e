/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // 1. Find the cards container (ul > li)
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  // Use children instead of filtering by tagName, to ensure all <li> are included
  const lis = Array.from(ul.children);

  // 2. Prepare the table rows
  const rows = [];
  // Header row as per spec
  rows.push(['Cards (cards4)']);

  // 3. For each card, extract image and text
  lis.forEach(li => {
    // Defensive: find image container
    const imgContainer = li.querySelector('.cards-card-image');
    let imgElem = null;
    if (imgContainer) {
      // Find the <img> inside <picture>
      const picture = imgContainer.querySelector('picture');
      if (picture) {
        // Use the <img> directly
        imgElem = picture.querySelector('img');
      }
    }
    // Defensive: find body container
    const bodyContainer = li.querySelector('.cards-card-body');
    let bodyContent = null;
    if (bodyContainer) {
      // Use the whole body container for resilience
      bodyContent = bodyContainer;
    }
    // Only add if both image and body exist
    if (imgElem && bodyContent) {
      rows.push([imgElem, bodyContent]);
    }
  });

  // 4. Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace the original element with the block table
  element.replaceWith(block);
}
