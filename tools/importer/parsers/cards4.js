/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing the cards
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  const rows = [['Cards']]; // Header: exactly as in the example

  ul.querySelectorAll('li').forEach((li) => {
    // --- Image ---
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // --- Text: preserve p/strong structure exactly as in the document ---
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Put all child elements (usually <p>s, possibly others) in order
      const nodes = Array.from(bodyDiv.childNodes).filter(n => {
        // Keep elements and non-empty text nodes
        return n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim() !== '');
      });
      textCell = nodes;
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
