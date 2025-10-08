/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // 1. Find the cards container (ul > li)
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const list = cardsBlock.querySelector('ul');
  if (!list) return;
  const items = Array.from(list.children).filter(li => li.tagName === 'LI');

  // Header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  items.forEach((li) => {
    // Image cell: find the .cards-card-image and use its <picture> or <img>
    const imageContainer = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageContainer) {
      // Use the <picture> element directly if present
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // Fallback: use <img> directly
        const img = imageContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Text cell: find the .cards-card-body and use its children
    const bodyContainer = li.querySelector('.cards-card-body');
    let textEls = [];
    if (bodyContainer) {
      // Use all direct children of bodyContainer (e.g., <p>, <strong>, etc.)
      textEls = Array.from(bodyContainer.childNodes).filter(node => {
        // Only include element nodes and meaningful text nodes
        return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
      });
    }

    // Add row: [image, text]
    rows.push([
      imageEl,
      textEls
    ]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(table);
}
