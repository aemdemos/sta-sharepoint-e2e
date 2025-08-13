/* global WebImporter */
export default function parse(element, { document }) {
  // Find all cards in the block (li elements directly under 'ul')
  const cardsBlock = element.querySelector('ul');
  const cards = cardsBlock ? Array.from(cardsBlock.children) : [];

  // The header row: match exactly the example
  const headerRow = ['Cards'];
  const rows = [headerRow];

  cards.forEach((li) => {
    // Image or icon cell: reference the .cards-card-image node
    const imageDiv = li.querySelector('.cards-card-image');
    let imageCell = null;
    if (imageDiv) {
      // Use <picture> element directly if present, else <img>
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) {
          imageCell = img;
        }
      }
    }

    // Text content cell: reference all elements inside .cards-card-body
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = [];
    if (bodyDiv) {
      // Collect all child nodes (usually <p> elements)
      textCell = Array.from(bodyDiv.children).filter(el => el);
      // If no children, fallback to text content
      if (textCell.length === 0 && bodyDiv.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = bodyDiv.textContent.trim();
        textCell = [p];
      }
    } else {
      // If bodyDiv missing, set cell to empty paragraph
      const p = document.createElement('p');
      textCell = [p];
    }

    rows.push([imageCell, textCell]);
  });

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
