/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost .cards block (may be wrapped)
  let cardsBlock = element;
  if (element.classList.contains('cards-wrapper')) {
    cardsBlock = element.querySelector('.cards.block');
  }

  // Get all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // Prepare table rows
  const rows = [];
  // Header row exactly as in the example
  rows.push(['Cards']);

  // For each card, extract image and text
  cardItems.forEach((li) => {
    // Image cell: use <picture> element if present
    let imageCell = '';
    const imageWrapper = li.querySelector('.cards-card-image');
    if (imageWrapper) {
      const pic = imageWrapper.querySelector('picture');
      imageCell = pic ? pic : imageWrapper;
    }

    // Text cell: preserve formatting (strong, paragraphs, etc)
    let bodyCell = '';
    const bodyWrapper = li.querySelector('.cards-card-body');
    if (bodyWrapper) {
      // Use all child nodes, preserving order and formatting
      // (this handles <p>, <strong>, plain text, etc)
      bodyCell = Array.from(bodyWrapper.childNodes);
    }

    rows.push([imageCell, bodyCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element with block
  element.replaceWith(block);
}
