/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get the node type constants from the document
  const ELEMENT_NODE = document.ELEMENT_NODE || 1;
  const TEXT_NODE = document.TEXT_NODE || 3;

  // Find the <ul> that contains the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cardLis = Array.from(ul.children);

  // Header row as specified in the example (exact match)
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cardLis.forEach(li => {
    // First cell: the image/icon (only the <picture> or <img>)
    let imageCell = null;
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

    // Second cell: text content, only content inside .cards-card-body
    let textCell = [];
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      textCell = Array.from(bodyDiv.childNodes).filter(node => {
        if (node.nodeType === ELEMENT_NODE) return true;
        if (node.nodeType === TEXT_NODE) return node.textContent.trim().length > 0;
        return false;
      });
      if (textCell.length === 1) textCell = textCell[0];
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
