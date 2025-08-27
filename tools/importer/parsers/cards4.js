/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block reliably
  const cardsBlock = element.querySelector('.cards.block[data-block-name="cards"]') || element;
  // Get the list of cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  // Table header (block name exactly as in the example)
  const rows = [['Cards']];

  // Iterate through each card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Image cell: always use the <img> tag inside .cards-card-image
    const imgWrapper = li.querySelector('.cards-card-image');
    let imgEl = null;
    if (imgWrapper) {
      imgEl = imgWrapper.querySelector('img');
    }
    // Text cell: reference the .cards-card-body (contains <p> with <strong> and description)
    const bodyEl = li.querySelector('.cards-card-body');
    rows.push([imgEl, bodyEl]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with new table
  element.replaceWith(table);
}
