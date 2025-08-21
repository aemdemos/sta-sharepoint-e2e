/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block inside the wrapper
  // Accepts either the wrapper or the .cards.block itself
  let cardsBlock = element.classList.contains('cards') && element.classList.contains('block') ? element : element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  const headerRow = ['Cards'];
  const rows = [headerRow];

  lis.forEach((li) => {
    // Get image cell
    let imageEl = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Reference the <picture> element if available, else the <img>
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imageEl = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }
    // Get text content cell
    let textContent = [];
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Retain all children (paragraphs, headings, etc.)
      textContent = Array.from(bodyDiv.children);
    }
    // If there is no image or text, skip this card
    if (!imageEl && textContent.length === 0) return;
    rows.push([imageEl, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
