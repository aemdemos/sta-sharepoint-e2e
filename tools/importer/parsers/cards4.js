/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the .cards.block inside the given element or use the element itself if it's the block
  let block = element.querySelector('.cards.block');
  if (!block) block = element;

  // Find the <ul> list containing cards
  const list = block.querySelector('ul');
  const items = list ? list.querySelectorAll(':scope > li') : block.querySelectorAll(':scope > li');

  const rows = [['Cards (cards4)']]; // Header row exactly as in example

  items.forEach((li) => {
    // Get the image/icon cell (mandatory)
    const imgDiv = li.querySelector('.cards-card-image');
    // Get the text cell (mandatory)
    const textDiv = li.querySelector('.cards-card-body');
    // Defensive: ensure both cells exist
    rows.push([
      imgDiv || '',
      textDiv || ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
