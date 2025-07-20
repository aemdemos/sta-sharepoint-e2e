/* global WebImporter */
export default function parse(element, { document }) {
  // Identify the correct .cards.block element (could be passed either the wrapper or the block)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('block')) {
    const candidate = cardsBlock.querySelector('.cards.block');
    if (candidate) {
      cardsBlock = candidate;
    }
  }
  // Find the list of cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children);

  // Build table rows
  const rows = [];
  rows.push(['Cards']); // Header row per block spec

  cards.forEach((li) => {
    // First cell: image/picture
    const imageDiv = li.querySelector('.cards-card-image');
    let image = null;
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        image = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) image = img;
      }
    }
    // Second cell: text (all children of .cards-card-body)
    const bodyDiv = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyDiv) {
      // Use all children, maintaining elements and their semantics
      textContent = Array.from(bodyDiv.children);
    }
    rows.push([
      image,
      textContent,
    ]);
  });

  // Create the cards table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
