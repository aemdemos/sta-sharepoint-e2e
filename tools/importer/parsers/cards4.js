/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  const rows = [];
  // Header row must match example exactly
  rows.push(['Cards (cards4)']);

  // Iterate each card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image/icon area
    const imgDiv = li.querySelector(':scope > .cards-card-image');
    // Find text body area
    const bodyDiv = li.querySelector(':scope > .cards-card-body');

    // Defensive: If missing either, skip this card
    if (!imgDiv || !bodyDiv) return;

    rows.push([imgDiv, bodyDiv]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
