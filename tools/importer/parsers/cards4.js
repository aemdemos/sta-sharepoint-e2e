/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (could be element itself or child)
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock && element.classList.contains('cards') && element.classList.contains('block')) {
    cardsBlock = element;
  }
  if (!cardsBlock) return;

  const cardItems = Array.from(cardsBlock.querySelectorAll('ul > li'));
  // Header row: matches example
  const rows = [['Cards']];

  cardItems.forEach((li) => {
    // Image cell: first .cards-card-image > img (use <picture> if present)
    let imgCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imgCell = picture;
      } else {
        // fallback: use img
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }
    // Text cell: all children of .cards-card-body
    let txtCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Compose content as array of children (preserve formatting)
      txtCell = Array.from(bodyDiv.childNodes).filter(node => {
        // Only elements and meaningful text
        if (node.nodeType === 1) return true;
        if (node.nodeType === 3) return node.textContent.trim();
        return false;
      });
    }
    // Always provide both cells as per block structure
    rows.push([imgCell, txtCell]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
