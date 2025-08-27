/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards block inside the wrapper
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Header row exactly matches example
  const rows = [['Cards']];

  // Find all card items (li)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  cardItems.forEach(card => {
    // Extract image: use the existing <picture> element if present
    let imageElem = null;
    const imgContainer = card.querySelector('.cards-card-image');
    if (imgContainer) {
      const picture = imgContainer.querySelector('picture');
      if (picture) {
        imageElem = picture;
      } else {
        const img = imgContainer.querySelector('img');
        if (img) imageElem = img;
      }
    }

    // Extract body content: all children of .cards-card-body
    let bodyContent = [];
    const bodyContainer = card.querySelector('.cards-card-body');
    if (bodyContainer) {
      // Retain semantic structure and formatting by referencing existing elements
      // Only include element nodes and non-empty text nodes
      bodyContent = Array.from(bodyContainer.childNodes).filter(
        node => (node.nodeType === Node.ELEMENT_NODE) ||
                (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      );
      // If only one node, use just that, else pass array
      if (bodyContent.length === 1) bodyContent = bodyContent[0];
    } else {
      bodyContent = '';
    }

    // Create a row: image in first cell, text in second
    rows.push([
      imageElem,
      bodyContent
    ]);
  });

  // Create the Cards block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original wrapper element with the new block
  element.replaceWith(block);
}
