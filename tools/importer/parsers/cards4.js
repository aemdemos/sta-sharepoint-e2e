/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards block (or use the element itself if already at block)
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) cardsBlock = element;

  // Find all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // Table header row as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cardItems.forEach((li) => {
    // Image cell: use <picture> if present, else <img>
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

    // Text cell: extract heading and description
    let textCell = [];
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      const paragraphs = Array.from(bodyDiv.querySelectorAll('p'));
      if (paragraphs.length > 0) {
        // Title: first <p> with <strong> as heading
        const firstP = paragraphs[0];
        const strong = firstP.querySelector('strong');
        if (strong) {
          const heading = document.createElement('strong');
          heading.textContent = strong.textContent;
          textCell.push(heading);
        } else {
          textCell.push(firstP.cloneNode(true));
        }
        // Description: second <p> if present
        if (paragraphs.length > 1) {
          textCell.push(paragraphs[1].cloneNode(true));
        }
      } else {
        // Fallback: use all children
        textCell = Array.from(bodyDiv.childNodes).map(n => n.cloneNode(true));
      }
    }

    rows.push([imageCell, textCell]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
