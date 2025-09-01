/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block, which contains the UL of cards
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // Prepare the table header as per the block name in the example
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  lis.forEach(li => {
    // First cell: image/icon for the card
    let imgCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Reference the <picture> element if present, else the <img>
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imgCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // Second cell: card text content
    let textCell = [];
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Extract and retain formatting (bold, paragraphs, etc)
      textCell = Array.from(bodyDiv.childNodes).filter(
        node => node.nodeType !== Node.TEXT_NODE || node.textContent.trim()
      );
      // If no content (edge case), ensure at least one cell is present
      if (textCell.length === 0) textCell = [''];
    } else {
      // Fallback: if no bodyDiv exists, empty cell
      textCell = [''];
    }

    rows.push([imgCell, textCell]);
  });

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}