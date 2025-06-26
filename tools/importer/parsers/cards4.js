/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we operate on the cards block
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block');
  }
  if (!cardsBlock) return;

  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  const rows = [];
  // Exact header as in the example
  rows.push(['Cards']);

  // For each card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // First cell: Image or Icon
    let imageCell = null;
    const imageWrapper = li.querySelector('.cards-card-image');
    if (imageWrapper) {
      // Reference the <picture> element if present, otherwise <img>
      const pic = imageWrapper.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imageWrapper.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Second cell: Text content
    let textCell = null;
    const textWrapper = li.querySelector('.cards-card-body');
    if (textWrapper) {
      // Reference the existing element containing all text content
      textCell = textWrapper;
    }
    // Only add the row if there is at least one cell (should always be the case)
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
