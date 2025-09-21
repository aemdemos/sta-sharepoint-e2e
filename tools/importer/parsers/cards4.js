/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block (may be nested)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block');
  }
  if (!cardsBlock) return;

  // Get all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // Table header row
  const rows = [['Cards (cards4)']];

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Defensive: find image container
    const imgDiv = li.querySelector('.cards-card-image');
    let imgEl = null;
    if (imgDiv) {
      // Use <picture> or <img> directly
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imgEl = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgEl = img;
      }
    }

    // Defensive: find body container
    const bodyDiv = li.querySelector('.cards-card-body');
    let bodyContent = [];
    if (bodyDiv) {
      // Collect all paragraphs in order
      const paragraphs = Array.from(bodyDiv.querySelectorAll('p'));
      if (paragraphs.length) {
        bodyContent = paragraphs;
      } else {
        // If no <p>, use all children
        bodyContent = Array.from(bodyDiv.childNodes).filter(n => n.nodeType === 1);
      }
    }

    // Push row: [image, text]
    rows.push([
      imgEl || '',
      bodyContent.length === 1 ? bodyContent[0] : bodyContent
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
