/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the .cards.block within the given element, or use the element itself
  let block = element;
  if (!block.classList.contains('cards') || !block.classList.contains('block')) {
    block = element.querySelector('.cards.block');
  }
  if (!block) return;

  // Find the <ul> containing cards
  const ul = block.querySelector('ul');
  if (!ul) return;

  // Prepare rows for the table. Header matches the example exactly.
  const rows = [['Cards (cards4)']];

  // For each card, extract the image and text content, referencing existing elements
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Get image cell (the .cards-card-image div)
    const imgDiv = li.querySelector(':scope > .cards-card-image');
    // Get text cell (the .cards-card-body div)
    const textDiv = li.querySelector(':scope > .cards-card-body');
    // Ensure at least one exists before pushing
    if (imgDiv || textDiv) {
      rows.push([imgDiv || '', textDiv || '']);
    }
  });

  // Create the table and replace the block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
