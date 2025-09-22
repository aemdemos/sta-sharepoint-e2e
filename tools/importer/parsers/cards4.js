/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards block (could be the element itself or a child)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards');
  }
  if (!cardsBlock) return;

  // Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Header row as required
  const rows = [
    ['Cards (cards4)']
  ];

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Find image container
    const imgDiv = li.querySelector('.cards-card-image');
    let imgEl = null;
    if (imgDiv) {
      // Use the <picture> or <img> directly (prefer picture for source sets)
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imgEl = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgEl = img;
      }
    }

    // Find text container
    const bodyDiv = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyDiv) {
      // Find the first <p> with <strong> as the title
      const paragraphs = bodyDiv.querySelectorAll('p');
      if (paragraphs.length) {
        // Title
        const firstP = paragraphs[0];
        const strong = firstP.querySelector('strong');
        if (strong) {
          // Create heading element for semantic clarity
          const heading = document.createElement('h3');
          heading.textContent = strong.textContent;
          textContent.push(heading);
        }
        // Description (second <p> or text after <strong>)
        if (paragraphs.length > 1) {
          textContent.push(paragraphs[1]);
        } else if (firstP && (!strong || strong !== firstP)) {
          // If only one <p> and no <strong>, use the whole paragraph
          textContent.push(firstP);
        }
      } else {
        // fallback: use all bodyDiv children
        textContent.push(...bodyDiv.childNodes);
      }
    }

    // Compose row: [image, text]
    rows.push([
      imgEl,
      textContent
    ]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
